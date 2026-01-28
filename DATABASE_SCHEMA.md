# Estrutura de Banco de Dados - Sistema de Tarefas

## 📊 Estrutura de Dados Atual

O sistema atualmente usa `localStorage` e possui as seguintes entidades:

### Entidades Principais

1. **Tasks (Tarefas)**
2. **Subtasks (Subtarefas)** - Relacionadas a Tasks

---

## 🗄️ Opções de Banco de Dados

### Opção 1: PostgreSQL (Recomendado para produção)

**Vantagens:**
- Relacional, robusto e confiável
- Suporte a relacionamentos complexos
- ACID compliance
- Excelente para múltiplos usuários
- Suporte a índices e queries complexas

**Schema SQL:**

```sql
-- Tabela de Usuários (opcional, se quiser normalizar)
CREATE TABLE users (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Tarefas
CREATE TABLE tasks (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    user_name VARCHAR(255) NOT NULL,
    title VARCHAR(500) NOT NULL,
    priority VARCHAR(20) NOT NULL CHECK (priority IN ('baixa', 'media', 'alta', 'urgente')),
    due_date DATE NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Tabela de Subtarefas
CREATE TABLE subtasks (
    id VARCHAR(255) PRIMARY KEY,
    task_id VARCHAR(255) NOT NULL,
    title VARCHAR(500) NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE
);

-- Índices para melhor performance
CREATE INDEX idx_tasks_user_id ON tasks(user_id);
CREATE INDEX idx_tasks_priority ON tasks(priority);
CREATE INDEX idx_tasks_completed ON tasks(completed);
CREATE INDEX idx_tasks_due_date ON tasks(due_date);
CREATE INDEX idx_subtasks_task_id ON subtasks(task_id);
```

---

### Opção 2: MySQL

**Vantagens:**
- Similar ao PostgreSQL
- Muito popular e bem documentado
- Boa performance

**Schema SQL (similar ao PostgreSQL):**

```sql
-- Tabela de Usuários
CREATE TABLE users (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabela de Tarefas
CREATE TABLE tasks (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    user_name VARCHAR(255) NOT NULL,
    title VARCHAR(500) NOT NULL,
    priority ENUM('baixa', 'media', 'alta', 'urgente') NOT NULL,
    due_date DATE NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_priority (priority),
    INDEX idx_completed (completed),
    INDEX idx_due_date (due_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabela de Subtarefas
CREATE TABLE subtasks (
    id VARCHAR(255) PRIMARY KEY,
    task_id VARCHAR(255) NOT NULL,
    title VARCHAR(500) NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE,
    INDEX idx_task_id (task_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

---

### Opção 3: MongoDB (NoSQL)

**Vantagens:**
- Flexível e fácil de usar
- Schema dinâmico
- Boa para prototipagem rápida
- JSON nativo

**Schema (Documentos):**

```javascript
// Collection: tasks
{
  _id: ObjectId,
  id: String, // UUID
  userId: String,
  userName: String,
  title: String,
  priority: String, // 'baixa', 'media', 'alta', 'urgente'
  dueDate: Date,
  completed: Boolean,
  subtasks: [
    {
      id: String, // UUID
      title: String,
      completed: Boolean,
      createdAt: Date
    }
  ],
  createdAt: Date,
  updatedAt: Date
}

