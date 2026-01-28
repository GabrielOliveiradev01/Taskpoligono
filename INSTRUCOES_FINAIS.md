# 🎯 INSTRUÇÕES FINAIS - Configurar Chave API

## ⚠️ ATENÇÃO: Você Precisa Configurar a Chave API

O erro **"Invalid API key"** aparece porque a chave API não está configurada corretamente.

---

## ✅ SOLUÇÃO DEFINITIVA (2 minutos)

### Passo 1: Obter a Chave no Supabase

1. **Acesse:** https://supabase.com/dashboard
2. **Faça login** (se necessário)
3. **Selecione seu projeto**
4. **Clique em:** Settings (⚙️) → **API**
5. **Procure por:** "Project API keys"
6. **Copie a chave:** "anon public" (é uma string MUITO LONGA começando com `eyJ...`)

### Passo 2: Atualizar o Arquivo

1. **Abra o arquivo:** `src/lib/supabase.ts`
2. **Encontre a linha 14:**
   ```typescript
   const supabaseAnonKey = 'SUA_CHAVE_AQUI';
   ```
3. **Substitua** `'SUA_CHAVE_AQUI'` pela chave que você copiou
4. **Salve o arquivo** (Ctrl+S ou Cmd+S)

### Passo 3: Verificar

1. A aplicação deve recarregar automaticamente
2. O aviso amarelo deve desaparecer
3. Vá na aba **"Teste Supabase"**
4. Clique em **"Executar Todos os Testes"**
5. Todos devem passar com ✅

---

## 📝 Exemplo de Como Deve Ficar

**ANTES (errado):**
```typescript
const supabaseAnonKey = 'SUA_CHAVE_AQUI';
```

**DEPOIS (correto):**
```typescript
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2ZWpkbGV3cm5lcW5sdmpyYWR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk1ODk2MTIsImV4cCI6MjA0NTE2NTYxMn0.xxxxx';
```

---

## 🔍 Como Saber se a Chave Está Correta

A chave correta:
- ✅ É muito longa (centenas de caracteres)
- ✅ Começa com `eyJ` (é um JWT token)
- ✅ Tem pontos (.) separando as partes
- ✅ Está na seção "anon public", NÃO "service_role"

---

## ⚠️ Erros Comuns

### "Ainda aparece o erro"
- Verifique se copiou a chave completa (ela é muito longa!)
- Certifique-se de que está entre aspas simples: `'chave'`
- Não deixe espaços antes ou depois
- Recarregue a página (F5)

### "Não encontro a chave"
- Certifique-se de estar logado no Supabase
- Verifique se selecionou o projeto correto
- A chave está em: **Settings → API → Project API keys → anon public**

### "A chave não funciona"
- Use a chave **"anon public"**, não "service_role"
- Verifique se não copiou espaços extras
- A chave deve começar com `eyJ`

---

## 🎯 Teste Rápido

Após atualizar, cole isso no console (F12):

```javascript
// Cole sua nova chave aqui
const minhaChave = 'sua_chave_aqui';

(async () => {
  const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm');
  const supabase = createClient(
    'https://pvejdlewrneqnlvjradv.supabase.co',
    minhaChave
  );
  
  const { error } = await supabase.from('tasks').select('count', { count: 'exact', head: true });
  
  if (error) {
    console.error('❌ Erro:', error.message);
  } else {
    console.log('✅ Chave funcionando!');
  }
})();
```

---

## 📞 Ainda com Problemas?

1. Veja o arquivo `SOLUCAO_RAPIDA_CHAVE.md`
2. Veja o arquivo `COMO_OBTER_CHAVE_API.md`
3. Verifique se executou o script SQL (`supabase-setup-completo.sql`)

---

**Lembre-se:** A chave API é como uma senha - você precisa da chave correta do seu projeto Supabase para que funcione!

