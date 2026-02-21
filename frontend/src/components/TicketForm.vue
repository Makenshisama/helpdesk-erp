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
  <div class="form">
    <h2>{{ ticketEditando ? "Editar Chamado" : "Novo Chamado" }}</h2>
   <div class="form-group">
    <div v-if="ticketEditando">
      <h3>Histórico</h3>
       <div class="timeline">
        <div v-for="msg in mensagens" :key="msg.id" class="mensagem">
          <strong>{{ msg.autor }}</strong>
          <small>{{ msg.data }}</small>
          <p>{{ msg.mensagem }}</p>
        </div>
       </div>
      <textarea v-model="novaMensagem" placeholder="Digite uma nova mensagem..."></textarea>
      <button @click="enviarMensagem">Enviar Mensagem</button>
      <button @click="finalizarTicket">Finalizar Ticket</button>
    </div>

    <label>Cliente</label>

      <select
        v-model="cliente_id" :disabled="ticketEditando" required>
        <option disabled value="">Selecione um cliente</option>
        <option v-for="cliente in clientes" :key="cliente.id" :value="cliente.id">
        {{ cliente.razao_social }}
        </option>
      </select>
  </div>


    <div class="form-group">
      <label for="titulo">Título</label>
      <input
        id="titulo"
        v-model="titulo"
        placeholder="Digite o título do chamado"
      />
    </div>

    <div class="form-group">
      <label for="descricao">Descrição</label>
      <textarea
        id="descricao"
        v-model="descricao"
        placeholder="Descreva o problema ou solicitação"
      ></textarea>
    </div>

    <div class="form-group">
      <label for="prioridade">Prioridade</label>
      <select id="prioridade" v-model="prioridade" required>
        <option disabled value="">Selecione a prioridade</option>
        <option value="Baixa">Baixa</option>
        <option value="Média">Média</option>
        <option value="Alta">Alta</option>
      </select>
    </div>
    <div class="button-group">
      <button @click="salvar">{{ ticketEditando ? "Atualizar" : "Criar Chamado" }}</button>
      <button class="cancel" @click="$emit('cancelarEdicao')">Cancelar</button>
    </div>
  </div>
</template>


<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 1500px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: 600;
  margin-bottom: 6px;
  color: #ffffff;
}

input,
textarea,
select {
  padding: 10px;
  border: 1px solid #ffca38;
  border-radius: 6px;
  font-size: 14px;
  background-color: #ffffff;
  color:#000000;
  font-weight: 600;
  text-align: center;
}

textarea {
  min-height: 100px;
  min-width: 800px;
  resize: vertical;
}

button {
  padding: 10px;
  border: none;
  border-radius: 6px;
  background-color: #2bee35;
  color: rgb(0, 0, 0);
  cursor: pointer;
}

.button-group .cancel {
  background-color: #e6311d;
  color: white;
}

button:hover {
  opacity: 0.9;
}

.timeline {
  border: 1px solid #ddd;
  padding: 10px;
  max-height: 250px;
  overflow-y: auto;
  background: #5a6977;
}

.mensagem {
  margin-bottom: 12px;
  padding: 8px;
  background: rgb(59, 49, 49);
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.button-group {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 10px;
}




</style>
