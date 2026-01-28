import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { Task, TaskFormData, SubtaskFormData, Priority } from '../types';
import {
  fetchTasks,
  createTask,
  updateTask as updateTaskService,
  deleteTask as deleteTaskService,
  createSubtask as createSubtaskService,
  updateSubtask as updateSubtaskService,
  deleteSubtask as deleteSubtaskService,
} from '../services/taskService';

interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  addTask: (taskData: TaskFormData) => Promise<void>;
  updateTask: (taskId: string, updates: Partial<Task>) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  toggleTaskComplete: (taskId: string) => Promise<void>;
  addSubtask: (taskId: string, subtaskData: SubtaskFormData) => Promise<void>;
  toggleSubtaskComplete: (taskId: string, subtaskId: string) => Promise<void>;
  deleteSubtask: (taskId: string, subtaskId: string) => Promise<void>;
  getTasksByUser: (userName: string) => Task[];
  getTasksByPriority: (priority: Priority) => Task[];
  getTasksByStatus: (completed: boolean) => Task[];
  refreshTasks: () => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Carregar tarefas ao montar o componente
  const loadTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedTasks = await fetchTasks();
      setTasks(fetchedTasks);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar tarefas');
      console.error('Erro ao carregar tarefas:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const addTask = useCallback(
    async (taskData: TaskFormData) => {
      try {
        setError(null);
        const newTask = await createTask(taskData);
        setTasks((prev) => [...prev, newTask]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao criar tarefa');
        throw err;
      }
    },
    []
  );

  const updateTask = useCallback(
    async (taskId: string, updates: Partial<Task>) => {
      try {
        setError(null);
        const updateData: any = {};
        if (updates.title) updateData.title = updates.title;
        if (updates.priority) updateData.priority = updates.priority;
        if (updates.dueDate) updateData.due_date = updates.dueDate.toISOString().split('T')[0];
        if (updates.completed !== undefined) updateData.completed = updates.completed;

        const updatedTask = await updateTaskService(taskId, updateData);
        setTasks((prev) =>
          prev.map((task) => (task.id === taskId ? updatedTask : task))
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao atualizar tarefa');
        throw err;
      }
    },
    []
  );

  const deleteTask = useCallback(async (taskId: string) => {
    try {
      setError(null);
      await deleteTaskService(taskId);
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao deletar tarefa');
      throw err;
    }
  }, []);

  const toggleTaskComplete = useCallback(
    async (taskId: string) => {
      const task = tasks.find((t) => t.id === taskId);
      if (task) {
        await updateTask(taskId, { completed: !task.completed });
      }
    },
    [tasks, updateTask]
  );

  const addSubtask = useCallback(
    async (taskId: string, subtaskData: SubtaskFormData) => {
      try {
        setError(null);
        const newSubtask = await createSubtaskService(taskId, subtaskData);
        setTasks((prev) =>
          prev.map((task) =>
            task.id === taskId
              ? { ...task, subtasks: [...task.subtasks, newSubtask] }
              : task
          )
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao criar subtarefa');
        throw err;
      }
    },
    []
  );

  const toggleSubtaskComplete = useCallback(
    async (taskId: string, subtaskId: string) => {
      try {
        setError(null);
        const task = tasks.find((t) => t.id === taskId);
        const subtask = task?.subtasks.find((st) => st.id === subtaskId);
        if (subtask) {
          await updateSubtaskService(subtaskId, {
            completed: !subtask.completed,
          });
          setTasks((prev) =>
            prev.map((t) =>
              t.id === taskId
                ? {
                    ...t,
                    subtasks: t.subtasks.map((st) =>
                      st.id === subtaskId
                        ? { ...st, completed: !st.completed }
                        : st
                    ),
                  }
                : t
            )
          );
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao atualizar subtarefa');
        throw err;
      }
    },
    [tasks]
  );

  const deleteSubtask = useCallback(
    async (taskId: string, subtaskId: string) => {
      try {
        setError(null);
        await deleteSubtaskService(subtaskId);
        setTasks((prev) =>
          prev.map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  subtasks: task.subtasks.filter((st) => st.id !== subtaskId),
                }
              : task
          )
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao deletar subtarefa');
        throw err;
      }
    },
    []
  );

  const getTasksByUser = useCallback((userName: string) => {
    return tasks.filter((task) => task.userName === userName);
  }, [tasks]);

  const getTasksByPriority = useCallback((priority: Priority) => {
    return tasks.filter((task) => task.priority === priority);
  }, [tasks]);

  const getTasksByStatus = useCallback((completed: boolean) => {
    return tasks.filter((task) => task.completed === completed);
  }, [tasks]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        error,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskComplete,
        addSubtask,
        toggleSubtaskComplete,
        deleteSubtask,
        getTasksByUser,
        getTasksByPriority,
        getTasksByStatus,
        refreshTasks: loadTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

