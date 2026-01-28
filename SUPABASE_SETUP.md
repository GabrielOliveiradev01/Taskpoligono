# Configuração do Supabase

## ✅ Passo 1: Instalar Dependências

Execute no terminal:

```bash
npm install
```

## ✅ Passo 2: Criar Tabelas no Supabase

1. Acesse o [Dashboard do Supabase](https://supabase.com/dashboard)
2. Selecione seu projeto
3. Vá em **SQL Editor** (menu lateral)
4. Clique em **New Query**
5. Copie e cole o conteúdo do arquivo `supabase-schema.sql`
6. Clique em **Run** (ou pressione Ctrl+Enter)

## ✅ Passo 3: Verificar Configuração

O arquivo `src/lib/supabase.ts` já está configurado com suas credenciais:
- URL: `https://pvejdlewrneqnlvjradv.supabase.co`
- Chave pública: `jMArApswcMqG2GSFjQ4KhQ_ctW_gnrs`

## ✅ Passo 4: Testar a Aplicação

```bash
npm run dev
```

A aplicação agora está conectada ao Supabase! 🎉

## 📋 Estrutura das Tabelas Criadas

### Tabela `tasks`
- `id` (UUID) - Chave primária
- `user_id` (VARCHAR) - ID do usuário
- `user_name` (VARCHAR) - Nome do usuário
- `title` (VARCHAR) - Título da tarefa
- `priority` (VARCHAR) - Prioridade: 'baixa', 'media', 'alta', 'urgente'
- `due_date` (DATE) - Data de entrega
- `completed` (BOOLEAN) - Status de conclusão
- `created_at` (TIMESTAMP) - Data de criação
- `updated_at` (TIMESTAMP) - Data de atualização

### Tabela `subtasks`
- `id` (UUID) - Chave primária
- `task_id` (UUID) - Referência à tarefa (FK)
- `title` (VARCHAR) - Título da subtarefa
- `completed` (BOOLEAN) - Status de conclusão
- `created_at` (TIMESTAMP) - Data de criação

## 🔒 Segurança (Opcional)

Por padrão, as tabelas estão acessíveis publicamente. Se quiser adicionar segurança:

1. No SQL Editor, execute:
```sql
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE subtasks ENABLE ROW LEVEL SECURITY;

-- Criar política para permitir todas as operações (ajuste conforme necessário)
CREATE POLICY "Allow all operations" ON tasks FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON subtasks FOR ALL USING (true);
```

## 🐛 Troubleshooting

### Erro: "relation does not exist"
- Verifique se executou o script SQL no Supabase
- Confirme que as tabelas foram criadas em **Table Editor**

### Erro: "permission denied"
- Verifique as políticas de RLS (Row Level Security)
- Confirme que a chave pública está correta

### Erro de conexão
- Verifique se a URL e a chave estão corretas em `src/lib/supabase.ts`
- Confirme que o projeto Supabase está ativo

## 📝 Notas

- Os dados agora são armazenados no Supabase (não mais no localStorage)
- Todas as operações são assíncronas
- O sistema carrega as tarefas automaticamente ao iniciar
- Erros são exibidos no console e podem ser tratados na UI

