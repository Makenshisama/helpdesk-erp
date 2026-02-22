<template>
  <div>
    <h2>Editar Cliente</h2>

    <ClientForm
      v-if="client"
      :client="client"
      @submit="updateClient"
    />
  </div>
</template>

<script>
import ClientForm from "../components/ClientForm.vue";
import clientService from "../services/clientService";

export default {
  components: { ClientForm },

  data() {
    return {
      client: null
    };
  },

  async mounted() {
    const id = this.$route.params.id;

    try {
      this.client = await clientService.getClient(id);
    } catch (error) {
      console.error(error);
      alert("Erro ao carregar cliente");
    }
  },

  methods: {
    async updateClient(data) {
      try {
        await clientService.updateClient(data.id, data);
        this.$router.push("/clients");
      } catch (error) {
        console.error(error);
        alert("Erro ao atualizar cliente");
      }
    }
  }
};
</script>