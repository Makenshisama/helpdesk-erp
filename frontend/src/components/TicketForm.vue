<script setup>
/**
 * Componente responsável por cadastrar novos chamados.
 * Emite evento para atualizar listagem após criação.
 */

import { ref, watch } from "vue";
import { createTicket, updateTicket } from "../services/ticketService";
import clientService from "../services/clientService";
import { onMounted } from "vue";

const clientes = ref([]);
const cliente_id = ref("");
const mensagens = ref([]);
const novaMensagem = ref("");

onMounted(async () => {
  try {
    const response = await clientService.getClients();
    clientes.value = response.data;
  } catch (error) {
    console.error("Erro ao carregar clientes:", error);
  }
});


const props = defineProps({
  ticketEditando: Object
});

const emit = defineEmits(["ticketCriado", "cancelarEdicao"]);

const titulo = ref("");
const descricao = ref("");
const prioridade = ref("");
const status = ref("Aberto");


async function salvar() {
  if (!cliente_id.value) {
    alert("Selecione um cliente antes de salvar.");
    return;
  }

  try {
    if (props.ticketEditando) {
      await updateTicket(props.ticketEditando.id, {
        titulo: titulo.value,
        prioridade: prioridade.value,
        status: status.value,
        cliente_id: cliente_id.value
      });

      emit("cancelarEdicao");
    } else {
      // 1️⃣ Criar ticket
      const response = await createTicket({
        titulo: titulo.value,
        prioridade: prioridade.value,
        status: status.value,
        cliente_id: cliente_id.value
      });

      const ticketId = response.id;

      // 2️⃣ Criar primeira mensagem
      if (descricao.value.trim()) {
        await fetch(`http://localhost:3000/tickets/${ticketId}/messages`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mensagem: descricao.value,
            autor: "Cliente"
          })
        });
      }
    }

    emit("ticketCriado");

    titulo.value = "";
    descricao.value = "";
    prioridade.value = "";
    status.value = "Aberto";
    cliente_id.value = "";

  } catch (error) {
    console.error(error);
    alert("Erro ao salvar chamado");
  }
}

async function carregarMensagens() {
  if (!props.ticketEditando) return;

  const response = await fetch(
    `http://localhost:3000/tickets/${props.ticketEditando.id}/messages`
  );

  mensagens.value = await response.json();
}

async function enviarMensagem() {
  if (!novaMensagem.value.trim()) return;

  await fetch(
    `http://localhost:3000/tickets/${props.ticketEditando.id}/messages`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mensagem: novaMensagem.value,
        autor: "Técnico"
      })
    }
  );

  novaMensagem.value = "";
  await carregarMensagens();
}

async function finalizarTicket() {
  await fetch(
    `http://localhost:3000/tickets/${props.ticketEditando.id}/finalizar`,
    { method: "PUT" }
  );

  alert("Ticket finalizado!");
  emit("ticketCriado");
}




watch(
  () => props.ticketEditando,
  async (novoTicket) => {
    if (novoTicket) {
      titulo.value = novoTicket.titulo;
      descricao.value = novoTicket.descricao;
      prioridade.value = novoTicket.prioridade;
      status.value = novoTicket.status;
      cliente_id.value = novoTicket.cliente_id;

      await carregarMensagens();
    }
  },
  { immediate: true }
);


</script>

<template>
  <div class="ticket-container">

    <!-- LEFT: FORM -->
    <div class="ticket-form">

      <h2>
        {{ ticketEditando ? "Editar Chamado" : "Novo Chamado" }}
      </h2>

      <div class="form-group">
        <label>Cliente</label>

        <select v-model="cliente_id"
                :disabled="ticketEditando"
                required>
          <option disabled value="">Selecione um cliente</option>

          <option
            v-for="cliente in clientes"
            :key="cliente.id"
            :value="cliente.id">
            {{ cliente.razao_social }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label>Título</label>
        <input v-model="titulo" />
      </div>

      <div class="form-group">
        <label>Descrição</label>
        <textarea v-model="descricao"></textarea>
      </div>

      <div class="form-group">
        <label>Prioridade</label>
        <select v-model="prioridade">
          <option disabled value="">Selecione</option>
          <option>Baixa</option>
          <option>Média</option>
          <option>Alta</option>
        </select>
      </div>

      <div class="button-group">
        <button class="primary" @click="salvar">
          {{ ticketEditando ? "Atualizar" : "Criar Chamado" }}
        </button>

        <button class="cancel" @click="$emit('cancelarEdicao')">
          Cancelar
        </button>
      </div>

    </div>

    <!-- RIGHT: TIMELINE -->
    <div v-if="ticketEditando" class="ticket-chat">

      <h3>Histórico</h3>

      <div class="timeline">
        <div
          v-for="msg in mensagens"
          :key="msg.id"
          class="mensagem">

          <div class="msg-header">
            <strong>{{ msg.autor }}</strong>
            <span>{{ msg.data }}</span>
          </div>

          <p>{{ msg.mensagem }}</p>
        </div>
      </div>

      <textarea
        v-model="novaMensagem"
        placeholder="Digite uma mensagem..."
      />

      <div class="chat-actions">
        <button @click="enviarMensagem">Enviar</button>
        <button class="finish" @click="finalizarTicket">
          Finalizar
        </button>
      </div>

    </div>

  </div>
</template>


<style scoped>
.ticket-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

/* CARD */

.ticket-form,
.ticket-chat {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.06);
}

/* FORM */

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 14px;
}

label {
  font-weight: 600;
  margin-bottom: 4px;
  color: #374151;
}

input,
textarea,
select {
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

textarea {
  min-height: 100px;
}

/* BUTTONS */

.button-group {
  display: flex;
  gap: 10px;
}

.primary {
  background: #2563eb;
  color: white;
}

.primary:hover {
  background: #1e40af;
}

.cancel {
  background: #ef4444;
  color: white;
}

/* CHAT */

.timeline {
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 10px;
}

.mensagem {
  background: #f9fafb;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 10px;
}

.msg-header {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #6b7280;
}

.chat-actions {
  display: flex;
  gap: 10px;
}

.finish {
  background: #16a34a;
  color: white;
}

</style>
