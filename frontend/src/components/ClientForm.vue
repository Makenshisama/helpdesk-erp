<template>
  <form class="client-form" @submit.prevent="handleSubmit">
    <div class="form-group">
      <label>CPF/CNPJ</label>
      <input v-model="form.cpf_cnpj" required />
    </div>

    <div class="form-group">
      <label>Razão Social</label>
      <input v-model="form.razao_social" required />
    </div>

    <div class="form-group">
      <label>Nome Fantasia</label>
      <input v-model="form.nome_fantasia" />
    </div>

    <div class="form-group">
      <label>Email</label>
      <input v-model="form.email" type="email" />
    </div>

    <div class="form-group">
      <label>Telefone</label>
      <input v-model="form.telefone" />
    </div>

    <div class="form-actions">
      <button type="submit">
        {{ isEdit ? "Atualizar" : "Salvar" }}
      </button>
    </div>
  </form>
</template>


<script>
export default {
  props: {
    client: Object
  },
  data() {
    return {
      form: {
        cpf_cnpj: "",
        razao_social: "",
        nome_fantasia: "",
        email: "",
        telefone: ""
      }
    };
  },
  computed: {
    isEdit() {
      return !!this.client;
    }
  },
  mounted() {
    if (this.client) {
      this.form = { ...this.client };
    }
  },
  methods: {
    handleSubmit() {
      this.$emit("submit", this.form);
    }
  }
};
</script>

<style scoped>
.client-form {
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: 600;
  margin-bottom: 4px;
}

.form-group input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
}

button {
  padding: 8px 16px;
  border: none;
  background-color: #2563eb;
  color: white;
  border-radius: 6px;
  cursor: pointer;
}

button:hover {
  background-color: #1e40af;
}
</style>
