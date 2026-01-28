# 🚀 Deploy na Netlify - Guia Completo

## 📋 Pré-requisitos

1. ✅ Conta no GitHub (código já commitado)
2. ✅ Conta na Netlify (gratuita)
3. ✅ Projeto Supabase configurado

## 🎯 Método 1: Deploy via GitHub (Recomendado)

### Passo 1: Conectar Repositório

1. Acesse: https://app.netlify.com
2. Clique em **"Add new site"** → **"Import an existing project"**
3. Escolha **GitHub** e autorize o acesso
4. Selecione o repositório: `GabrielOliveiradev01/Taskpoligono`

### Passo 2: Configurar Build Settings

A Netlify detectará automaticamente:
- **Build command:** `npm run build`
- **Publish directory:** `dist`

Se não detectar, configure manualmente:
- **Build command:** `npm run build`
- **Publish directory:** `dist`

### Passo 3: Configurar Variáveis de Ambiente

1. Vá em **Site settings** → **Environment variables**
2. Adicione as seguintes variáveis:

```
VITE_SUPABASE_URL = https://pvejdlewrneqnlvjradv.supabase.co
VITE_SUPABASE_ANON_KEY = sb_publishable_jMArApswcMqG2GSFjQ4KhQ_ctW_gnrs
```

⚠️ **Importante:** Use a chave **anon public** do Supabase, não a service_role!

### Passo 4: Deploy

1. Clique em **"Deploy site"**
2. Aguarde o build completar (2-3 minutos)
3. Seu site estará disponível em: `https://seu-site.netlify.app`

### Passo 5: Configurar Domínio Personalizado (Opcional)

1. Vá em **Site settings** → **Domain management**
2. Clique em **"Add custom domain"**
3. Siga as instruções para configurar DNS

## 🎯 Método 2: Deploy via Netlify CLI

### Instalação do CLI

```bash
npm install -g netlify-cli
```

### Login

```bash
netlify login
```

### Deploy

```bash
# Build do projeto
npm run build

# Deploy
netlify deploy --prod

# Ou deploy de preview (teste)
netlify deploy
```

### Configurar Variáveis via CLI

```bash
netlify env:set VITE_SUPABASE_URL "https://pvejdlewrneqnlvjradv.supabase.co"
netlify env:set VITE_SUPABASE_ANON_KEY "sb_publishable_jMArApswcMqG2GSFjQ4KhQ_ctW_gnrs"
```

## 🔧 Configurações Importantes

### Arquivo `netlify.toml`

O arquivo `netlify.toml` já está configurado com:
- ✅ Build command
- ✅ Publish directory
- ✅ Redirecionamentos para SPA
- ✅ Headers de segurança
- ✅ Cache otimizado

### Variáveis de Ambiente

**NUNCA** commite as chaves reais no código! Use variáveis de ambiente:
- No código: `import.meta.env.VITE_SUPABASE_URL`
- Na Netlify: Configure no painel

## 🐛 Troubleshooting

### Erro: "Build failed"

**Causa:** Dependências não instaladas
**Solução:** Adicione no `netlify.toml`:
```toml
[build]
  command = "npm install && npm run build"
```

### Erro: "404 Not Found" nas rotas

**Causa:** Redirecionamento SPA não configurado
**Solução:** O arquivo `public/_redirects` já resolve isso

### Erro: "Invalid API key"

**Causa:** Variáveis de ambiente não configuradas
**Solução:** Verifique se as variáveis estão configuradas no painel da Netlify

### Erro: "Module not found"

**Causa:** Dependências faltando
**Solução:** Execute `npm install` localmente e verifique `package.json`

## 📊 Monitoramento

### Logs de Build

1. Acesse seu site na Netlify
2. Vá em **Deploys** → Clique no deploy
3. Veja os logs completos do build

### Analytics (Opcional)

1. Vá em **Site settings** → **Analytics**
2. Ative **Netlify Analytics** (plano pago) ou use Google Analytics

## 🔄 Deploy Automático

A Netlify faz deploy automático quando você:
- ✅ Faz push para a branch `main`
- ✅ Faz merge de Pull Request
- ✅ Atualiza variáveis de ambiente

### Branch Deploys

- **Production:** Branch `main`
- **Preview:** Outras branches e PRs

## 🎨 Otimizações

### Performance

O projeto já está otimizado com:
- ✅ Build otimizado do Vite
- ✅ Code splitting automático
- ✅ Cache de assets estáticos
- ✅ Headers de segurança

### SEO (Opcional)

Adicione em `index.html`:
```html
<meta name="description" content="Sistema de gerenciamento de tarefas e subtarefas">
<meta name="keywords" content="tarefas, gestão, produtividade">
```

## 📱 Testar Localmente

Antes de fazer deploy, teste localmente:

```bash
# Build
npm run build

# Preview
npm run preview
```

## ✅ Checklist de Deploy

- [ ] Código commitado no GitHub
- [ ] Variáveis de ambiente configuradas na Netlify
- [ ] Build passa localmente (`npm run build`)
- [ ] Preview funciona localmente (`npm run preview`)
- [ ] `netlify.toml` configurado
- [ ] `public/_redirects` criado
- [ ] Domínio personalizado configurado (opcional)

## 🎉 Pronto!

Após seguir estes passos, seu site estará no ar na Netlify! 🚀

**URL do site:** `https://seu-site.netlify.app`

## 📞 Suporte

- **Netlify Docs:** https://docs.netlify.com
- **Netlify Community:** https://answers.netlify.com
- **Status:** https://www.netlifystatus.com

