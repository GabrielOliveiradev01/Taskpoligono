# 📝 Comandos Git para Deploy

## 🚀 Comandos Rápidos (Copie e Cole)

Execute estes comandos na ordem:

```bash
# 1. Navegar para o diretório do projeto
cd "/Users/macbook/Terefas Gabriel Poligono"

# 2. Inicializar Git (se ainda não fez)
git init

# 3. Adicionar remote do GitHub
git remote add origin git@github.com:GabrielOliveiradev01/Taskpoligono.git

# 4. Verificar o que será commitado
git status

# 5. Adicionar todos os arquivos (exceto os ignorados)
git add .

# 6. Fazer commit
git commit -m "feat: Sistema completo de tarefas e subtarefas com Supabase"

# 7. Criar branch main
git branch -M main

# 8. Fazer push para o GitHub
git push -u origin main
```

## ✅ Verificar se Funcionou

Após executar os comandos, acesse:
https://github.com/GabrielOliveiradev01/Taskpoligono

Deve aparecer todos os arquivos do projeto!

## 🔄 Atualizações Futuras

Quando fizer mudanças, use:

```bash
git add .
git commit -m "descrição das mudanças"
git push origin main
```

## ⚠️ Se Der Erro

### Erro: "remote origin already exists"
```bash
git remote remove origin
git remote add origin git@github.com:GabrielOliveiradev01/Taskpoligono.git
```

### Erro: "failed to push"
```bash
git pull origin main --allow-unrelated-histories
git push origin main
```

### Erro de autenticação SSH
Configure suas chaves SSH ou use HTTPS:
```bash
git remote set-url origin https://github.com/GabrielOliveiradev01/Taskpoligono.git
```

