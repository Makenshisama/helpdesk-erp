<script setup>
import { ref, onMounted } from "vue";
import TicketListComponent from "../components/TicketList.vue";
import { getTickets } from "../services/ticketService";

const tickets = ref([]);

async function carregarTickets() {
  tickets.value = await getTickets();
}

onMounted(() => {
  carregarTickets();
});
</script>

<template>
  <div>
    <h1>Lista de Tickets</h1>

    <TicketListComponent
      :tickets="tickets"
      @atualizar="carregarTickets"
    />
  </div>
</template>
