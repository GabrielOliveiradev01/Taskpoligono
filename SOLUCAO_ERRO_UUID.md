# 🔧 Solução: Erro de UUID no user_id

## ❌ Erro Atual
```
Erro de UUID: Verifique se o schema SQL foi executado corretamente. 
O campo user_id deve ser VARCHAR, não UUID.
```

## ✅ Solução em 2 Passos

### Opção 1: Corrigir Schema Existente (Mantém Dados)

1. Acesse: https://supabase.com/dashboard
2. Vá em **SQL Editor** → **New Query**
3. Execute o arquivo `corrigir-schema.sql`:
   - Copie TODO o conteúdo
   - Cole no editor
   - Clique em **Run**

### Opção 2: Recriar Tabelas (Recomendado - Mais Seguro)

1. Acesse: https://supabase.com/dashboard
2. Vá em **SQL Editor** → **New Query**
3. Execute o arquivo `recriar-tabelas-corrigido.sql`:
   - Copie TODO o conteúdo
   - Cole no editor
   - Clique em **Run**
   - ⚠️ **ATENÇÃO:** Isso vai apagar todos os dados existentes!

## 🔍 Verificar se Funcionou

Após executar o script, execute esta query para verificar:

```sql
SELECT 
    column_name, 
    data_type,
    character_maximum_length
FROM information_schema.columns
WHERE table_name = 'tasks'
AND column_name = 'user_id';
```

**Deve mostrar:**
- `data_type`: `character varying` ou `varchar`
- `character_maximum_length`: `255`

**NÃO deve mostrar:**
- `data_type`: `uuid` ❌

## ✅ Testar na Aplicação

1. Recarregue a aplicação (F5)
2. Vá na aba **"Teste Supabase"**
3. Clique em **"Executar Todos os Testes"**
4. O teste de criação deve passar! ✅

## 📋 Checklist

- [ ] Script SQL executado com sucesso
- [ ] Campo `user_id` está como VARCHAR (verificado com query acima)
- [ ] Teste de criação passa na aplicação
- [ ] Consegue criar tarefas normalmente

## 🎯 Se Ainda Der Erro

Execute esta query para ver TODOS os campos:

```sql
SELECT 
    column_name, 
    data_type,
    character_maximum_length,
    is_nullable
FROM information_schema.columns
WHERE table_name = 'tasks'
ORDER BY ordinal_position;
```

E me envie o resultado para eu verificar o que está errado.

