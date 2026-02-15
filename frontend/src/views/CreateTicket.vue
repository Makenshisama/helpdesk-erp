<script setup>
import { ref } from "vue";
import TicketForm from "../components/TicketForm.vue";

const ticketEditando = ref(null);

function cancelarEdicao() {
  ticketEditando.value = null;
}
</script>

<template>
  <div>
    <h1>Novo Ticket</h1>

    <TicketForm
      :ticketEditando="ticketEditando"
      @cancelarEdicao="cancelarEdicao"
    />
  </div>
</template>
