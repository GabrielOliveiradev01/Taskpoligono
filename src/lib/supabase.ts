import { createClient } from '@supabase/supabase-js';

// Configuração do Supabase
// Use variáveis de ambiente em produção para segurança
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://pvejdlewrneqnlvjradv.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_jMArApswcMqG2GSFjQ4KhQ_ctW_gnrs';

// Criar cliente Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
(supabase as any).supabaseKey = supabaseAnonKey; // Para verificação no App.tsx

// Tipos para o banco de dados
export interface TaskRow {
  id: string; // UUID
  user_name: string; // Apenas nome do usuário (sem user_id)
  solicitante: string;
  title: string;
  comentario: string;
  porcentagem: number;
  backlog: string;
  priority: 'baixa' | 'media' | 'alta' | 'urgente';
  due_date: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface SubtaskRow {
  id: string;
  task_id: string;
  title: string;
  comentario: string;
  completed: boolean;
  created_at: string;
}

