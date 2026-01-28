# 🔐 Variáveis de Ambiente

## Configuração

Crie um arquivo `.env` na raiz do projeto com:

```env
VITE_SUPABASE_URL=https://pvejdlewrneqnlvjradv.supabase.co
VITE_SUPABASE_ANON_KEY=sua_chave_anon_aqui
```

## Como Obter as Credenciais

1. Acesse: https://supabase.com/dashboard
2. Vá em **Settings** → **API**
3. Copie:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public key** → `VITE_SUPABASE_ANON_KEY`

## ⚠️ Importante

- **NÃO** commite o arquivo `.env` no Git
- Use `.env.example` como template (sem credenciais reais)
- Em produção, configure as variáveis no serviço de hospedagem

