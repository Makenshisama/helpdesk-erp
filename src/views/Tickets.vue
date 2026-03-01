<script setup>
import { ref, onMounted } from "vue";
import TicketForm from "../components/TicketForm.vue";
import TicketList from "../components/TicketList.vue";
import { getTickets } from "../services/ticketService";

const tickets = ref([]);
const ticketEditando = ref(null);
const mostrandoFormulario = ref(false);

async function carregarTickets() {
  const response = await getTickets();
  tickets.value = response;
}

function novoTicket() {
  ticketEditando.value = null;
  mostrandoFormulario.value = true;
}

function editarTicket(ticket) {
  ticketEditando.value = ticket;
  mostrandoFormulario.value = true;
}

function fecharFormulario() {
  mostrandoFormulario.value = false;
  ticketEditando.value = null;
}

function atualizarLista() {
  carregarTickets();
  fecharFormulario();
}

onMounted(carregarTickets);
</script>


<template>
  <div>

    <!-- LISTA -->
    <div v-if="!mostrandoFormulario">
      <button @click="novoTicket">Novo Ticket</button>

      <TicketList
        :tickets="tickets"
        @atualizar="carregarTickets"
        @editar="editarTicket"
      />
    </div>

    <!-- FORMULÁRIO -->
    <TicketForm
      v-if="mostrandoFormulario"
      :ticketEditando="ticketEditando"
      @ticketCriado="atualizarLista"
      @cancelarEdicao="fecharFormulario"
    />

  </div>
</template>

