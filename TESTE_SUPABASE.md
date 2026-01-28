# 🧪 Guia de Teste do Supabase

## ✅ Passo 1: Verificar Tabelas no Supabase Dashboard

1. Acesse: https://supabase.com/dashboard
2. Selecione seu projeto
3. Vá em **Table Editor** (menu lateral)
4. Verifique se as tabelas foram criadas:
   - ✅ `tasks` - deve existir
   - ✅ `subtasks` - deve existir

## ✅ Passo 2: Testar Conexão Básica

### Opção A: Via Console do Navegador

1. Execute a aplicação: `npm run dev`
2. Abra o DevTools (F12)
3. Vá na aba **Console**
4. Digite:
```javascript
// Testar conexão
import { supabase } from './src/lib/supabase';
supabase.from('tasks').select('*').then(console.log);
```

### Opção B: Via Componente de Teste

Use o componente de teste que criamos (veja abaixo)

## ✅ Passo 3: Testar Operações CRUD

### 1. Criar uma Tarefa (CREATE)

Na aplicação:
1. Clique em "Nova Tarefa"
2. Preencha os campos:
   - ID do Usuário: `test-user-1`
   - Nome do Usuário: `Usuário Teste`
   - Título: `Tarefa de Teste`
   - Prioridade: `Alta`
   - Data de Entrega: (qualquer data futura)
3. Clique em "Criar Tarefa"

**Verificar no Supabase:**
- Vá em **Table Editor** → `tasks`
- Deve aparecer a nova tarefa

### 2. Ler Tarefas (READ)

- As tarefas devem aparecer automaticamente na lista
- Verifique no **Table Editor** do Supabase

### 3. Atualizar Tarefa (UPDATE)

1. Na lista de tarefas, clique no checkbox para marcar como concluída
2. Ou edite qualquer campo

**Verificar no Supabase:**
- O campo `completed` deve mudar para `true`
- O campo `updated_at` deve ser atualizado

### 4. Adicionar Subtarefa

1. Expanda uma tarefa (clique na seta)
2. Clique em "Adicionar Subtarefa"
3. Digite um título
4. Clique no botão de adicionar

**Verificar no Supabase:**
- Vá em **Table Editor** → `subtasks`
- Deve aparecer a nova subtarefa com o `task_id` correto

### 5. Deletar Tarefa (DELETE)

1. Clique no ícone de lixeira em uma tarefa
2. Confirme a exclusão

**Verificar no Supabase:**
- A tarefa deve desaparecer da tabela `tasks`
- As subtarefas relacionadas também devem ser deletadas (CASCADE)

## ✅ Passo 4: Verificar Logs no Console

1. Abra o DevTools (F12)
2. Vá na aba **Console**
3. Procure por:
   - ✅ Mensagens de sucesso
   - ❌ Erros (se houver)

## ✅ Passo 5: Verificar no Supabase Dashboard

### SQL Editor - Testar Query Manual

1. Vá em **SQL Editor**
2. Execute:
```sql
-- Ver todas as tarefas
SELECT * FROM tasks ORDER BY created_at DESC;

-- Ver todas as subtarefas
SELECT * FROM subtasks ORDER BY created_at DESC;

-- Ver tarefas com suas subtarefas
SELECT 
  t.*,
  json_agg(s.*) as subtasks
FROM tasks t
LEFT JOIN subtasks s ON s.task_id = t.id
GROUP BY t.id
ORDER BY t.created_at DESC;
```

### Table Editor - Ver Dados

1. Vá em **Table Editor**
2. Selecione a tabela `tasks`
3. Verifique se os dados estão sendo salvos corretamente

## ✅ Passo 6: Testar Estados de Loading e Erro

1. Desconecte a internet temporariamente
2. Tente criar uma tarefa
3. Deve aparecer uma mensagem de erro
4. Reconecte a internet
5. Tente novamente - deve funcionar

## 🐛 Troubleshooting

### Erro: "relation does not exist"
- **Solução:** Execute o script SQL em `supabase-schema.sql` no SQL Editor

### Erro: "permission denied"
- **Solução:** Verifique as políticas RLS (Row Level Security)
- Se necessário, desabilite RLS temporariamente para testes:
```sql
ALTER TABLE tasks DISABLE ROW LEVEL SECURITY;
ALTER TABLE subtasks DISABLE ROW LEVEL SECURITY;
```

### Erro: "invalid API key"
- **Solução:** Verifique se a chave pública está correta em `src/lib/supabase.ts`

### Dados não aparecem
- Verifique o console do navegador para erros
- Verifique se as tabelas existem no Supabase
- Verifique se há dados na tabela via Table Editor

### Subtarefas não aparecem
- Verifique se o `task_id` está correto
- Verifique se a foreign key está funcionando
- Execute: `SELECT * FROM subtasks WHERE task_id = 'ID_DA_TAREFA'`

## 📊 Checklist de Testes

- [ ] Tabelas criadas no Supabase
- [ ] Conexão estabelecida (sem erros no console)
- [ ] Criar tarefa funciona
- [ ] Listar tarefas funciona
- [ ] Atualizar tarefa funciona
- [ ] Deletar tarefa funciona
- [ ] Adicionar subtarefa funciona
- [ ] Atualizar subtarefa funciona
- [ ] Deletar subtarefa funciona
- [ ] Dados aparecem no Table Editor do Supabase
- [ ] Loading state funciona
- [ ] Error state funciona

## 🎯 Teste Rápido (1 minuto)

Execute este código no console do navegador após abrir a aplicação:

```javascript
// Teste rápido
(async () => {
  const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm');
  const supabase = createClient(
    'https://pvejdlewrneqnlvjradv.supabase.co',
    'jMArApswcMqG2GSFjQ4KhQ_ctW_gnrs'
  );
  
  // Teste 1: Listar tarefas
  const { data, error } = await supabase.from('tasks').select('*');
  console.log('✅ Tarefas:', data);
  console.log('❌ Erros:', error);
  
  // Teste 2: Criar tarefa de teste
  const { data: newTask, error: createError } = await supabase
    .from('tasks')
    .insert({
      user_id: 'test-console',
      user_name: 'Teste Console',
      title: 'Teste via Console',
      priority: 'media',
      due_date: new Date().toISOString().split('T')[0],
      completed: false
    })
    .select()
    .single();
  
  console.log('✅ Tarefa criada:', newTask);
  console.log('❌ Erros:', createError);
})();
```

Se tudo funcionar, você verá as tarefas e uma nova tarefa será criada!

