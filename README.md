---

````markdown
# - Alagou Aí 🚨

Link Front-end Site: https://alagou-ai.netlify.app/

Link Back-end: https://github.com/Kayk-Rios/flood-report-api 

## 📌 Visão Geral

**Alagou Aí** é uma plataforma colaborativa onde usuários podem registrar e visualizar
 pontos de alagamento em suas regiões. O sistema utiliza:

- **Next.js** para o frontend  
- **Tailwind CSS** para estilização  
- **JWT** para autenticação  
- **Cookies** para gerenciamento de sessão

## 🔧 Tecnologias Utilizadas

- **Frontend**: Next.js + Tailwind CSS  
- **Autenticação**: JWT + Cookies  
- **Gerenciamento de Estado**: React Context API  
- **API**: GraphQL


## 🚀 Funcionalidades

### 👤 Usuário Comum

✅ Criar conta e autenticar-se  
📝 Criar postagens com:

- Estado, cidade e bairro (selecionados de listas)
- Nível de gravidade (Pouca água, Muita água, Completamente alagado)

🔍 Listar locais alagados com filtros por:

- Estado
- Cidade
- Bairro

👀 Visualizar detalhes de postagens (somente leitura)

### 🛠️ Administrador

👥 Gerenciar usuários e postagens  
✏️ Atualizar/Excluir qualquer publicação  
📊 Gerar relatórios com todos os dados

## 📡 Queries e Mutations da API

### 🔍 Consultas (Queries)

```graphql
# Listar todos os posts
query Posts {
  posts {
    id
    title
    description
    floodLevel
    address
    neighborhood
    createdAt
    author { id name }
    city { id name state { id name uf } }
  }
}
````

```graphql
# Obter post específico
query Post($id: Float!) {
  post(id: $id) {
    id
    title
    description
    floodLevel
    address
    neighborhood
    createdAt
    author { id name email }
    city { id name state { id name uf } }
  }
}
```

```graphql
# Posts filtrados
query FilteredPosts {
  postsByState(stateId: 1) { id title }
  postsByCity(cityId: 1) { id title }
  postsByNeighborhood(neighborhood: "Centro") { id title }
}
```

```graphql
# Listar estados com cidades
query {
  states {
    id
    name
    cities { id name }
  }
}
```

### ✏️ Mutations

```graphql
# Autenticação
mutation Login {
  login(loginInput: { email: "user@example.com", password: "sua_senha" }) {
    token
    user { id }
  }
}
```

```graphql
# Registro
mutation Signup {
  signup(signupInput: {
    email: "user@example.com",
    password: "senha123",
    name: "Usuário Teste"
  }) {
    token
    user { id email name isAdmin }
  }
}
```

```graphql
# Criar postagem (requer token)
mutation CreatePost {
  createPost(createPostInput: {
    title: "Alagamento Zona Norte",
    description: "Água acima dos prédios",
    floodLevel: HIGH,
    cityId: 3,
    address: "Rua Brasabante",
    neighborhood: "Norte"
  }) {
    id title address neighborhood
  }
}
```

```graphql
# Admin - Gerenciamento
mutation AdminUpdatePost {
  adminUpdatePost(updatePostInput: { id: 1, floodLevel: HIGH }) {
    id floodLevel
  }
}
```

```graphql
mutation AdminDeletePost {
  adminRemovePost(id: 1) { id }
}
```

### 🔐 Autenticação

Todas as mutations protegidas requerem o token JWT no header:

```json
{
  "Authorization": "Bearer SEU_TOKEN_AQUI"
}
```

## 🛠️ Configuração do Ambiente

Instale as dependências:

```bash
npm install
```

Configure as variáveis de ambiente:

```bash
cp .env.example .env.local
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

## 🧑‍💻 Autor

**Kayk Dario**

## 🌊 Sobre o Projeto

Plataforma colaborativa para registro de alagamentos, ajudando comunidades a identificar áreas de risco e autoridades a planejar ações preventivas.

![Captura de tela de 2025-05-25 00-18-20](https://github.com/user-attachments/assets/8642c795-ebbc-48fb-8c57-96f087ac1b8e)


![Captura de tela de 2025-05-25 00-18-41](https://github.com/user-attachments/assets/813704f3-6e6d-4081-a0cd-5aac26b1cc1c)


![Captura de tela de 2025-05-25 00-18-51](https://github.com/user-attachments/assets/da88e6cf-10b9-45c5-902b-331de5e6dbc6)


![Captura de tela de 2025-05-25 00-19-01](https://github.com/user-attachments/assets/cc379390-7db3-48b7-b2c0-61d5ef205cc0)


![Captura de tela de 2025-05-25 00-20-08](https://github.com/user-attachments/assets/7b2057a4-5d25-42a2-8dee-2b9dd57c4670)


![Captura de tela de 2025-05-25 00-19-43](https://github.com/user-attachments/assets/1c63576a-7205-4e05-973b-0ca417221fba)


![Captura de tela de 2025-05-25 00-19-57](https://github.com/user-attachments/assets/7218da39-a3ba-4f53-b02c-57da6e936e3f)


```



