# 🔒 Configurar Políticas RLS para Tasks e Subtasks

## 📋 O que são Políticas RLS?

Row Level Security (RLS) controla quais linhas podem ser acessadas/modificadas nas tabelas. As políticas definem as regras de acesso.

## ✅ Solução: Criar Políticas Permissivas

### Passo 1: Execute o Script SQL

1. Acesse: https://supabase.com/dashboard
2. Vá em **SQL Editor** → **New Query**
3. Abra o arquivo `criar-politicas-rls.sql`
4. **Copie TODO o conteúdo** e cole no editor
5. Clique em **Run** (ou Ctrl+Enter)
6. Deve aparecer: **"Success"**

### Passo 2: Verificar

Execute esta query para verificar:

```sql
SELECT 
    tablename,
    policyname,
    cmd
FROM pg_policies
WHERE tablename IN ('tasks', 'subtasks');
```

**Deve mostrar:**
- `tasks` → `tasks_policy` → `ALL`
- `subtasks` → `subtasks_policy` → `ALL`

## 🎯 O que o Script Faz

1. ✅ Habilita RLS nas tabelas `tasks` e `subtasks`
2. ✅ Remove políticas antigas (se existirem)
3. ✅ Cria política `tasks_policy` para tabela `tasks`
4. ✅ Cria política `subtasks_policy` para tabela `subtasks`
5. ✅ Ambas permitem todas as operações (SELECT, INSERT, UPDATE, DELETE)

## 🧪 Testar

Após executar o script:

1. Recarregue a aplicação (F5)
2. Vá na aba **"Teste Supabase"**
3. Clique em **"Executar Todos os Testes"**
4. Todos devem passar! ✅

## 📝 Estrutura das Políticas

### Política para `tasks`:
- **Nome:** `tasks_policy`
- **Tabela:** `tasks`
- **Permissões:** Todas (ALL)
- **Regra:** `USING (true)` e `WITH CHECK (true)` = permite tudo

### Política para `subtasks`:
- **Nome:** `subtasks_policy`
- **Tabela:** `subtasks`
- **Permissões:** Todas (ALL)
- **Regra:** `USING (true)` e `WITH CHECK (true)` = permite tudo

## ⚠️ Alternativa: Desabilitar RLS

Se preferir desabilitar completamente o RLS (mais simples para desenvolvimento):

```sql
ALTER TABLE tasks DISABLE ROW LEVEL SECURITY;
ALTER TABLE subtasks DISABLE ROW LEVEL SECURITY;
```

Mas criar políticas é mais seguro e recomendado.

## 🔍 Verificar Status Atual

Para ver o status atual das políticas:

```sql
-- Ver se RLS está habilitado
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE tablename IN ('tasks', 'subtasks');

-- Ver políticas existentes
SELECT * FROM pg_policies 
WHERE tablename IN ('tasks', 'subtasks');
```

## ✅ Após Configurar

Execute o script `criar-politicas-rls.sql` e tudo deve funcionar! 🎉

