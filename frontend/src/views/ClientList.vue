<template>
  <div class="client-list">
  <h2>Lista de Clientes</h2>

  <button class="new-button" @click="$router.push('/clients/new')">
    Novo Cliente
  </button>

  <div class="table-wrapper">
    <table>
      <thead>
        <tr>
          <th>Razão Social</th>
          <th>CPF/CNPJ</th>
          <th>Email</th>
          <th>Telefone</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="client in clients" :key="client.id">
          <td>{{ client.razao_social }}</td>
          <td>{{ client.cpf_cnpj }}</td>
          <td>{{ client.email }}</td>
          <td>{{ client.telefone }}</td>
          <td>
            <button @click="deleteClient(client.id)">
              Excluir
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

</template>

<script>
import clientService from "../services/clientService";

export default {
  data() {
    return {
      clients: []
    };
  },
  mounted() {
    this.loadClients();
  },
  methods: {
    async loadClients() {
      try {
        const response = await clientService.getClients();
        this.clients = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async deleteClient(id) {
      if (confirm("Deseja realmente excluir?")) {
        await clientService.deleteClient(id);
        this.loadClients();
      }
    }
  }
};
</script>

<style scoped>
.client-list {
  padding: 20px;
}

.new-button {
  margin-bottom: 16px;
}

.table-wrapper {
  overflow-x: auto;
}

table {
  width: 800px;
  border-collapse: separate;
  border-spacing: 0 8px;   
  background-color: white;
  color: #000;
}

th, td {
  padding: 12px 16px; 
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f3f4f6;
  font-weight: 600;
}

tr:hover {
  background-color: #f9fafb;
}

button {
  padding: 6px 12px;
  border: none;
  background-color: #dc2626;
  color: white;
  border-radius: 6px;
  cursor: pointer;
}

button:hover {
  background-color: #991b1b;
}
</style>
