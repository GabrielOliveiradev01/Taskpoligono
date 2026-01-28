# ⚡ Netlify - Início Rápido

## 🚀 Deploy em 5 Minutos

### 1️⃣ Conectar GitHub

1. Acesse: https://app.netlify.com
2. Faça login com GitHub
3. Clique em **"Add new site"** → **"Import an existing project"**
4. Escolha **GitHub** e autorize
5. Selecione: `GabrielOliveiradev01/Taskpoligono`

### 2️⃣ Configurar Build

A Netlify detectará automaticamente:
- ✅ Build command: `npm run build`
- ✅ Publish directory: `dist`

**Se não detectar, configure manualmente:**
- Build command: `npm install && npm run build`
- Publish directory: `dist`

### 3️⃣ Variáveis de Ambiente

**IMPORTANTE:** Configure antes do primeiro deploy!

1. Antes de clicar em "Deploy", clique em **"Show advanced"**
2. Clique em **"New variable"**
3. Adicione:

```
Nome: VITE_SUPABASE_URL
Valor: https://pvejdlewrneqnlvjradv.supabase.co
```

```
Nome: VITE_SUPABASE_ANON_KEY
Valor: sb_publishable_jMArApswcMqG2GSFjQ4KhQ_ctW_gnrs
```

### 4️⃣ Deploy!

1. Clique em **"Deploy site"**
2. Aguarde 2-3 minutos
3. ✅ Pronto! Seu site está no ar!

**URL:** `https://seu-site-aleatorio.netlify.app`

### 5️⃣ Renomear Site (Opcional)

1. Vá em **Site settings** → **General**
2. Clique em **"Change site name"**
3. Escolha um nome único (ex: `taskpoligono`)

## 🔄 Deploy Automático

A partir de agora, **toda vez que você fizer push no GitHub**, a Netlify fará deploy automático! 🎉

## 🐛 Problemas?

### Build falhou?
- Verifique os logs em **Deploys** → Clique no deploy
- Confirme que as variáveis de ambiente estão configuradas

### Site não carrega?
- Verifique se o Supabase está configurado corretamente
- Confirme que as políticas RLS estão ativas

### Erro 404 nas rotas?
- O arquivo `public/_redirects` já resolve isso automaticamente

## 📖 Documentação Completa

Veja `NETLIFY_DEPLOY.md` para guia detalhado.

## ✅ Checklist

- [ ] Repositório conectado no GitHub
- [ ] Variáveis de ambiente configuradas
- [ ] Build passou com sucesso
- [ ] Site acessível
- [ ] Testado criação de tarefa
- [ ] Testado dashboard

## 🎉 Pronto!

Seu sistema de tarefas está no ar! 🚀

