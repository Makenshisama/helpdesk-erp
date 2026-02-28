<template>
  <div class="deleted-clients">

    <!-- HEADER -->
    <div class="page-header">
      <button class="back-button" @click="$router.push('/clients')">
        ← Voltar
      </button>

      <h2>Clientes Excluídos</h2>
    </div>

    <!-- TABLE CARD -->
    <div class="table-card">

      <table v-if="clients.length">
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
              <div class="sub">
                {{ formatCpfCnpj(client.cpf_cnpj) }}
              </div>
            </td>

            <td>
              <div>{{ client.email }}</div>
              <div class="sub">
                {{ formatPhone(client.telefone) }}
              </div>
            </td>

            <td class="actions">
              <button
                class="restore-btn"
                @click="restoreClient(client.id)"
              >
                Restaurar
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- EMPTY STATE -->
      <div v-else class="empty">
        Nenhum cliente excluído 🎉
      </div>

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
    this.loadDeletedClients();
  },

  methods: {

    /* =========================
       API
    ========================== */

    async loadDeletedClients() {
      try {
        const res = await clientService.getDeletedClients();
        this.clients = res.data;
      } catch (error) {
        console.error(error);
        alert("Erro ao carregar clientes excluídos");
      }
    },

    async restoreClient(id) {
      const confirmed = confirm("Deseja restaurar este cliente?");
      if (!confirmed) return;

      try {
        await clientService.restoreClient(id);
        this.loadDeletedClients();
      } catch (error) {
        console.error(error);
        alert("Erro ao restaurar cliente");
      }
    },

    /* =========================
       FORMATADORES (UI)
    ========================== */

    onlyNumbers(value) {
      return (value || "").replace(/\D/g, "");
    },

    formatCpfCnpj(value) {
      let v = this.onlyNumbers(value);

      // CPF
      if (v.length === 11) {
        return v.replace(
          /(\d{3})(\d{3})(\d{3})(\d{2})/,
          "$1.$2.$3-$4"
        );
      }

      // CNPJ
      if (v.length === 14) {
        return v.replace(
          /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
          "$1.$2.$3/$4-$5"
        );
      }

      return value;
    },

    formatPhone(value) {
      let v = this.onlyNumbers(value);

      // celular
      if (v.length === 11) {
        return v.replace(
          /(\d{2})(\d{5})(\d{4})/,
          "($1) $2-$3"
        );
      }

      // fixo
      if (v.length === 10) {
        return v.replace(
          /(\d{2})(\d{4})(\d{4})/,
          "($1) $2-$3"
        );
      }

      return value;
    }
  }
};
</script>

<style scoped>
.deleted-clients {
  padding: 28px;
}

/* HEADER */

.page-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 22px;
}

.back-button {
  border: none;
  background: #ffbe0a;
  padding: 6px 14px;
  border-radius: 8px;
  cursor: pointer;
  color: #000000;
}

.back-button:hover {
  background: #99c2ff;
}

/* CARD */

.table-card {
  background: white;
  border-radius: 12px;
  padding: 10px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.06);
  color: black;
}

/* TABLE */

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 14px 12px;
}

tr:hover {
  background: #b3b3b4;
}

.code {
  font-weight: 600;
  color: #2563eb;
}

.sub {
  font-size: 12px;
  color: #6b7280;
}

/* BUTTON */

.restore-btn {
  background: #16a34a;
  color: white;
  border: none;
  padding: 6px 14px;
  border-radius: 6px;
  cursor: pointer;
}

.restore-btn:hover {
  background: #15803d;
}

/* EMPTY */

.empty {
  text-align: center;
  padding: 30px;
  color: #6b7280;
}
</style>