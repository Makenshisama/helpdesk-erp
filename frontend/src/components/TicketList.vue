<script setup>
/**
 * Componente responsável por exibir listagem de chamados.
 * Recebe lista via props.
 */

import { deleteTicket } from "../services/ticketService";

const emit = defineEmits(["atualizar", "editar"]);

defineProps({
  tickets: Array,
});

async function remover(id) {
  if (!confirm("Tem certeza que deseja excluir este chamado?")) return;

  await deleteTicket(id);

  emit("atualizar");
}

function classeStatus(status) {
  if (status === "Aberto") return "aberto";
  if (status === "Em andamento") return "andamento";
  if (status === "Finalizado") return "finalizado";
  return "";
}

function classePrioridade(prioridade) {
  if (!prioridade) return "";

  const p = prioridade.toLowerCase();

  if (p.includes("baixa")) return "baixa";
  if (p.includes("media")) return "media";
  if (p.includes("alta")) return "alta";

  return "";
}


</script>

<template>
  <div>
    <h2>Lista de Chamados</h2>

    <div v-for="ticket in tickets" :key="ticket.id" class="card">
      <h3>{{ ticket.titulo }}</h3>
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
      <br />
      <div class="prioridade-container">
  <span 
    class="prioridade-badge"
    :class="classePrioridade(ticket.prioridade)"
  >
    <span class="bolinha"></span>
    {{ ticket.prioridade }}
  </span>
</div>

      <br />
      <button @click="remover(ticket.id)">Excluir</button>
      <button @click="emit('editar', ticket)">Editar</button>
    </div>
  </div>
</template>


<style scoped>
.card {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
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


</style>
