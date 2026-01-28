export type Priority = 'baixa' | 'media' | 'alta' | 'urgente';

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

export interface Task {
  id: string;
  userName: string;
  solicitante: string;
  title: string;
  priority: Priority;
  dueDate: Date;
  completed: boolean;
  subtasks: Subtask[];
  createdAt: Date;
  updatedAt: Date;
}

export interface TaskFormData {
  userName: string;
  solicitante: string;
  title: string;
  priority: Priority;
  dueDate: string;
}

export interface SubtaskFormData {
  title: string;
}

