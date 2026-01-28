# 🔑 Como Obter a Chave API Correta do Supabase

## ⚠️ Erro: "Invalid API key"

Se você está vendo este erro, a chave API no código está incorreta ou expirada.

---

## 📋 Passo a Passo para Obter a Chave Correta

### 1️⃣ Acesse o Dashboard do Supabase

1. Vá para: https://supabase.com/dashboard
2. Faça login na sua conta
3. Selecione seu projeto (ou crie um novo)

### 2️⃣ Vá em Settings → API

1. No menu lateral esquerdo, clique em **Settings** (⚙️)
2. Clique em **API** (submenu)

### 3️⃣ Copie a Chave "anon public"

Você verá várias chaves. Procure por:

**"Project API keys"** → **"anon"** ou **"public"**

A chave será algo como:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2ZWpkbGV3cm5lcW5sdmpyYWR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk1ODk2MTIsImV4cCI6MjA0NTE2NTYxMn0.xxxxx
```

⚠️ **IMPORTANTE:** Use a chave **"anon"** ou **"public"**, NÃO a **"service_role"** (ela é secreta e não deve ser usada no frontend)

### 4️⃣ Copie também a URL do Projeto

Na mesma página, você verá:
- **Project URL**: `https://pvejdlewrneqnlvjradv.supabase.co`

---

## 🔧 Atualizar o Código

### Opção 1: Editar Manualmente

1. Abra o arquivo: `src/lib/supabase.ts`
2. Substitua a chave atual pela nova chave que você copiou:

```typescript
const supabaseUrl = 'https://pvejdlewrneqnlvjradv.supabase.co'; // Sua URL
const supabaseAnonKey = 'SUA_CHAVE_ANON_AQUI'; // Cole a chave anon aqui
```

### Opção 2: Usar Variáveis de Ambiente (Recomendado)

1. Crie um arquivo `.env` na raiz do projeto:

```env
VITE_SUPABASE_URL=https://pvejdlewrneqnlvjradv.supabase.co
VITE_SUPABASE_ANON_KEY=sua_chave_anon_aqui
```

2. Atualize `src/lib/supabase.ts`:

```typescript
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://pvejdlewrneqnlvjradv.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sua_chave_padrao_aqui';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

3. **IMPORTANTE:** Adicione `.env` ao `.gitignore` para não commitar a chave:

```gitignore
.env
.env.local
```

---

## ✅ Verificar se Funcionou

Após atualizar a chave:

1. Salve o arquivo
2. A aplicação deve recarregar automaticamente
3. Vá na aba **"Teste Supabase"**
4. Clique em **"Executar Todos os Testes"**
5. Deve aparecer ✅ em todos os testes

---

## 🔍 Onde Encontrar no Supabase Dashboard

```
Dashboard
  └── Seu Projeto
      └── Settings (⚙️)
          └── API
              ├── Project URL: https://xxx.supabase.co
              └── Project API keys
                  ├── anon public: eyJhbGc... (USE ESTA!)
                  └── service_role: eyJhbGc... (NÃO USE - é secreta!)
```

---

## ⚠️ Problemas Comuns

### A chave ainda não funciona

1. **Verifique se copiou a chave completa** (elas são muito longas)
2. **Certifique-se de usar a chave "anon"**, não "service_role"
3. **Verifique se não há espaços** antes ou depois da chave
4. **Recarregue a página** após atualizar

### Não consigo encontrar a chave

1. Certifique-se de estar logado no Supabase
2. Verifique se selecionou o projeto correto
3. A chave está em: **Settings → API → Project API keys → anon public**

### A chave mudou

Se você regenerou as chaves no Supabase, precisa atualizar no código também.

---

## 🎯 Teste Rápido

Após atualizar a chave, teste no console do navegador (F12):

```javascript
(async () => {
  const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm');
  const supabase = createClient(
    'https://pvejdlewrneqnlvjradv.supabase.co',
    'SUA_NOVA_CHAVE_AQUI' // Cole a nova chave aqui
  );
  
  const { data, error } = await supabase.from('tasks').select('count', { count: 'exact', head: true });
  
  if (error) {
    console.error('❌ Ainda com erro:', error.message);
  } else {
    console.log('✅ Chave funcionando!');
  }
})();
```

Se aparecer "✅ Chave funcionando!", a chave está correta!

