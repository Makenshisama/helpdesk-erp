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

  if (props.ticketEditando) {
    await updateTicket(props.ticketEditando.id, {
      titulo: titulo.value,
      descricao: descricao.value,
      prioridade: prioridade.value,
      status: status.value,
      cliente_id: cliente_id.value
    });

    emit("cancelarEdicao");
  } else {
    await createTicket({
      titulo: titulo.value,
      descricao: descricao.value,
      prioridade: prioridade.value,
      status: status.value,
      cliente_id: cliente_id.value
    });
  }

  emit("ticketCriado");

  titulo.value = "";
  descricao.value = "";
  prioridade.value = "";
  status.value = "Aberto";
  cliente_id.value = "";
}



watch(
  () => props.ticketEditando,
  (novoTicket) => {
    if (novoTicket) {
  titulo.value = novoTicket.titulo;
  descricao.value = novoTicket.descricao;
  prioridade.value = novoTicket.prioridade;
  status.value = novoTicket.status;
  cliente_id.value = novoTicket.cliente_id;
   }
  },
  { immediate: true }
);

</script>

<template>
  <div class="form">
    <h2>{{ ticketEditando ? "Editar Chamado" : "Novo Chamado" }}</h2>
   <div class="form-group">
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

    <button @click="salvar">
      {{ ticketEditando ? "Atualizar" : "Criar Chamado" }}
    </button>

    <button
      v-if="ticketEditando"
      @click="$emit('cancelarEdicao')"
    >
      Cancelar
    </button>
  </div>
</template>


<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 500px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: 600;
  margin-bottom: 6px;
  color: #000;
}

input,
textarea,
select {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
}

textarea {
  min-height: 100px;
  resize: vertical;
}

button {
  padding: 10px;
  border: none;
  border-radius: 6px;
  background-color: #2563eb;
  color: white;
  cursor: pointer;
}

button:hover {
  opacity: 0.9;
}

</style>
