# 📋 Sistema de Tarefas e Subtarefas

Sistema moderno e escalável para gerenciamento de tarefas e subtarefas, desenvolvido com React, TypeScript, Vite e Supabase.

[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0.8-purple)](https://vitejs.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-green)](https://supabase.com/)

## 🚀 Funcionalidades

- ✅ **Gerenciamento de Tarefas**
  - Criar, editar e excluir tarefas
  - Marcar tarefas como concluídas
  - Filtros por prioridade e status
  - Ordenação por data, prioridade ou usuário

- ✅ **Subtarefas**
  - Adicionar múltiplas subtarefas a cada tarefa
  - Marcar subtarefas como concluídas
  - Excluir subtarefas

- ✅ **Dashboard**
  - Estatísticas em tempo real
  - Visualização de tarefas concluídas e pendentes
  - Tarefas urgentes e atrasadas
  - Distribuição por prioridade
  - Estatísticas de subtarefas

- ✅ **Campos da Tarefa**
  - Nome do usuário
  - Título da tarefa
  - Prioridade (Baixa, Média, Alta, Urgente)
  - Data de entrega

- ✅ **Design Moderno**
  - Interface responsiva
  - Fontes: Inter (sistema)
  - Animações suaves
  - Design system com tokens visuais
  - Tema consistente e moderno

## 🛠️ Tecnologias

- **React 18** - Biblioteca JavaScript para interfaces
- **TypeScript** - Tipagem estática
- **Vite** - Build tool rápida
- **Supabase** - Backend como serviço (PostgreSQL)
- **Context API** - Gerenciamento de estado
- **date-fns** - Manipulação de datas
- **lucide-react** - Ícones modernos
- **CSS3** - Estilização moderna com variáveis CSS e tokens visuais

## 📦 Instalação

1. Clone o repositório:
```bash
git clone git@github.com:GabrielOliveiradev01/Taskpoligono.git
cd Taskpoligono
```

2. Instale as dependências:
```bash
npm install
```

3. Configure o Supabase:
   - Acesse: https://supabase.com/dashboard
   - Crie um projeto ou use um existente
   - Execute o script SQL em `schema-final-sem-userid.sql` no SQL Editor
   - Configure as políticas RLS usando `criar-politicas-rls.sql`

4. Configure as variáveis de ambiente (opcional):
```bash
cp .env.example .env
# Edite .env com suas credenciais do Supabase
```

5. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

6. Abra o navegador em `http://localhost:5173`

## 🏗️ Build para Produção

```bash
npm run build
```

Os arquivos serão gerados na pasta `dist/`.

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes React
│   ├── Dashboard.tsx   # Dashboard com estatísticas
│   ├── TaskList.tsx    # Lista de tarefas
│   ├── TaskForm.tsx    # Formulário de tarefas
│   └── SubtaskForm.tsx # Formulário de subtarefas
├── context/            # Context API
│   └── TaskContext.tsx # Gerenciamento de estado
├── types/              # Tipos TypeScript
│   └── index.ts        # Interfaces e tipos
├── App.tsx             # Componente principal
├── main.tsx            # Ponto de entrada
└── index.css           # Estilos globais
```

## 💾 Armazenamento

Os dados são armazenados no **Supabase** (PostgreSQL na nuvem), permitindo:
- Persistência entre dispositivos
- Backup automático
- Escalabilidade
- Sincronização em tempo real (futuro)

## 🔧 Configuração do Supabase

1. Execute o script `schema-final-sem-userid.sql` no SQL Editor do Supabase
2. Execute o script `criar-politicas-rls.sql` para configurar as políticas
3. Configure as credenciais em `src/lib/supabase.ts` ou use variáveis de ambiente

## 🎨 Design System

O projeto utiliza um design system consistente com:
- Variáveis CSS para cores, espaçamentos e sombras
- Tipografia hierárquica com três famílias de fontes
- Componentes reutilizáveis
- Animações e transições suaves

## 📱 Responsividade

O sistema é totalmente responsivo e funciona bem em:
- Desktop
- Tablet
- Mobile

## 🔮 Escalabilidade

O projeto foi desenvolvido pensando em escalabilidade:
- Arquitetura modular
- Separação de responsabilidades
- TypeScript para type safety
- Context API para gerenciamento de estado centralizado
- Componentes reutilizáveis
- Fácil adicionar novas funcionalidades

## 🚀 Deploy

### Netlify (Recomendado) ⚡

**Método Rápido:**
1. Acesse: https://app.netlify.com
2. Clique em **"Add new site"** → **"Import an existing project"**
3. Conecte seu repositório GitHub: `GabrielOliveiradev01/Taskpoligono`
4. Configure as variáveis de ambiente:
   - `VITE_SUPABASE_URL` = `https://pvejdlewrneqnlvjradv.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` = sua chave anon do Supabase
5. Clique em **"Deploy site"** 🚀

**O projeto já está configurado com:**
- ✅ `netlify.toml` - Configurações de build e headers
- ✅ `public/_redirects` - Redirecionamento SPA
- ✅ Variáveis de ambiente prontas

📖 **Guia completo:** Veja `NETLIFY_DEPLOY.md`

### GitHub

```bash
git init
git remote add origin git@github.com:GabrielOliveiradev01/Taskpoligono.git
git add .
git commit -m "feat: Sistema de tarefas completo"
git branch -M main
git push -u origin main
```

Veja `DEPLOY.md` e `COMANDOS_GIT.md` para instruções detalhadas.

### Vercel

1. Conecte seu repositório GitHub
2. Configure as variáveis de ambiente:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Deploy automático a cada push!

## 📝 Licença

Este projeto é de código aberto e está disponível sob a licença MIT.

## 👤 Autor

Gabriel Oliveira - [GitHub](https://github.com/GabrielOliveiradev01)

