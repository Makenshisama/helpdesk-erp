<script setup>
import { ref, onMounted } from "vue";
import TicketForm from "../components/TicketForm.vue";
import TicketList from "../components/TicketList.vue";
import { getTickets } from "../services/ticketService";

const tickets = ref([]);
const ticketEditando = ref(null);

async function carregarTickets() {
  const response = await getTickets();
  tickets.value = response.data;
}

function editarTicket(ticket) {
  ticketEditando.value = ticket;
}

function cancelarEdicao() {
  ticketEditando.value = null;
}

onMounted(carregarTickets);
</script>

<template>
  <div>
    <TicketForm
      :ticketEditando="ticketEditando"
      @ticketCriado="carregarTickets"
      @cancelarEdicao="cancelarEdicao"
    />

    <TicketList
      :tickets="tickets"
      @atualizar="carregarTickets"
      @editar="editarTicket"
    />
  </div>
</template>
