<script setup>
/**
 * Componente responsável por exibir listagem de chamados.
 * Recebe lista via props.
 */

import { deleteTicket } from "../services/ticketService";
import clientService from "../services/clientService";
import { onMounted, ref } from "vue";

const clientes = ref([]);
const emit = defineEmits(["atualizar", "editar"]);

onMounted(async () => {
  const response = await clientService.getClients();
  clientes.value = response.data;
});

defineProps({
  tickets: Array,
});

async function remover(id) {
  if (!confirm("Tem certeza que deseja excluir este chamado?")) return;

  await deleteTicket(id);

  emit("atualizar");
}

function classeStatus(status) {
  if (!status) return "";

  const s = status
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  if (s.includes("aberto")) return "aberto";
  if (s.includes("andamento")) return "andamento";
  if (s.includes("concluido")) return "finalizado"; 

  return "";
}



function classePrioridade(prioridade) {
  if (!prioridade) return "";

  const p = prioridade
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  if (p.includes("baixa")) return "baixa";
  if (p.includes("media")) return "media";
  if (p.includes("alta")) return "alta";

  return "";
}


function nomeCliente(id) {
  const cliente = clientes.value.find(c => c.id === id);
  return cliente ? cliente.razao_social : "Não encontrado";
}



</script>

<template>
  <div >
    <h2>Lista de Chamados</h2>
     <div class="ticket-list">
     <div v-for="ticket in tickets" :key="ticket.id" class="card">
       <h3>{{ ticket.titulo }}</h3>

       <p><strong>Cliente:</strong> {{ nomeCliente(ticket.cliente_id) }}</p>

       <p>{{ ticket.descricao }}</p>

       <div class="status-container">
         <span 
           class="status-badge"
           :class="classeStatus(ticket.status)"
         >
           <span class="bolinha"></span>
           {{ ticket.status }}
         </span>
       </div>

       <div class="prioridade-container">
         <span 
           class="prioridade-badge"
           :class="classePrioridade(ticket.prioridade)"
         >
           <span class="bolinha"></span>
           {{ ticket.prioridade }}
         </span>
       </div>

       <div class="acoes">
        <button @click="remover(ticket.id)">Excluir</button>
        <button @click="emit('editar', ticket)">Editar</button>
       </div>
     </div>
     </div>
  </div>
</template>



<style scoped>
.card {
  background: #2f3136;
  color: #f1f1f1;
  border-radius: 10px;
  padding: 16px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  transition: transform 0.2s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card:hover {
  transform: translateY(-4px);
}

.status-badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
  gap: 6px;
}

/* Bolinha */
.bolinha {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

/* Aberto */
.aberto {
  background-color: #e6f4ea;
  color: #1e7e34;
}

.aberto .bolinha {
  background-color: #28a745;
}

/* Em andamento */
.andamento {
  background-color: #fff3cd;
  color: #856404;
}

.andamento .bolinha {
  background-color: #ffc107;
}

/* Finalizado */
.finalizado {
  background-color: #f8d7da;
  color: #721c24;
}

.finalizado .bolinha {
  background-color: #dc3545;
}

.prioridade-badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
  gap: 6px;
  margin-top: 5px;
}

/* Baixa */
.baixa {
  background-color: #e7f1ff;
  color: #084298;
}

.baixa .bolinha {
  background-color: #0d6efd;
}

/* Média */
.media {
  background-color: #fff3cd;
  color: #856404;
}

.media .bolinha {
  background-color: #ff9800;
}

/* Alta */
.alta {
  background-color: #f8d7da;
  color: #842029;
}

.alta .bolinha {
  background-color: #dc3545;
}

.ticket-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
}


</style>
