# 🔒 Solução: Erro de Row Level Security (RLS)

## ❌ Erro Atual
```
new row violates row-level security policy for table "tasks"
code: 42501
```

## ✅ Solução Rápida (30 segundos)

### Execute este SQL no Supabase:

1. Acesse: https://supabase.com/dashboard
2. Vá em **SQL Editor** → **New Query**
3. Cole e execute:

```sql
-- Desabilitar RLS
ALTER TABLE tasks DISABLE ROW LEVEL SECURITY;
ALTER TABLE subtasks DISABLE ROW LEVEL SECURITY;
```

4. Clique em **Run**
5. Deve aparecer: **"Success"**

### Ou use o arquivo pronto:

1. Abra o arquivo `desabilitar-rls.sql` neste projeto
2. Copie o conteúdo
3. Cole no SQL Editor do Supabase
4. Execute

## ✅ Verificar se Funcionou

Execute esta query:

```sql
SELECT 
    tablename,
    rowsecurity
FROM pg_tables
WHERE tablename IN ('tasks', 'subtasks');
```

**Deve mostrar:**
- `rowsecurity`: `false` para ambas as tabelas ✅

## 🧪 Testar

1. Recarregue a aplicação (F5)
2. Vá na aba **"Teste Supabase"**
3. Clique em **"Executar Todos os Testes"**
4. Deve funcionar! ✅

## 📋 O que é RLS?

Row Level Security (RLS) é um recurso de segurança do PostgreSQL/Supabase que controla quais linhas podem ser acessadas/modificadas. 

Para desenvolvimento, desabilitamos para facilitar. Em produção, você pode criar políticas específicas.

## 🔄 Se Preferir Manter RLS Habilitado

Se quiser manter RLS mas permitir todas as operações, execute:

```sql
-- Habilitar RLS
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE subtasks ENABLE ROW LEVEL SECURITY;

-- Criar políticas que permitem tudo
CREATE POLICY "Allow all operations on tasks" 
ON tasks FOR ALL 
USING (true) 
WITH CHECK (true);

CREATE POLICY "Allow all operations on subtasks" 
ON subtasks FOR ALL 
USING (true) 
WITH CHECK (true);
```

Mas para desenvolvimento, é mais simples desabilitar o RLS.

