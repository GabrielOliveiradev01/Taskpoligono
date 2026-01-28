# ✅ Configuração Completa - Status

## 🔑 Chave API Configurada

✅ Chave publishable configurada em `src/lib/supabase.ts`
- URL: `https://pvejdlewrneqnlvjradv.supabase.co`
- Chave: `sb_publishable_jMArApswcMqG2GSFjQ4KhQ_ctW_gnrs`

## 📋 Próximos Passos

### 1️⃣ Criar Tabelas no Supabase (OBRIGATÓRIO)

1. Acesse: https://supabase.com/dashboard
2. Selecione seu projeto
3. Vá em **SQL Editor** → **New Query**
4. Abra o arquivo `supabase-setup-completo.sql` neste projeto
5. **Copie TODO o conteúdo** e cole no editor
6. Clique em **Run** (ou Ctrl+Enter)
7. Deve aparecer: **"Success"** em verde

### 2️⃣ Verificar Tabelas

1. No Supabase, vá em **Table Editor**
2. Deve aparecer:
   - ✅ Tabela `tasks`
   - ✅ Tabela `subtasks`

### 3️⃣ Testar a Aplicação

1. Execute: `npm run dev`
2. Abra a aplicação no navegador
3. Vá na aba **"Teste Supabase"**
4. Clique em **"Executar Todos os Testes"**
5. Todos devem passar com ✅

## 🎯 Checklist

- [x] Chave API configurada no código
- [ ] Script SQL executado no Supabase
- [ ] Tabelas criadas e visíveis no Table Editor
- [ ] Testes passando na aplicação

## ⚠️ Se Ainda Der Erro

### Erro: "Invalid API key"
- Verifique se a chave está correta no Supabase Dashboard
- Vá em Settings → API e confirme a chave "anon public"
- Se for diferente, atualize em `src/lib/supabase.ts`

### Erro: "relation does not exist"
- Execute o script SQL no Supabase (passo 1 acima)

### Erro: "permission denied"
- O script SQL já desabilita RLS
- Se ainda der erro, execute no SQL Editor:
```sql
ALTER TABLE tasks DISABLE ROW LEVEL SECURITY;
ALTER TABLE subtasks DISABLE ROW LEVEL SECURITY;
```

## 🚀 Tudo Pronto!

Após executar o script SQL, sua aplicação estará 100% funcional! 🎉

