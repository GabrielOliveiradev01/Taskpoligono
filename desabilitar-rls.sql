-- ============================================
-- DESABILITAR ROW LEVEL SECURITY (RLS)
-- Execute este script para permitir todas as operações
-- ============================================

-- Desabilitar RLS nas tabelas
ALTER TABLE tasks DISABLE ROW LEVEL SECURITY;
ALTER TABLE subtasks DISABLE ROW LEVEL SECURITY;

-- Verificar se foi desabilitado
SELECT 
    schemaname,
    tablename,
    rowsecurity
FROM pg_tables
WHERE tablename IN ('tasks', 'subtasks');

-- Deve mostrar rowsecurity = false para ambas as tabelas

-- ============================================
-- ALTERNATIVA: Se preferir manter RLS habilitado,
-- crie políticas que permitam todas as operações:
-- ============================================

-- Habilitar RLS
-- ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE subtasks ENABLE ROW LEVEL SECURITY;

-- Criar políticas permissivas
-- CREATE POLICY "Allow all operations on tasks" 
-- ON tasks FOR ALL 
-- USING (true) 
-- WITH CHECK (true);

-- CREATE POLICY "Allow all operations on subtasks" 
-- ON subtasks FOR ALL 
-- USING (true) 
-- WITH CHECK (true);

