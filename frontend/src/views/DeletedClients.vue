<template>
  <div>
    <h2>Clientes Excluídos</h2>

    <table>
      <tr v-for="client in clients" :key="client.id">
        <td>{{ client.id }}</td>
        <td>{{ client.razao_social }}</td>

        <td>
          <button @click="restoreClient(client.id)">
            Restaurar
          </button>
        </td>
      </tr>
    </table>
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
    async loadDeletedClients() {
      const res = await clientService.getDeletedClients();
      this.clients = res.data;
    },

    async restoreClient(id) {
      await clientService.restoreClient(id);
      this.loadDeletedClients(); // ✅ corrigido
    }
  }
};
</script>