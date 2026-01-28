# 🚨 SOLUÇÃO RÁPIDA - Chave API Inválida

## ❌ Erro Atual
```
Invalid API key
401 (Unauthorized)
```

## ✅ Solução em 3 Passos (2 minutos)

### 1️⃣ Obter a Chave Correta

1. Acesse: **https://supabase.com/dashboard**
2. Clique em **Settings** (⚙️) → **API**
3. Procure por **"Project API keys"**
4. Copie a chave **"anon public"** (é uma string muito longa começando com `eyJ...`)

### 2️⃣ Atualizar o Código

1. Abra o arquivo: `src/lib/supabase.ts`
2. Encontre a linha:
   ```typescript
   const supabaseAnonKey = 'SUA_CHAVE_AQUI';
   ```
3. Substitua `'SUA_CHAVE_AQUI'` pela chave que você copiou
4. Salve o arquivo

### 3️⃣ Testar

1. A aplicação deve recarregar automaticamente
2. Vá na aba **"Teste Supabase"**
3. Clique em **"Executar Todos os Testes"**
4. Deve funcionar! ✅

---

## 📸 Onde Encontrar no Supabase

```
Dashboard
  └── Settings (⚙️)
      └── API
          └── Project API keys
              └── anon public: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... ⬅️ COPIE ESTA!
```

---

## ⚠️ Importante

- Use a chave **"anon public"**, NÃO a **"service_role"**
- A chave é muito longa (centenas de caracteres) - copie tudo
- Não deixe espaços antes ou depois da chave
- A chave deve estar entre aspas simples: `'sua_chave_aqui'`

---

## 🔍 Verificar se Funcionou

Após atualizar, teste no console (F12):

```javascript
// Cole sua nova chave aqui
const novaChave = 'sua_chave_anon_aqui';

(async () => {
  const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm');
  const supabase = createClient(
    'https://pvejdlewrneqnlvjradv.supabase.co',
    novaChave
  );
  
  const { error } = await supabase.from('tasks').select('count', { count: 'exact', head: true });
  
  if (error) {
    console.error('❌ Ainda com erro:', error.message);
  } else {
    console.log('✅ Chave funcionando!');
  }
})();
```

Se aparecer "✅ Chave funcionando!", está correto!

