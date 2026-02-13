<script setup>
/**
 * Componente responsável por cadastrar novos chamados.
 * Emite evento para atualizar listagem após criação.
 */

import { ref, watch } from "vue";
import { createTicket, updateTicket } from "../services/ticketService";

const props = defineProps({
  ticketEditando: Object
});

const emit = defineEmits(["ticketCriado", "cancelarEdicao"]);

const titulo = ref("");
const descricao = ref("");
const prioridade = ref("");
const status = ref("Aberto");


async function salvar() {
  if (props.ticketEditando) {
    await updateTicket(props.ticketEditando.id, {
      titulo: titulo.value,
      descricao: descricao.value,
      prioridade: prioridade.value,
      status: status.value
    });

    emit("cancelarEdicao");
  } else {
    await createTicket({
      titulo: titulo.value,
      descricao: descricao.value,
      prioridade: prioridade.value,
      status: status.value
    });
  }

  emit("ticketCriado");

  // limpar formulário
  titulo.value = "";
  descricao.value = "";
  prioridade.value = "";
  status.value = "Aberto";
}


watch(
  () => props.ticketEditando,
  (novoTicket) => {
    if (novoTicket) {
      titulo.value = novoTicket.titulo;
      descricao.value = novoTicket.descricao;
      prioridade.value = novoTicket.prioridade;
      status.value = novoTicket.status;
    }
  },
  { immediate: true }
);

</script>

<template>
  <div class="form">
    <h2>Novo Chamado</h2>

    <input v-model="titulo" placeholder="Título" />
    <textarea v-model="descricao" placeholder="Descrição"></textarea>

    <select v-model="prioridade">
      <option>Baixa</option>
      <option>Média</option>
      <option>Alta</option>
    </select>

    <button @click="salvar"> {{ ticketEditando ? "Atualizar" : "Criar Chamado" }}  </button>
    <button v-if="ticketEditando" @click="$emit('cancelarEdicao')">  Cancelar  </button>
  </div>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}
</style>
