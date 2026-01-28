-- ============================================
-- SCRIPT DE CORREÇÃO DO SCHEMA
-- Execute este script para corrigir o problema de UUID
-- ============================================

-- 1. Verificar estrutura atual (execute primeiro para ver o problema)
SELECT 
    column_name, 
    data_type, 
    character_maximum_length
FROM information_schema.columns
WHERE table_name = 'tasks'
ORDER BY ordinal_position;

-- 2. Se user_id estiver como UUID, corrigir para VARCHAR
-- Primeiro, remover constraints que possam estar impedindo
ALTER TABLE tasks DROP CONSTRAINT IF EXISTS tasks_user_id_fkey;

-- Alterar o tipo do campo user_id
ALTER TABLE tasks 
ALTER COLUMN user_id TYPE VARCHAR(255) USING user_id::text;

-- 3. Recriar índices se necessário
DROP INDEX IF EXISTS idx_tasks_user_id;
CREATE INDEX IF NOT EXISTS idx_tasks_user_id ON tasks(user_id);

-- 4. Verificar se foi corrigido
SELECT 
    column_name, 
    data_type, 
    character_maximum_length
FROM information_schema.columns
WHERE table_name = 'tasks' 
AND column_name = 'user_id';

-- ============================================
-- SE AINDA DER ERRO, EXECUTE O SCRIPT COMPLETO ABAIXO
-- ============================================

