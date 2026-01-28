import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import { Task, Priority } from '../types';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { 
  CheckCircle2, 
  Circle, 
  ChevronDown, 
  ChevronUp, 
  Trash2, 
  Plus,
  Calendar,
  User,
  Flag
} from 'lucide-react';
import TaskForm from './TaskForm';
import SubtaskForm from './SubtaskForm';
import './TaskList.css';

const TaskList: React.FC = () => {
  const { tasks, loading, error, toggleTaskComplete, deleteTask, toggleSubtaskComplete, deleteSubtask } = useTasks();
  const [expandedTasks, setExpandedTasks] = useState<Set<string>>(new Set());
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [filterPriority, setFilterPriority] = useState<Priority | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'pending'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'priority' | 'user'>('date');

  const toggleExpand = (taskId: string) => {
    const newExpanded = new Set(expandedTasks);
    if (newExpanded.has(taskId)) {
      newExpanded.delete(taskId);
    } else {
      newExpanded.add(taskId);
    }
    setExpandedTasks(newExpanded);
  };

  const getPriorityColor = (priority: Priority): string => {
    const colors = {
      urgente: 'var(--danger)',
      alta: 'var(--warning)',
      media: 'var(--info)',
      baixa: 'var(--success)',
    };
    return colors[priority];
  };

  const getPriorityLabel = (priority: Priority): string => {
    return priority.charAt(0).toUpperCase() + priority.slice(1);
  };

  const filteredTasks = tasks
    .filter((task) => {
      if (filterPriority !== 'all' && task.priority !== filterPriority) return false;
      if (filterStatus === 'completed' && !task.completed) return false;
      if (filterStatus === 'pending' && task.completed) return false;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'priority':
          const priorityOrder = { urgente: 4, alta: 3, media: 2, baixa: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'user':
          return a.userName.localeCompare(b.userName);
        case 'date':
        default:
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
    });

  const isOverdue = (dueDate: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);
    return due < today && !dueDate.toDateString().includes(today.toDateString());
  };

  return (
    <div className="task-list-container">
      <div className="task-list-header">
        <div className="header-content">
          <h1 className="task-list-title">Lista de Tarefas</h1>
          <button
            className="btn-primary add-task-btn"
            onClick={() => setShowTaskForm(!showTaskForm)}
          >
            <Plus size={20} />
            Nova Tarefa
          </button>
        </div>

        {showTaskForm && (
          <div className="task-form-wrapper">
            <TaskForm onClose={() => setShowTaskForm(false)} />
          </div>
        )}

        <div className="filters">
          <div className="filter-group">
            <label>Prioridade:</label>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value as Priority | 'all')}
              className="filter-select"
            >
              <option value="all">Todas</option>
              <option value="urgente">Urgente</option>
              <option value="alta">Alta</option>
              <option value="media">Média</option>
              <option value="baixa">Baixa</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Status:</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as 'all' | 'completed' | 'pending')}
              className="filter-select"
            >
              <option value="all">Todas</option>
              <option value="pending">Pendentes</option>
              <option value="completed">Concluídas</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Ordenar por:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'priority' | 'user')}
              className="filter-select"
            >
              <option value="date">Data</option>
              <option value="priority">Prioridade</option>
              <option value="user">Usuário</option>
            </select>
          </div>
        </div>
      </div>

      {error && (
        <div className="error-message" style={{ 
          padding: '16px', 
          background: 'var(--danger-light)', 
          color: 'var(--danger)', 
          borderRadius: '12px', 
          marginBottom: '16px',
          fontWeight: 'var(--font-weight-medium)'
        }}>
          Erro: {error}
        </div>
      )}

      {loading ? (
        <div className="loading-state" style={{ 
          textAlign: 'center', 
          padding: '48px',
          color: 'var(--text-secondary)'
        }}>
          <p>Carregando tarefas...</p>
        </div>
      ) : (
        <div className="tasks-grid">
          {filteredTasks.length === 0 ? (
            <div className="empty-state">
              <p>Nenhuma tarefa encontrada.</p>
            </div>
          ) : (
          filteredTasks.map((task) => {
            const isExpanded = expandedTasks.has(task.id);
            const subtasksCompleted = task.subtasks.filter((st) => st.completed).length;
            const subtasksTotal = task.subtasks.length;
            const overdue = isOverdue(task.dueDate);

            return (
              <div
                key={task.id}
                className={`task-card ${task.completed ? 'completed' : ''} ${overdue ? 'overdue' : ''}`}
              >
                  <div className="task-card-header">
                  <div className="task-checkbox-wrapper">
                    <button
                      className="task-checkbox"
                      onClick={async () => {
                        try {
                          await toggleTaskComplete(task.id);
                        } catch (error) {
                          console.error('Erro ao atualizar tarefa:', error);
                        }
                      }}
                      aria-label={task.completed ? 'Marcar como pendente' : 'Marcar como concluída'}
                    >
                      {task.completed ? (
                        <CheckCircle2 size={24} className="checked" />
                      ) : (
                        <Circle size={24} className="unchecked" />
                      )}
                    </button>
                  </div>

                  <div className="task-main-info">
                    <h3 className="task-title">{task.title}</h3>
                    <div className="task-meta">
                      <span className="task-user">
                        <User size={14} />
                        {task.userName}
                      </span>
                      <span className={`task-priority ${task.priority}`}>
                        <Flag size={14} />
                        {getPriorityLabel(task.priority)}
                      </span>
                      <span className={`task-date ${overdue ? 'overdue' : ''}`}>
                        <Calendar size={14} />
                        {format(new Date(task.dueDate), "dd 'de' MMMM, yyyy", { locale: ptBR })}
                      </span>
                    </div>
                  </div>

                  <div className="task-actions">
                    <button
                      className="btn-icon"
                      onClick={() => toggleExpand(task.id)}
                      aria-label={isExpanded ? 'Recolher' : 'Expandir'}
                    >
                      {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                    <button
                      className="btn-icon delete-btn"
                      onClick={() => deleteTask(task.id)}
                      aria-label="Excluir tarefa"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="task-expanded-content">
                    <div className="subtasks-section">
                      <div className="subtasks-header">
                        <h4 className="subtasks-title">
                          Subtarefas ({subtasksCompleted}/{subtasksTotal})
                        </h4>
                        <SubtaskForm taskId={task.id} />
                      </div>

                      {task.subtasks.length === 0 ? (
                        <p className="no-subtasks">Nenhuma subtarefa adicionada ainda.</p>
                      ) : (
                        <ul className="subtasks-list">
                          {task.subtasks.map((subtask) => (
                            <li key={subtask.id} className={`subtask-item ${subtask.completed ? 'completed' : ''}`}>
                              <button
                                className="subtask-checkbox"
                                onClick={async () => {
                                  try {
                                    await toggleSubtaskComplete(task.id, subtask.id);
                                  } catch (error) {
                                    console.error('Erro ao atualizar subtarefa:', error);
                                  }
                                }}
                              >
                                {subtask.completed ? (
                                  <CheckCircle2 size={18} className="checked" />
                                ) : (
                                  <Circle size={18} className="unchecked" />
                                )}
                              </button>
                              <span className="subtask-title">{subtask.title}</span>
                              <button
                                className="subtask-delete"
                                onClick={async () => {
                                  try {
                                    await deleteSubtask(task.id, subtask.id);
                                  } catch (error) {
                                    console.error('Erro ao deletar subtarefa:', error);
                                  }
                                }}
                                aria-label="Excluir subtarefa"
                              >
                                <Trash2 size={14} />
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })
          )}
        </div>
      )}
    </div>
  );
};

export default TaskList;

