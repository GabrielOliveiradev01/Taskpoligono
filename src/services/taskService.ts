import { supabase, TaskRow, SubtaskRow } from '../lib/supabase';
import { Task, Subtask, TaskFormData, SubtaskFormData } from '../types';

// Converter TaskRow do banco para Task do frontend
const taskRowToTask = async (taskRow: TaskRow): Promise<Task> => {
  // Buscar subtarefas
  const { data: subtasksData, error: subtasksError } = await supabase
    .from('subtasks')
    .select('*')
    .eq('task_id', taskRow.id)
    .order('created_at', { ascending: true });

  if (subtasksError) {
    console.error('Erro ao buscar subtarefas:', subtasksError);
  }

  const subtasks: Subtask[] = (subtasksData || []).map((st: SubtaskRow) => ({
    id: st.id,
    title: st.title,
    completed: st.completed,
    createdAt: new Date(st.created_at),
  }));

  return {
    id: taskRow.id,
    userName: taskRow.user_name,
    solicitante: taskRow.solicitante,
    title: taskRow.title,
    priority: taskRow.priority,
    dueDate: new Date(taskRow.due_date),
    completed: taskRow.completed,
    subtasks,
    createdAt: new Date(taskRow.created_at),
    updatedAt: new Date(taskRow.updated_at),
  };
};

// Buscar todas as tarefas
export const fetchTasks = async (): Promise<Task[]> => {
  try {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('❌ Erro ao buscar tarefas:', error);
      console.error('Detalhes:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      });
      
      // Mensagem mais amigável
      if (error.code === '42P01') {
        throw new Error('Tabela "tasks" não existe. Execute o script SQL no Supabase!');
      }
      if (error.code === '42501') {
        throw new Error('Permissão negada. Desabilite RLS ou crie políticas no Supabase!');
      }
      
      throw new Error(`Erro ao buscar tarefas: ${error.message}`);
    }

    if (!data) {
      return [];
    }

    const tasks = await Promise.all((data || []).map(taskRowToTask));
    return tasks;
  } catch (err) {
    console.error('Erro inesperado ao buscar tarefas:', err);
    throw err;
  }
};

// Criar nova tarefa
export const createTask = async (taskData: TaskFormData): Promise<Task> => {
  try {
    const { data, error } = await supabase
      .from('tasks')
      .insert({
        user_name: taskData.userName,
        solicitante: taskData.solicitante,
        title: taskData.title,
        priority: taskData.priority,
        due_date: taskData.dueDate,
        completed: false,
      })
      .select()
      .single();

    if (error) {
      console.error('❌ Erro ao criar tarefa:', error);
      console.error('Detalhes:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      });
      
      // Mensagens mais amigáveis
      if (error.code === '42P01') {
        throw new Error('Tabela "tasks" não existe. Execute o script SQL no Supabase!');
      }
      if (error.code === '42501') {
        throw new Error('Permissão negada. Desabilite RLS ou crie políticas no Supabase!');
      }
      if (error.code === '23502') {
        throw new Error('Campos obrigatórios não preenchidos. Verifique os dados!');
      }
      
      throw new Error(`Erro ao criar tarefa: ${error.message}`);
    }

    if (!data) {
      throw new Error('Nenhum dado retornado ao criar tarefa');
    }

    return taskRowToTask(data);
  } catch (err) {
    console.error('Erro inesperado ao criar tarefa:', err);
    throw err;
  }
};

// Atualizar tarefa
export const updateTask = async (
  taskId: string,
  updates: Partial<{
    title: string;
    priority: 'baixa' | 'media' | 'alta' | 'urgente';
    due_date: string;
    completed: boolean;
  }>
): Promise<Task> => {
  const { data, error } = await supabase
    .from('tasks')
    .update(updates)
    .eq('id', taskId)
    .select()
    .single();

  if (error) {
    console.error('Erro ao atualizar tarefa:', error);
    throw error;
  }

  return taskRowToTask(data);
};

// Deletar tarefa
export const deleteTask = async (taskId: string): Promise<void> => {
  const { error } = await supabase.from('tasks').delete().eq('id', taskId);

  if (error) {
    console.error('Erro ao deletar tarefa:', error);
    throw error;
  }
};

// Adicionar subtarefa
export const createSubtask = async (
  taskId: string,
  subtaskData: SubtaskFormData
): Promise<Subtask> => {
  const { data, error } = await supabase
    .from('subtasks')
    .insert({
      task_id: taskId,
      title: subtaskData.title,
      completed: false,
    })
    .select()
    .single();

  if (error) {
    console.error('Erro ao criar subtarefa:', error);
    throw error;
  }

  return {
    id: data.id,
    title: data.title,
    completed: data.completed,
    createdAt: new Date(data.created_at),
  };
};

// Atualizar subtarefa
export const updateSubtask = async (
  subtaskId: string,
  updates: Partial<{ title: string; completed: boolean }>
): Promise<void> => {
  const { error } = await supabase
    .from('subtasks')
    .update(updates)
    .eq('id', subtaskId);

  if (error) {
    console.error('Erro ao atualizar subtarefa:', error);
    throw error;
  }
};

// Deletar subtarefa
export const deleteSubtask = async (subtaskId: string): Promise<void> => {
  const { error } = await supabase.from('subtasks').delete().eq('id', subtaskId);

  if (error) {
    console.error('Erro ao deletar subtarefa:', error);
    throw error;
  }
};

