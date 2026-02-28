<template>
  <div class="client-list">

    <!-- HEADER -->
    <div class="page-header">
      <h2>Clientes</h2>

      <div class="header-actions">
        <button class="trash-button"
          @click="$router.push('/clients/deleted')">
          🗑 Excluídos
        </button>

        <button class="new-button"
          @click="$router.push('/clients/new')">
          + Novo Cliente
        </button>
      </div>
    </div>

    <!-- TABLE -->
    <div class="table-card">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Cliente</th>
            <th>Contato</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="client in clients" :key="client.id">
            <td class="code">{{ client.id }}</td>

            <td>
              <strong>{{ client.razao_social }}</strong>
              <div class="sub document">
                {{ client.cpf_cnpj.length === 14 ? 'CNPJ:' : 'CPF:' }}
                {{ formatCpfCnpj(client.cpf_cnpj) }}
              </div>
            </td>

            <td>
              <div>{{ client.email }}</div>
              <div class="sub phone">
                📞 {{ formatPhone(client.telefone) }}
              </div>
            </td>

            <td class="actions">
              <button class="edit-btn"
                @click="$router.push(`/clients/${client.id}/edit`)">
                Editar
              </button>

              <button class="delete-btn"
                @click="deleteClient(client.id)">
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

    // ===== MÉTODOS QUE JÁ EXISTEM =====
    async loadClients() {
      try {
        const response = await clientService.getClients();
        this.clients = response.data;
      } catch (error) {
        console.error(error);
      }
    },

    async deleteClient(id) {
      const confirmed = confirm(
        "Tem certeza que deseja excluir este cliente?"
      );

      if (!confirmed) return;

      try {
        await clientService.deleteClient(id);
        this.loadClients();
        alert("Cliente excluído com sucesso!");
      } catch (error) {
        console.error(error);
        alert("Erro ao excluir cliente");
      }
    },

    async restoreClient(id) {
      if (confirm("Restaurar cliente?")) {
        await clientService.restoreClient(id);
        this.loadClients();
      }
    },

    // ===== NOVOS FORMATADORES (ADICIONAR AQUI) =====

    formatCpfCnpj(value) {
      if (!value) return "";

      const numbers = value.replace(/\D/g, "");

      if (numbers.length === 14) {
        return numbers.replace(
          /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
          "$1.$2.$3/$4-$5"
        );
      }

      if (numbers.length === 11) {
        return numbers.replace(
          /^(\d{3})(\d{3})(\d{3})(\d{2})$/,
          "$1.$2.$3-$4"
        );
      }

      return value;
    },

    formatPhone(value) {
      if (!value) return "";

      const numbers = value.replace(/\D/g, "");

      if (numbers.length === 11) {
        return numbers.replace(
          /^(\d{2})(\d{5})(\d{4})$/,
          "($1) $2-$3"
        );
      }

      if (numbers.length === 10) {
        return numbers.replace(
          /^(\d{2})(\d{4})(\d{4})$/,
          "($1) $2-$3"
        );
      }

      return value;
    }

  }
};
</script>

<style scoped>
.client-list {
  padding: 28px;
}

/* HEADER */

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 22px;
}

.page-header h2 {
  font-size: 24px;
  font-weight: 700;
}

.header-actions {
  display: flex;
  gap: 10px;
}

/* BUTTONS */

button {
  border: none;
  padding: 8px 14px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: 0.2s ease;
}

.new-button {
  background: #2563eb;
  color: white;
}

.new-button:hover {
  background: #1e40af;
}

.trash-button {
  background: #222f47;
}

.trash-button:hover {
  background: #e5e7eb;
}

.edit-btn {
  background: #a3c1fd;
}

.edit-btn:hover {
  background: #44f52d;
}

.delete-btn {
  background: #dc2626;
  color: white;
}

.delete-btn:hover {
  background: #991b1b;
}

/* CARD TABLE */

.table-card {
  background: rgb(255, 255, 255);
  border-radius: 12px;
  padding: 10px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.06);
  color: #000000;
}

/* TABLE */

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  text-align: left;
  font-size: 13px;
  color: #000000;
  padding: 12px;
}

td {
  padding: 14px 12px;
  border-top: 1px solid #fafafa;
}

tr:hover {
  background: #f9fafb;
}

/* TEXT DETAILS */

.sub {
  font-size: 12px;
  color: #6b7280;
}

.code {
  font-weight: 600;
  color: #2563eb;
}

/* ACTIONS */

.actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}

.document {
  font-family: monospace;
  letter-spacing: 0.3px;
}

.phone {
  font-weight: 500;
}
</style>
