# 🔧 Troubleshooting - Erros do Supabase

## ❌ Erros Comuns e Soluções

### 1. Erro: "relation does not exist" ou "table does not exist"

**Causa:** As tabelas não foram criadas no Supabase.

**Solução:**
1. Acesse: https://supabase.com/dashboard
2. Selecione seu projeto
3. Vá em **SQL Editor**
4. Clique em **New Query**
5. Copie TODO o conteúdo do arquivo `supabase-schema.sql`
6. Cole e execute (Ctrl+Enter ou botão Run)
7. Verifique se apareceu a mensagem "Success. No rows returned"

**Verificação:**
- Vá em **Table Editor**
- Deve aparecer as tabelas `tasks` e `subtasks`

---

### 2. Erro: "permission denied" ou "new row violates row-level security policy"

**Causa:** Row Level Security (RLS) está ativado sem políticas.

**Solução Rápida (para desenvolvimento):**
```sql
-- Desabilitar RLS temporariamente
ALTER TABLE tasks DISABLE ROW LEVEL SECURITY;
ALTER TABLE subtasks DISABLE ROW LEVEL SECURITY;
```

**Solução Correta (para produção):**
```sql
-- Criar políticas que permitem todas as operações
CREATE POLICY "Allow all operations on tasks" 
ON tasks FOR ALL 
USING (true) 
WITH CHECK (true);

CREATE POLICY "Allow all operations on subtasks" 
ON subtasks FOR ALL 
USING (true) 
WITH CHECK (true);
```

---

### 3. Erro: "invalid API key" ou "JWT expired"

**Causa:** Chave API incorreta ou expirada.

**Solução:**
1. Acesse: https://supabase.com/dashboard
2. Vá em **Settings** → **API**
3. Copie a **anon/public key**
4. Atualize em `src/lib/supabase.ts`:
```typescript
const supabaseAnonKey = 'SUA_CHAVE_AQUI';
```

---

### 4. Erro: "network error" ou "failed to fetch"

**Causa:** Problema de conexão ou CORS.

**Solução:**
1. Verifique sua conexão com internet
2. Verifique se a URL do Supabase está correta
3. No Supabase Dashboard, vá em **Settings** → **API**
4. Verifique se a URL está: `https://pvejdlewrneqnlvjradv.supabase.co`

---

### 5. Erro: "null value in column violates not-null constraint"

**Causa:** Tentando inserir dados sem campos obrigatórios.

**Verifique:**
- `user_id` não pode ser vazio
- `user_name` não pode ser vazio
- `title` não pode ser vazio
- `due_date` deve ser uma data válida
- `priority` deve ser: 'baixa', 'media', 'alta' ou 'urgente'

---

### 6. Erro: "foreign key constraint fails"

**Causa:** Tentando criar subtarefa com `task_id` que não existe.

**Solução:**
- Certifique-se de que a tarefa existe antes de criar subtarefa
- Verifique se o `task_id` está correto

---

## 🔍 Como Diagnosticar o Problema

### Passo 1: Verificar Console do Navegador

1. Abra a aplicação
2. Pressione F12 (DevTools)
3. Vá na aba **Console**
4. Procure por erros em vermelho
5. Copie a mensagem de erro completa

### Passo 2: Testar Conexão Manual

No console do navegador (F12), execute:

```javascript
// Teste básico
(async () => {
  const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm');
  const supabase = createClient(
    'https://pvejdlewrneqnlvjradv.supabase.co',
    'jMArApswcMqG2GSFjQ4KhQ_ctW_gnrs'
  );
  
  // Teste 1: Verificar se consegue conectar
  const { data, error } = await supabase.from('tasks').select('count', { count: 'exact', head: true });
  
  console.log('✅ Conexão:', error ? 'FALHOU' : 'OK');
  console.log('❌ Erro:', error);
  
  // Teste 2: Tentar criar uma tarefa
  if (!error) {
    const { data: newTask, error: createError } = await supabase
      .from('tasks')
      .insert({
        user_id: 'test-diagnostico',
        user_name: 'Teste Diagnóstico',
        title: 'Teste de Diagnóstico',
        priority: 'media',
        due_date: new Date().toISOString().split('T')[0],
        completed: false
      })
      .select()
      .single();
    
    console.log('✅ Criação:', createError ? 'FALHOU' : 'OK');
    console.log('❌ Erro:', createError);
    console.log('📝 Tarefa criada:', newTask);
  }
})();
```

