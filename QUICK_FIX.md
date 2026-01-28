# 🚀 Solução Rápida - Erro no Supabase

## ⚡ Passos Rápidos (5 minutos)

### 1️⃣ Execute o Script SQL

1. Acesse: https://supabase.com/dashboard
2. Selecione seu projeto
3. Clique em **SQL Editor** (menu lateral)
4. Clique em **New Query**
5. Abra o arquivo `supabase-setup-completo.sql` neste projeto
6. **Copie TODO o conteúdo** e cole no editor
7. Clique em **Run** (ou pressione Ctrl+Enter)
8. Deve aparecer: **"Success"** em verde

### 2️⃣ Verifique se Funcionou

1. No Supabase, vá em **Table Editor**
2. Deve aparecer:
   - ✅ Tabela `tasks`
   - ✅ Tabela `subtasks`

### 3️⃣ Teste na Aplicação

1. Execute: `npm run dev`
2. Abra a aplicação no navegador
3. Vá na aba **"Teste Supabase"**
4. Clique em **"Executar Todos os Testes"**
5. Todos devem passar com ✅

---

## 🔍 Se Ainda Der Erro

### Verifique o Console do Navegador

1. Pressione **F12** no navegador
2. Vá na aba **Console**
3. Procure por erros em **vermelho**
4. Copie a mensagem de erro completa

### Erros Comuns:

#### ❌ "relation does not exist"
**Solução:** Execute o script SQL novamente (passo 1)

#### ❌ "permission denied" ou "row-level security"
**Solução:** O script já desabilita RLS. Se ainda der erro, execute:
```sql
ALTER TABLE tasks DISABLE ROW LEVEL SECURITY;
ALTER TABLE subtasks DISABLE ROW LEVEL SECURITY;
```

#### ❌ "invalid API key"
**Solução:** 
1. Vá em Settings → API no Supabase
2. Copie a **anon/public key**
3. Atualize em `src/lib/supabase.ts`

---

## ✅ Checklist Final

- [ ] Script SQL executado com sucesso
- [ ] Tabelas `tasks` e `subtasks` aparecem no Table Editor
- [ ] Aplicação roda sem erros no console (F12)
- [ ] Teste Supabase passa todos os testes
- [ ] Consegue criar uma tarefa na aplicação

---

## 📞 Ainda Não Funciona?

1. **Copie a mensagem de erro completa** do console (F12)
2. **Verifique:**
   - Qual operação estava tentando fazer
   - Mensagem de erro completa
   - Screenshot do erro

3. **Informações úteis:**
   - Veja o arquivo `TROUBLESHOOTING_SUPABASE.md` para mais detalhes
   - Execute o teste manual no console (veja `TESTE_SUPABASE.md`)

---

## 🎯 Teste Rápido no Console

Cole isso no console do navegador (F12) para testar:

```javascript
(async () => {
  const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm');
  const supabase = createClient(
    'https://pvejdlewrneqnlvjradv.supabase.co',
    'jMArApswcMqG2GSFjQ4KhQ_ctW_gnrs'
  );
  
  // Teste de conexão
  const { data, error } = await supabase.from('tasks').select('count', { count: 'exact', head: true });
  
  if (error) {
    console.error('❌ ERRO:', error.message);
    console.error('Código:', error.code);
  } else {
    console.log('✅ Conexão OK!');
  }
})();
```

Se aparecer "✅ Conexão OK!", o problema está no código da aplicação.
Se aparecer erro, o problema está na configuração do Supabase.

