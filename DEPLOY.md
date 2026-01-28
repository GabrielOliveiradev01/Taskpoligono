# 🚀 Guia de Deploy no GitHub

## 📋 Passos para Fazer Deploy

### 1️⃣ Inicializar Git (se ainda não fez)

```bash
cd "/Users/macbook/Terefas Gabriel Poligono"
git init
```

### 2️⃣ Adicionar Remote do GitHub

```bash
git remote add origin git@github.com:GabrielOliveiradev01/Taskpoligono.git
```

### 3️⃣ Verificar Arquivos Sensíveis

⚠️ **IMPORTANTE:** Certifique-se de que o arquivo `.gitignore` está configurado corretamente para não commitar:
- Chaves API do Supabase
- Arquivos `.env`
- `node_modules`
- Arquivos de build

### 4️⃣ Adicionar e Fazer Commit

```bash
# Adicionar todos os arquivos
git add .

# Fazer commit inicial
git commit -m "feat: Sistema de tarefas e subtarefas com Supabase

- Sistema completo de gerenciamento de tarefas
- Integração com Supabase (PostgreSQL)
- Dashboard com estatísticas
- Design moderno com tokens visuais
- Componentes de teste e validação"
```

### 5️⃣ Criar Branch Main e Fazer Push

```bash
# Criar branch main
git branch -M main

# Fazer push para o GitHub
git push -u origin main
```

## ✅ Verificar no GitHub

1. Acesse: https://github.com/GabrielOliveiradev01/Taskpoligono
2. Verifique se todos os arquivos foram enviados
3. Confirme que arquivos sensíveis NÃO estão no repositório

## 🔒 Segurança

### Arquivos que NÃO devem ser commitados:

- ✅ `.env` - Contém chaves API
- ✅ `node_modules/` - Dependências
- ✅ `dist/` - Build de produção
- ✅ Arquivos com credenciais do Supabase

### Arquivos que DEVEM ser commitados:

- ✅ Código fonte (`src/`)
- ✅ Configurações (`package.json`, `tsconfig.json`, etc.)
- ✅ Scripts SQL (sem credenciais)
- ✅ Documentação (`.md`)
- ✅ `.gitignore`
- ✅ `.env.example` (template sem credenciais)

## 📝 Estrutura do Repositório

```
Taskpoligono/
├── src/                    # Código fonte
├── public/                 # Arquivos públicos
├── *.sql                   # Scripts SQL do Supabase
├── *.md                    # Documentação
├── package.json            # Dependências
├── tsconfig.json           # Config TypeScript
├── vite.config.ts          # Config Vite
├── .gitignore             # Arquivos ignorados
├── .env.example           # Template de variáveis
└── README.md              # Documentação principal
```

## 🎯 Próximos Passos Após Deploy

1. **Configurar GitHub Pages** (se quiser hospedar):
   - Settings → Pages
   - Source: GitHub Actions ou Deploy from branch

2. **Configurar CI/CD** (opcional):
   - GitHub Actions para build automático
   - Deploy automático em Vercel/Netlify

3. **Adicionar Badges** (opcional):
   - Status do build
   - Versão do projeto
   - Licença

## 🔍 Comandos Úteis

```bash
# Ver status do git
git status

# Ver arquivos que serão commitados
git diff --cached

# Ver histórico de commits
git log --oneline

# Atualizar repositório remoto
git push origin main

# Baixar atualizações
git pull origin main
```

## ⚠️ Antes de Fazer Push

Execute este comando para verificar o que será commitado:

```bash
git status
git diff --cached
```

Certifique-se de que:
- ✅ Nenhum arquivo `.env` está sendo commitado
- ✅ Nenhuma chave API está exposta no código
- ✅ `node_modules` não está sendo commitado
- ✅ Arquivos de build não estão sendo commitados

## 🎉 Pronto!

Após seguir estes passos, seu código estará no GitHub e pronto para colaboração e deploy! 🚀

