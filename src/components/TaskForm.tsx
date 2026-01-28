import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import { TaskFormData } from '../types';
import { X } from 'lucide-react';
import './TaskForm.css';

interface TaskFormProps {
  onClose: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onClose }) => {
  const { addTask } = useTasks();
  const [formData, setFormData] = useState<TaskFormData>({
    userName: '',
    solicitante: '',
    title: '',
    comentario: '',
    priority: 'media',
    dueDate: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof TaskFormData, string>>>({});

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
        await addTask(formData);
        setFormData({
          userName: '',
          solicitante: '',
          title: '',
          comentario: '',
          priority: 'media',
          dueDate: '',
        });
        onClose();
      } catch (error) {
        // Erro já é tratado no contexto
        console.error('Erro ao criar tarefa:', error);
      }
    }
  };

  const handleChange = (field: keyof TaskFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="task-form-overlay" onClick={onClose}>
      <div className="task-form-modal" onClick={(e) => e.stopPropagation()}>
        <div className="task-form-header">
          <h2 className="task-form-title">Nova Tarefa</h2>
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

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-primary">
              Criar Tarefa
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;

