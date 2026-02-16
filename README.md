# 🎫 Sistema de Chamados (Helpdesk)

Sistema web para gerenciamento de chamados (tickets) com cadastro de clientes.

Projeto desenvolvido com:

- ⚙️ Backend: Node.js + Express
- 🗄️ Banco de Dados: SQLite
- 🎨 Frontend: Vue 3 + Vite

---

## 🚀 Funcionalidades

### 👤 Clientes
- Cadastro de cliente
- Listagem de clientes
- Exclusão de cliente

Campos:
- CPF/CNPJ
- Razão Social
- Nome Fantasia
- Email
- Telefone

---

### 🎟️ Chamados (Tickets)
- Criação de chamado
- Edição de chamado
- Exclusão de chamado
- Vinculação obrigatória a um cliente
- Status do chamado:
  - Aberto
  - Em andamento
  - Finalizado
- Prioridade:
  - Baixa
  - Média
  - Alta

Regras implementadas:
- ✅ Cliente é obrigatório ao criar chamado
- 🔒 Após vinculado, não pode ser alterado
- 🎯 Status e prioridade exibidos com badge visual

---


______________________________________________________________________________________________________
## 🏗️ Estrutura do Projeto

backend/
├── src/
│ ├── routes.js
│ ├── database.js
│ └── controllers/
└── database.sqlite

frontend/
├── src/
│ ├── components/
│ │ ├── TicketForm.vue
│ │ └── TicketList.vue
│ ├── views/
│ ├── services/
│ ├── App.vue
│ └── main.js


---

______________________________________________________________________________________________________

## ⚙️ Como Rodar o Projeto

### 1️⃣ Clonar o repositório

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git

2️⃣ Backend
cd backend
npm install
npm start

Servidor Padrão
http://localhost:3000

3️⃣ Frontend
cd frontend
npm install
npm run dev

frontend padrão
http://localhost:5173

______________________________________________________________________________________________________
🗄️ Banco de Dados

O projeto utiliza SQLite.

O arquivo database.sqlite é criado automaticamente na primeira execução.

______________________________________________________________________________________________________
🎨 Melhorias Futuras

 Dashboard com métricas

 Filtro por cliente

 Filtro por status

 Controle de usuários

 Autenticação

 Histórico de alterações



👨‍💻 Autor

Desenvolvido por Felipe Da Luz

📄 Licença

Este projeto é de uso acadêmico / estudo.
