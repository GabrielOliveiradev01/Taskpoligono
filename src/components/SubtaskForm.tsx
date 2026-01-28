import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import { Plus, X } from 'lucide-react';
import './SubtaskForm.css';

interface SubtaskFormProps {
  taskId: string;
}

const SubtaskForm: React.FC<SubtaskFormProps> = ({ taskId }) => {
  const { addSubtask } = useTasks();
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [comentario, setComentario] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('O título da subtarefa é obrigatório');
      return;
    }

    try {
      await addSubtask(taskId, { title: title.trim(), comentario: comentario.trim() });
      setTitle('');
      setComentario('');
      setIsOpen(false);
      setError('');
    } catch (error) {
      setError('Erro ao criar subtarefa');
      console.error('Erro ao criar subtarefa:', error);
    }
  };

  const handleCancel = () => {
    setTitle('');
    setComentario('');
    setIsOpen(false);
    setError('');
  };

  if (!isOpen) {
    return (
      <button
        className="add-subtask-btn"
        onClick={() => setIsOpen(true)}
        aria-label="Adicionar subtarefa"
      >
        <Plus size={16} />
        Adicionar Subtarefa
      </button>
    );
  }

  return (
    <form className="subtask-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          if (error) setError('');
        }}
        className={`subtask-input ${error ? 'error' : ''}`}
        placeholder="Título da subtarefa..."
        autoFocus
      />
      <textarea
        value={comentario}
        onChange={(e) => {
          setComentario(e.target.value);
          if (error) setError('');
        }}
        className="subtask-input"
        placeholder="Comentário (opcional)..."
        rows={2}
      />
      {error && <span className="error-message">{error}</span>}
      <div className="subtask-form-actions">
        <button type="submit" className="btn-icon-small">
          <Plus size={16} />
        </button>
        <button
          type="button"
          className="btn-icon-small"
          onClick={handleCancel}
          aria-label="Cancelar"
        >
          <X size={16} />
        </button>
      </div>
    </form>
  );
};

export default SubtaskForm;

