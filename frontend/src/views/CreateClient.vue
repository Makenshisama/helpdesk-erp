<template>
  <div>
    <h2>Novo Cliente</h2>
    <ClientForm @submit="saveClient" />
  </div>
</template>

<script>
import ClientForm from "../components/ClientForm.vue";
import clientService from "../services/clientService";

export default {
  components: { ClientForm },
  methods: {
    async saveClient(data) {
      try {
        await clientService.createClient(data);
        this.$router.push("/clients");
      } catch (error) {
        console.error(error);
        alert("Erro ao salvar cliente");
      }
    }
  }
};
</script>
