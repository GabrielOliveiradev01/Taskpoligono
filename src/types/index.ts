export type Priority = 'baixa' | 'media' | 'alta' | 'urgente';

export type BacklogStatus = 'Textos fixos' | 'Em andamento' | 'A fazer' | 'teste' | 'revisão' | 'concluido' | 'bloqueado';

export interface Subtask {
  id: string;
  title: string;
  comentario: string;
  completed: boolean;
  createdAt: Date;
}

export interface Task {
  id: string;
  userName: string;
  solicitante: string;
  title: string;
  comentario: string;
  porcentagem: number;
  backlog: BacklogStatus;
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
  comentario: string;
  porcentagem: number;
  backlog: BacklogStatus;
  priority: Priority;
  dueDate: string;
}

export interface SubtaskFormData {
  title: string;
  comentario: string;
}

