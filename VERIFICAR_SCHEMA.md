# ⚠️ Erro: "invalid input syntax for type uuid"

## 🔍 Problema

O erro indica que o Supabase está tentando interpretar `user_id` como UUID, mas deveria ser VARCHAR.

## ✅ Solução

### Passo 1: Verificar o Schema no Supabase

1. Acesse: https://supabase.com/dashboard
2. Vá em **Table Editor** → **tasks**
3. Clique no ícone de **"View Table Structure"** ou **"Edit Table"**
4. Verifique o tipo do campo `user_id`:
   - ✅ Deve ser: **VARCHAR** ou **TEXT**
   - ❌ NÃO deve ser: **UUID**

### Passo 2: Se o Campo Estiver Errado, Execute Este SQL

No **SQL Editor** do Supabase, execute:

```sql
-- Verificar estrutura atual
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'tasks' 
AND column_name = 'user_id';

-- Se estiver como UUID, alterar para VARCHAR
ALTER TABLE tasks 
ALTER COLUMN user_id TYPE VARCHAR(255);
```

### Passo 3: Recriar as Tabelas (Se Necessário)

Se o problema persistir, execute o script completo novamente:

1. Vá em **SQL Editor**
2. Execute o conteúdo de `supabase-setup-completo.sql`
3. Isso vai recriar as tabelas com os tipos corretos

## 📋 Schema Correto

O campo `user_id` deve ser:

```sql
user_id VARCHAR(255) NOT NULL
```

**NÃO:**

```sql
user_id UUID NOT NULL  -- ❌ ERRADO
```

## 🔍 Verificação Rápida

Execute no SQL Editor:

```sql
-- Ver todos os campos da tabela tasks
SELECT 
    column_name, 
    data_type, 
    character_maximum_length
FROM information_schema.columns
WHERE table_name = 'tasks'
ORDER BY ordinal_position;
```

Deve mostrar:
- `id`: uuid
- `user_id`: character varying (VARCHAR)
- `user_name`: character varying
- `title`: character varying
- etc.

## ✅ Após Corrigir

1. Recarregue a aplicação
2. Tente criar uma tarefa novamente
3. Deve funcionar!

