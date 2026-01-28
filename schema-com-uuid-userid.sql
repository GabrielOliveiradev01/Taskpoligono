-- ============================================
-- SCHEMA COM UUID PARA user_id
-- user_id será gerado automaticamente como UUID
-- Execute este script no SQL Editor do Supabase
-- ============================================

-- 1. Deletar tabelas existentes (se houver)
DROP TABLE IF EXISTS subtasks CASCADE;
DROP TABLE IF EXISTS tasks CASCADE;

-- 2. Criar tabela de tarefas
-- user_id: UUID gerado automaticamente (formato: 30a8a87b-8f4c-43df-b1c2-b36dcfcd8468)
-- user_name: Nome do usuário (texto simples)
CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL DEFAULT gen_random_uuid(),  -- ✅ UUID gerado automaticamente
    user_name VARCHAR(255) NOT NULL,                   -- Nome do usuário (texto)
    title VARCHAR(500) NOT NULL,
    priority VARCHAR(20) NOT NULL CHECK (priority IN ('baixa', 'media', 'alta', 'urgente')),
    due_date DATE NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Criar tabela de subtarefas
CREATE TABLE subtasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
    title VARCHAR(500) NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Criar índices para performance
CREATE INDEX idx_tasks_user_id ON tasks(user_id);
CREATE INDEX idx_tasks_priority ON tasks(priority);
CREATE INDEX idx_tasks_completed ON tasks(completed);
CREATE INDEX idx_tasks_due_date ON tasks(due_date);
CREATE INDEX idx_subtasks_task_id ON subtasks(task_id);

-- 5. Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 6. Trigger para updated_at
CREATE TRIGGER update_tasks_updated_at 
    BEFORE UPDATE ON tasks
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- 7. Desabilitar RLS (Row Level Security) para desenvolvimento
ALTER TABLE tasks DISABLE ROW LEVEL SECURITY;
ALTER TABLE subtasks DISABLE ROW LEVEL SECURITY;

-- ============================================
-- VERIFICAÇÃO
-- ============================================

-- Verificar estrutura da tabela tasks
SELECT 
    column_name, 
    data_type,
    column_default
FROM information_schema.columns
WHERE table_name = 'tasks'
ORDER BY ordinal_position;

-- Deve mostrar:
-- id: uuid (PRIMARY KEY, DEFAULT gen_random_uuid())
-- user_id: uuid (DEFAULT gen_random_uuid()) ✅
-- user_name: character varying (255)
-- title: character varying (500)
-- priority: character varying (20)
-- due_date: date
-- completed: boolean
-- created_at: timestamp with time zone
-- updated_at: timestamp with time zone

-- ============================================
-- TESTE (Opcional)
-- ============================================

-- Testar inserção (user_id será gerado automaticamente)
INSERT INTO tasks (user_name, title, priority, due_date, completed)
VALUES (
    'João Silva',         -- ✅ Apenas nome, user_id será gerado automaticamente
    'Tarefa de Teste',
    'media',
    CURRENT_DATE + INTERVAL '7 days',
    false
)
RETURNING id, user_id, user_name, title;

-- Verificar se foi criado com UUID no user_id
SELECT id, user_id, user_name, title FROM tasks;

-- Deletar teste (opcional)
-- DELETE FROM tasks;

