import React from 'react';
import { useTasks } from '../context/TaskContext';
import { format } from 'date-fns';
import { CheckCircle2, Clock, AlertCircle, TrendingUp, Users, Calendar } from 'lucide-react';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const { tasks, getTasksByPriority, getTasksByStatus } = useTasks();

  const completedTasks = getTasksByStatus(true).length;
  const pendingTasks = getTasksByStatus(false).length;
  const urgentTasks = getTasksByPriority('urgente').length;
  
  const today = new Date();
  const todayTasks = tasks.filter(
    (task) =>
      !task.completed &&
      format(new Date(task.dueDate), 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd')
  ).length;

  const overdueTasks = tasks.filter(
    (task) =>
      !task.completed &&
      new Date(task.dueDate) < today &&
      format(new Date(task.dueDate), 'yyyy-MM-dd') !== format(today, 'yyyy-MM-dd')
  ).length;

  const uniqueUsers = new Set(tasks.map((task) => task.userName)).size;
  const totalSubtasks = tasks.reduce((acc, task) => acc + task.subtasks.length, 0);
  const completedSubtasks = tasks.reduce(
    (acc, task) => acc + task.subtasks.filter((st) => st.completed).length,
    0
  );

  const stats = [
    {
      title: 'Tarefas Concluídas',
      value: completedTasks,
      total: tasks.length,
      icon: CheckCircle2,
      color: 'var(--success)',
      bgColor: 'var(--success-light)',
    },
    {
      title: 'Tarefas Pendentes',
      value: pendingTasks,
      total: tasks.length,
      icon: Clock,
      color: 'var(--warning)',
      bgColor: 'var(--warning-light)',
    },
    {
      title: 'Tarefas Urgentes',
      value: urgentTasks,
      total: tasks.length,
      icon: AlertCircle,
      color: 'var(--danger)',
      bgColor: 'var(--danger-light)',
    },
    {
      title: 'Tarefas de Hoje',
      value: todayTasks,
      total: tasks.length,
      icon: Calendar,
      color: 'var(--info)',
      bgColor: 'var(--info-light)',
    },
    {
      title: 'Tarefas Atrasadas',
      value: overdueTasks,
      total: tasks.length,
      icon: TrendingUp,
      color: 'var(--danger)',
      bgColor: 'var(--danger-light)',
    },
    {
      title: 'Usuários Ativos',
      value: uniqueUsers,
      total: tasks.length,
      icon: Users,
      color: 'var(--primary)',
      bgColor: 'var(--primary-light)',
    },
  ];

  const priorityStats = [
    { label: 'Urgente', value: getTasksByPriority('urgente').length, color: 'var(--danger)' },
    { label: 'Alta', value: getTasksByPriority('alta').length, color: 'var(--warning)' },
    { label: 'Média', value: getTasksByPriority('media').length, color: 'var(--info)' },
    { label: 'Baixa', value: getTasksByPriority('baixa').length, color: 'var(--success)' },
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>
        <p className="dashboard-subtitle">Visão geral das suas tarefas</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const percentage = tasks.length > 0 ? (stat.value / tasks.length) * 100 : 0;
          
          return (
            <div key={index} className="stat-card" style={{ '--stat-color': stat.color, '--stat-bg': stat.bgColor } as React.CSSProperties}>
              <div className="stat-icon-wrapper">
                <Icon className="stat-icon" />
              </div>
              <div className="stat-content">
                <h3 className="stat-value">{stat.value}</h3>
                <p className="stat-title">{stat.title}</p>
                {stat.total > 0 && (
                  <div className="stat-progress">
                    <div
                      className="stat-progress-bar"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="dashboard-sections">
        <div className="priority-section">
          <h2 className="section-title">Distribuição por Prioridade</h2>
          <div className="priority-chart">
            {priorityStats.map((stat, index) => (
              <div key={index} className="priority-bar-wrapper">
                <div className="priority-bar-label">
                  <span>{stat.label}</span>
                  <span className="priority-value">{stat.value}</span>
                </div>
                <div className="priority-bar">
                  <div
                    className="priority-bar-fill"
                    style={{
                      width: `${tasks.length > 0 ? (stat.value / tasks.length) * 100 : 0}%`,
                      backgroundColor: stat.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="subtasks-section">
          <h2 className="section-title">Subtarefas</h2>
          <div className="subtasks-stats">
            <div className="subtask-stat">
              <span className="subtask-label">Total de Subtarefas</span>
              <span className="subtask-value">{totalSubtasks}</span>
            </div>
            <div className="subtask-stat">
              <span className="subtask-label">Concluídas</span>
              <span className="subtask-value success">{completedSubtasks}</span>
            </div>
            <div className="subtask-stat">
              <span className="subtask-label">Pendentes</span>
              <span className="subtask-value warning">{totalSubtasks - completedSubtasks}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

