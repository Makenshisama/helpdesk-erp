<script setup>
import { ref, onMounted } from "vue";
import TicketForm from "../components/TicketForm.vue";
import TicketList from "../components/TicketList.vue";
import { getTickets } from "../services/ticketService";

const tickets = ref([]);

async function carregarTickets() {
  tickets.value = await getTickets();
}

onMounted(() => {
  carregarTickets();
});
const ticketEditando = ref(null);

function editar(ticket) {
  ticketEditando.value = ticket;
}

function cancelarEdicao() {
  ticketEditando.value = null;
}

</script>

<template>
  <div>
    <h1>HelpDesk ERP</h1>

    <TicketForm 
  :ticketEditando="ticketEditando"
  @ticketCriado="carregarTickets"
  @cancelarEdicao="cancelarEdicao"
  />

    <TicketList 
  :tickets="tickets"
  @atualizar="carregarTickets"
  @editar="editar"
  />

  </div>
</template>
