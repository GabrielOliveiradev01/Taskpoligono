-- ============================================
-- SCRIPT COMPLETO DE SETUP DO SUPABASE
-- Execute este script no SQL Editor do Supabase
-- ============================================

-- 1. Deletar tabelas existentes (se houver)
DROP TABLE IF EXISTS subtasks CASCADE;
DROP TABLE IF EXISTS tasks CASCADE;

-- 2. Criar tabela de tarefas
-- user_id e user_name são campos de texto simples, sem foreign keys ou referências
CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id VARCHAR(255) NOT NULL,  -- ID único do usuário (texto simples, sem referência)
    user_name VARCHAR(255) NOT NULL, -- Nome do usuário (texto simples)
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

-- 4. Criar índices para melhor performance
CREATE INDEX idx_tasks_user_id ON tasks(user_id);
CREATE INDEX idx_tasks_priority ON tasks(priority);
CREATE INDEX idx_tasks_completed ON tasks(completed);
CREATE INDEX idx_tasks_due_date ON tasks(due_date);
CREATE INDEX idx_subtasks_task_id ON subtasks(task_id);

-- 5. Criar função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 6. Criar trigger para atualizar updated_at
CREATE TRIGGER update_tasks_updated_at 
    BEFORE UPDATE ON tasks
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- 7. DESABILITAR RLS (Row Level Security) para desenvolvimento
-- Isso permite que a aplicação funcione sem autenticação
ALTER TABLE tasks DISABLE ROW LEVEL SECURITY;
ALTER TABLE subtasks DISABLE ROW LEVEL SECURITY;

-- ============================================
-- VERIFICAÇÃO
-- Execute estas queries para verificar se tudo foi criado corretamente
-- ============================================

-- Verificar se as tabelas foram criadas
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('tasks', 'subtasks');

-- Verificar estrutura da tabela tasks
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'tasks'
ORDER BY ordinal_position;

-- Verificar estrutura da tabela subtasks
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'subtasks'
ORDER BY ordinal_position;

-- ============================================
-- TESTE (Opcional)
-- Execute este INSERT para testar se está funcionando
-- ============================================

-- Inserir uma tarefa de teste
INSERT INTO tasks (user_id, user_name, title, priority, due_date, completed)
VALUES (
    'test-user',
    'Usuário Teste',
    'Tarefa de Teste',
    'media',
    CURRENT_DATE + INTERVAL '7 days',
    false
)
RETURNING *;

-- Verificar se a tarefa foi criada
SELECT * FROM tasks WHERE user_id = 'test-user';

-- Deletar a tarefa de teste (opcional)
-- DELETE FROM tasks WHERE user_id = 'test-user';