### Passo 3: Verificar Tabelas no Supabase

1. Acesse: https://supabase.com/dashboard
2. Vá em **Table Editor**
3. Verifique se existem:
   - Tabela `tasks`
   - Tabela `subtasks`

### Passo 4: Verificar Estrutura das Tabelas

No **SQL Editor**, execute:

```sql
-- Ver estrutura da tabela tasks
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'tasks';

-- Ver estrutura da tabela subtasks
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'subtasks';
```

---

## ✅ Checklist de Verificação

Execute este checklist na ordem:

- [ ] **1. Tabelas criadas?**
  - Vá em Table Editor → Deve ver `tasks` e `subtasks`

- [ ] **2. RLS desabilitado ou políticas criadas?**
  - Execute o SQL de desabilitar RLS ou criar políticas

- [ ] **3. Chave API correta?**
  - Verifique em Settings → API
  - Compare com `src/lib/supabase.ts`

- [ ] **4. URL correta?**
  - Deve ser: `https://pvejdlewrneqnlvjradv.supabase.co`

- [ ] **5. Pacote instalado?**
  - Execute: `npm list @supabase/supabase-js`
  - Deve mostrar a versão instalada

- [ ] **6. Console sem erros?**
  - Abra F12 → Console
  - Não deve ter erros em vermelho

---

## 🚀 Solução Rápida (Reset Completo)

Se nada funcionar, execute este script SQL completo no Supabase:

```sql
-- 1. Deletar tabelas existentes (CUIDADO: apaga todos os dados!)
DROP TABLE IF EXISTS subtasks CASCADE;
DROP TABLE IF EXISTS tasks CASCADE;

-- 2. Recriar tabelas
CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id VARCHAR(255) NOT NULL,
    user_name VARCHAR(255) NOT NULL,
    title VARCHAR(500) NOT NULL,
    priority VARCHAR(20) NOT NULL CHECK (priority IN ('baixa', 'media', 'alta', 'urgente')),
    due_date DATE NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE subtasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
    title VARCHAR(500) NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Criar índices
CREATE INDEX idx_tasks_user_id ON tasks(user_id);
CREATE INDEX idx_tasks_priority ON tasks(priority);
CREATE INDEX idx_tasks_completed ON tasks(completed);
CREATE INDEX idx_tasks_due_date ON tasks(due_date);
CREATE INDEX idx_subtasks_task_id ON subtasks(task_id);

-- 4. Criar função de updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 5. Criar trigger
CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON tasks
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 6. DESABILITAR RLS (para desenvolvimento)
ALTER TABLE tasks DISABLE ROW LEVEL SECURITY;
ALTER TABLE subtasks DISABLE ROW LEVEL SECURITY;
```

---

## 📞 Ainda com Problemas?

Se após seguir todos os passos ainda houver erro:

1. **Copie a mensagem de erro completa** do console (F12)
2. **Verifique:**
   - Qual operação estava tentando fazer (criar, ler, atualizar, deletar)
   - Em qual componente aconteceu o erro
   - Mensagem de erro completa

3. **Informações úteis para debug:**
   - Screenshot do erro no console
   - Screenshot do Table Editor do Supabase
   - Resultado do teste manual no console

---

## 🎯 Teste Final

Após seguir todos os passos, teste criando uma tarefa na aplicação. Se funcionar, o Supabase está configurado corretamente! 🎉

