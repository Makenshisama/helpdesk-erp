<template>
  <div class="create-client">

    <!-- HEADER -->
    <div class="page-header">
      <button class="back-button" @click="$router.back()">
        ← Voltar
      </button>

      <h2>Novo Cliente</h2>
    </div>

    <!-- FORM -->
    <ClientForm @submit="saveClient($event)" />

  </div>
</template>

<script>
import ClientForm from "../components/ClientForm.vue";
import clientService from "../services/clientService";

export default {
  components: { ClientForm },
  methods: {
   async saveClient(data) {

  if (!data || data.isTrusted) return;

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

