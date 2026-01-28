-- ============================================
-- CRIAR POLÍTICAS RLS PARA TASKS E SUBTASKS
-- Execute este script no SQL Editor do Supabase
-- ============================================

-- 1. Verificar se RLS está habilitado
SELECT 
    tablename,
    rowsecurity as rls_enabled
FROM pg_tables
WHERE tablename IN ('tasks', 'subtasks');

-- 2. Habilitar RLS (se ainda não estiver)
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE subtasks ENABLE ROW LEVEL SECURITY;

-- 3. Deletar políticas existentes (se houver) para evitar conflitos
DROP POLICY IF EXISTS "Allow all operations on tasks" ON tasks;
DROP POLICY IF EXISTS "Allow all operations on subtasks" ON subtasks;
DROP POLICY IF EXISTS "tasks_policy" ON tasks;
DROP POLICY IF EXISTS "subtasks_policy" ON subtasks;

-- 4. Criar política para tabela TASKS
-- Permite todas as operações (SELECT, INSERT, UPDATE, DELETE)
CREATE POLICY "tasks_policy" 
ON tasks 
FOR ALL 
USING (true) 
WITH CHECK (true);

-- 5. Criar política para tabela SUBTASKS
-- Permite todas as operações (SELECT, INSERT, UPDATE, DELETE)
CREATE POLICY "subtasks_policy" 
ON subtasks 
FOR ALL 
USING (true) 
WITH CHECK (true);

-- 6. Verificar se as políticas foram criadas
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies
WHERE tablename IN ('tasks', 'subtasks');

-- Deve mostrar:
-- tasks | tasks_policy | PERMISSIVE | {public} | ALL | (true) | (true)
-- subtasks | subtasks_policy | PERMISSIVE | {public} | ALL | (true) | (true)

-- ============================================
-- TESTE (Opcional)
-- ============================================

-- Testar inserção em tasks
INSERT INTO tasks (user_name, title, priority, due_date, completed)
VALUES (
    'Teste Política',
    'Tarefa de Teste de Política',
    'media',
    CURRENT_DATE + INTERVAL '7 days',
    false
)
RETURNING id, user_id, user_name, title;

-- Se funcionar, delete o teste:
-- DELETE FROM tasks WHERE user_name = 'Teste Política';

