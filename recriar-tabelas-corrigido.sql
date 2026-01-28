-- ============================================
-- RECRIAR TABELAS COM SCHEMA CORRETO
-- Execute este script se o anterior não funcionar
-- ============================================

-- 1. Deletar tabelas existentes (CUIDADO: apaga todos os dados!)
DROP TABLE IF EXISTS subtasks CASCADE;
DROP TABLE IF EXISTS tasks CASCADE;

-- 2. Criar tabela de tarefas COM TIPOS CORRETOS
-- user_id e user_name são apenas campos de texto simples, sem referências
CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id VARCHAR(255) NOT NULL,  -- ✅ ID único do usuário (texto simples)
    user_name VARCHAR(255) NOT NULL, -- ✅ Nome do usuário (texto simples)
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

-- 4. Criar índices
CREATE INDEX idx_tasks_user_id ON tasks(user_id);
CREATE INDEX idx_tasks_priority ON tasks(priority);
CREATE INDEX idx_tasks_completed ON tasks(completed);
CREATE INDEX idx_tasks_due_date ON tasks(due_date);
CREATE INDEX idx_subtasks_task_id ON subtasks(task_id);

-- 5. Criar função para updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 6. Criar trigger
CREATE TRIGGER update_tasks_updated_at 
    BEFORE UPDATE ON tasks
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- 7. DESABILITAR RLS
ALTER TABLE tasks DISABLE ROW LEVEL SECURITY;
ALTER TABLE subtasks DISABLE ROW LEVEL SECURITY;

-- 8. VERIFICAÇÃO FINAL
SELECT 
    column_name, 
    data_type,
    character_maximum_length
FROM information_schema.columns
WHERE table_name = 'tasks'
ORDER BY ordinal_position;

-- Deve mostrar:
-- id: uuid
-- user_id: character varying (255) ✅
-- user_name: character varying (255)
-- title: character varying (500)
-- priority: character varying (20)
-- due_date: date
-- completed: boolean
-- created_at: timestamp with time zone
-- updated_at: timestamp with time zone

-- 9. TESTE (Opcional)
INSERT INTO tasks (user_id, user_name, title, priority, due_date, completed)
VALUES (
    'test-user-123',
    'Usuário Teste',
    'Tarefa de Teste',
    'media',
    CURRENT_DATE + INTERVAL '7 days',
    false
)
RETURNING *;

-- Se funcionar, delete a tarefa de teste:
-- DELETE FROM tasks WHERE user_id = 'test-user-123';