// Índices sugeridos
db.tasks.createIndex({ userId: 1 })
db.tasks.createIndex({ priority: 1 })
db.tasks.createIndex({ completed: 1 })
db.tasks.createIndex({ dueDate: 1 })
```

---

### Opção 4: SQLite (Para desenvolvimento/testes)

**Vantagens:**
- Arquivo único, sem servidor
- Perfeito para desenvolvimento
- Fácil de fazer backup
- Bom para aplicações pequenas/médias

**Schema SQL (similar ao PostgreSQL):**

```sql
-- Tabela de Tarefas
CREATE TABLE tasks (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    user_name TEXT NOT NULL,
    title TEXT NOT NULL,
    priority TEXT NOT NULL CHECK (priority IN ('baixa', 'media', 'alta', 'urgente')),
    due_date DATE NOT NULL,
    completed INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Subtarefas
CREATE TABLE subtasks (
    id TEXT PRIMARY KEY,
    task_id TEXT NOT NULL,
    title TEXT NOT NULL,
    completed INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE
);

-- Índices
CREATE INDEX idx_tasks_user_id ON tasks(user_id);
CREATE INDEX idx_tasks_priority ON tasks(priority);
CREATE INDEX idx_tasks_completed ON tasks(completed);
CREATE INDEX idx_tasks_due_date ON tasks(due_date);
CREATE INDEX idx_subtasks_task_id ON subtasks(task_id);
```

---

### Opção 5: Firebase Firestore (Backend as a Service)

**Vantagens:**
- Sem necessidade de servidor próprio
- Real-time updates
- Autenticação integrada
- Escalável automaticamente

**Estrutura:**

```
tasks/{taskId}
  - id: string
  - userId: string
  - userName: string
  - title: string
  - priority: string
  - dueDate: timestamp
  - completed: boolean
  - subtasks: array
    - id: string
    - title: string
    - completed: boolean
    - createdAt: timestamp
  - createdAt: timestamp
  - updatedAt: timestamp
```

---

## 🔄 Migração do localStorage

### Estrutura JSON Atual (localStorage):

```json
[
  {
    "id": "uuid",
    "userId": "user123",
    "userName": "João Silva",
    "title": "Implementar funcionalidade X",
    "priority": "alta",
    "dueDate": "2024-12-31T00:00:00.000Z",
    "completed": false,
    "subtasks": [
      {
        "id": "uuid",
        "title": "Subtarefa 1",
        "completed": false,
        "createdAt": "2024-01-01T00:00:00.000Z"
      }
    ],
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

---

## 📋 Recomendações por Cenário

### 🏢 Produção / Múltiplos Usuários
**Recomendado:** PostgreSQL ou MySQL
- Melhor performance
- Suporte a relacionamentos complexos
- Segurança robusta

### 🚀 Prototipagem Rápida
**Recomendado:** MongoDB ou Firebase
- Setup rápido
- Flexibilidade de schema

### 💻 Desenvolvimento Local
**Recomendado:** SQLite
- Sem necessidade de servidor
- Fácil de configurar

### ☁️ Aplicação Cloud / Serverless
**Recomendado:** Firebase Firestore ou Supabase (PostgreSQL)
- Gerenciamento automático
- Escalabilidade automática

---

## 🔧 Próximos Passos

1. **Escolher o banco de dados** baseado no seu cenário
2. **Criar o schema** usando os exemplos acima
3. **Criar API backend** (Node.js/Express, Python/Flask, etc.)
4. **Migrar TaskContext** para fazer chamadas à API ao invés de localStorage
5. **Implementar autenticação** (se necessário)

---

## 📚 Bibliotecas Recomendadas

### Para PostgreSQL/MySQL:
- **Node.js:** `pg` (PostgreSQL) ou `mysql2` (MySQL)
- **Python:** `psycopg2` (PostgreSQL) ou `pymysql` (MySQL)
- **ORM:** Prisma, TypeORM, Sequelize

### Para MongoDB:
- **Node.js:** `mongodb` ou `mongoose`
- **Python:** `pymongo`

### Para Firebase:
- **JavaScript:** `firebase/firestore`

---

## 💡 Exemplo de API REST

```typescript
// Endpoints sugeridos:
GET    /api/tasks              // Listar todas as tarefas
GET    /api/tasks/:id          // Buscar tarefa específica
POST   /api/tasks              // Criar nova tarefa
PUT    /api/tasks/:id          // Atualizar tarefa
DELETE /api/tasks/:id          // Deletar tarefa
POST   /api/tasks/:id/subtasks // Adicionar subtarefa
PUT    /api/tasks/:id/subtasks/:subtaskId // Atualizar subtarefa
DELETE /api/tasks/:id/subtasks/:subtaskId // Deletar subtarefa
```

---

**Nota:** O sistema atual funciona perfeitamente com localStorage para uso individual ou pequenos times. Migre para um banco de dados apenas se precisar de:
- Múltiplos usuários simultâneos
- Sincronização entre dispositivos
- Backup centralizado
- Relatórios avançados
- Escalabilidade

