- Alagou Aí 🚨
Link: https://alagou-ai.netlify.app/
📌 Visão Geral
Alagou Aí é uma plataforma colaborativa onde usuários podem registrar e visualizar pontos de alagamento em suas regiões. O sistema utiliza:

Next.js para o frontend

Tailwind CSS para estilização

JWT para autenticação

Cookies para gerenciamento de sessão

🚀 Funcionalidades
👤 Usuário Comum
✅ Criar conta e autenticar-se

📝 Criar postagens com:

Estado, cidade e bairro (selecionados de listas)

Nível de gravidade (Pouca água, Muita água, Completamente alagado)

🔍 Listar locais alagados com filtros por:

Estado

Cidade

Bairro

👀 Visualizar detalhes de postagens (somente leitura)

🛠️ Administrador
👥 Gerenciar usuários e postagens

✏️ Atualizar/Excluir qualquer publicação

📊 Gerar relatórios com todos os dados

🔧 Tecnologias Utilizadas
Frontend: Next.js + Tailwind CSS

Autenticação: JWT + Cookies

Gerenciamento de Estado: React Context API

API: GraphQL

📡 Queries e Mutations da API
🔍 Consultas (Queries)
graphql
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

# Posts filtrados
query FilteredPosts {
  postsByState(stateId: 1) { id title }
  postsByCity(cityId: 1) { id title }
  postsByNeighborhood(neighborhood: "Centro") { id title }
}

# Listar estados com cidades
query {
  states {
    id
    name
    cities { id name }
  }
}
✏️ Mutations
graphql
# Autenticação
mutation Login {
  login(loginInput: { email: "user@example.com", password: "sua_senha" }) {
    token
    user { id }
  }
}

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

# Admin - Gerenciamento
mutation AdminUpdatePost {
  adminUpdatePost(updatePostInput: { id: 1, floodLevel: HIGH }) {
    id floodLevel
  }
}

mutation AdminDeletePost {
  adminRemovePost(id: 1) { id }
}
🔐 Autenticação
Todas as mutations protegidas requerem o token JWT no header:

json
{
  "Authorization": "Bearer SEU_TOKEN_AQUI"
}
🛠️ Configuração do Ambiente
Instale as dependências:

bash
npm install
Configure as variáveis de ambiente:

bash
cp .env.example .env.local
Inicie o servidor de desenvolvimento:

bash
npm run dev
🧑‍💻 Autor
Kayk Dario - GitHub

🌊 Sobre o Projeto
Plataforma colaborativa para registro de alagamentos, ajudando comunidades a identificar áreas de risco e autoridades a planejar ações preventivas