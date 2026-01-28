import React, { useState, useEffect } from 'react';
import { useTasks } from '../context/TaskContext';
import { TaskFormData, BacklogStatus, Task } from '../types';
import { X } from 'lucide-react';
import './TaskForm.css';

interface TaskFormProps {
  onClose: () => void;
  taskToEdit?: Task | null;
}

const TaskForm: React.FC<TaskFormProps> = ({ onClose, taskToEdit }) => {
  const { addTask, updateTask } = useTasks();
  const isEditing = !!taskToEdit;
  
  const [formData, setFormData] = useState<TaskFormData>({
    userName: '',
    solicitante: '',
    title: '',
    comentario: '',
    porcentagem: 0,
    backlog: 'A fazer',
    priority: 'media',
    dueDate: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof TaskFormData, string>>>({});

  // Preencher formulário quando estiver editando
  useEffect(() => {
    if (taskToEdit) {
      setFormData({
        userName: taskToEdit.userName,
        solicitante: taskToEdit.solicitante,
        title: taskToEdit.title,
        comentario: taskToEdit.comentario || '',
        porcentagem: taskToEdit.porcentagem || 0,
        backlog: taskToEdit.backlog || 'A fazer',
        priority: taskToEdit.priority,
        dueDate: taskToEdit.dueDate ? new Date(taskToEdit.dueDate).toISOString().split('T')[0] : '',
      });
    }
  }, [taskToEdit]);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof TaskFormData, string>> = {};

    if (!formData.userName.trim()) {
      newErrors.userName = 'Nome do usuário é obrigatório';
    }
    if (!formData.solicitante.trim()) {
      newErrors.solicitante = 'Solicitante é obrigatório';
    }
    if (!formData.title.trim()) {
      newErrors.title = 'Título da tarefa é obrigatório';
    }
    if (!formData.dueDate) {
      newErrors.dueDate = 'Data de entrega é obrigatória';
    } else {
      const selectedDate = new Date(formData.dueDate);
      if (selectedDate < new Date(new Date().setHours(0, 0, 0, 0))) {
        newErrors.dueDate = 'A data não pode ser no passado';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      try {
        if (isEditing && taskToEdit) {
          // Atualizar tarefa existente
          await updateTask(taskToEdit.id, {
            userName: formData.userName,
            solicitante: formData.solicitante,
            title: formData.title,
            comentario: formData.comentario,
            porcentagem: formData.porcentagem,
            backlog: formData.backlog,
            priority: formData.priority,
            dueDate: new Date(formData.dueDate),
          });
        } else {
          // Criar nova tarefa
          await addTask(formData);
          setFormData({
            userName: '',
            solicitante: '',
            title: '',
            comentario: '',
            porcentagem: 0,
            backlog: 'A fazer',
            priority: 'media',
            dueDate: '',
          });
        }
        onClose();
      } catch (error) {
        // Erro já é tratado no contexto
        console.error(`Erro ao ${isEditing ? 'atualizar' : 'criar'} tarefa:`, error);
      }
    }
  };

  const handleChange = (field: keyof TaskFormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="task-form-overlay" onClick={onClose}>
      <div className="task-form-modal" onClick={(e) => e.stopPropagation()}>
        <div className="task-form-header">
          <h2 className="task-form-title">{isEditing ? 'Editar Tarefa' : 'Nova Tarefa'}</h2>
          <button className="close-btn" onClick={onClose} aria-label="Fechar">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="task-form">
          <div className="form-group">
            <label htmlFor="userName" className="form-label">
              Nome do Usuário *
            </label>
            <input
              id="userName"
              type="text"
              value={formData.userName}
              onChange={(e) => handleChange('userName', e.target.value)}
              className={`form-input ${errors.userName ? 'error' : ''}`}
              placeholder="Ex: João Silva"
            />
            {errors.userName && <span className="error-message">{errors.userName}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="solicitante" className="form-label">
              Solicitante *
            </label>
            <input
              id="solicitante"
              type="text"
              value={formData.solicitante}
              onChange={(e) => handleChange('solicitante', e.target.value)}
              className={`form-input ${errors.solicitante ? 'error' : ''}`}
              placeholder="Ex: Maria Santos"
            />
            {errors.solicitante && <span className="error-message">{errors.solicitante}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Título da Tarefa *
            </label>
            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className={`form-input ${errors.title ? 'error' : ''}`}
              placeholder="Ex: Implementar funcionalidade X"
            />
            {errors.title && <span className="error-message">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="comentario" className="form-label">
              Comentário
            </label>
            <textarea
              id="comentario"
              value={formData.comentario}
              onChange={(e) => handleChange('comentario', e.target.value)}
              className="form-input"
              placeholder="Adicione um comentário sobre a tarefa..."
              rows={3}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="priority" className="form-label">
                Prioridade *
              </label>
              <select
                id="priority"
                value={formData.priority}
                onChange={(e) => handleChange('priority', e.target.value)}
                className="form-select"
              >
                <option value="baixa">Baixa</option>
                <option value="media">Média</option>
                <option value="alta">Alta</option>
                <option value="urgente">Urgente</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="dueDate" className="form-label">
                Data de Entrega *
              </label>
              <input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) => handleChange('dueDate', e.target.value)}
                className={`form-input ${errors.dueDate ? 'error' : ''}`}
                min={new Date().toISOString().split('T')[0]}
              />
              {errors.dueDate && <span className="error-message">{errors.dueDate}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="porcentagem" className="form-label">
                Porcentagem (%)
              </label>
              <input
                id="porcentagem"
                type="number"
                min="0"
                max="100"
                value={formData.porcentagem}
                onChange={(e) => handleChange('porcentagem', parseInt(e.target.value) || 0)}
                className="form-input"
                placeholder="0"
              />
            </div>

            <div className="form-group">
              <label htmlFor="backlog" className="form-label">
                Backlog *
              </label>
              <select
                id="backlog"
                value={formData.backlog}
                onChange={(e) => handleChange('backlog', e.target.value as BacklogStatus)}
                className="form-select"
              >
                <option value="Textos fixos">Textos fixos</option>
                <option value="Em andamento">Em andamento</option>
                <option value="A fazer">A fazer</option>
                <option value="teste">teste</option>
                <option value="revisão">revisão</option>
                <option value="concluido">concluido</option>
                <option value="bloqueado">bloqueado</option>
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-primary">
              {isEditing ? 'Salvar Alterações' : 'Criar Tarefa'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;

