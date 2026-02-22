<template>
  <form class="client-form" @submit.prevent="handleSubmit">
    <div v-if="isEdit" class="form-group">
      <label>Código do Cliente</label>
      <input :value="form.id" disabled />
    </div>    
    <div class="form-group">
      <label>CPF/CNPJ</label>
      <input v-model.trim="form.cpf_cnpj" required />
    </div>

    <div class="form-group">
      <label>Razão Social</label>
      <input v-model.trim="form.razao_social" required />
    </div>

    <div class="form-group">
      <label>Nome Fantasia</label>
      <input v-model.trim="form.nome_fantasia" />
    </div>

    <div class="form-group">
      <label>Email</label>
      <input v-model.trim="form.email" type="email" />
    </div>

    <div class="form-group">
      <label>Telefone</label>
      <input v-model.trim="form.telefone" />
    </div>

    <div class="form-actions">
      <button type="submit" :disabled="submitting">
        {{ isEdit ? "Atualizar" : "Salvar" }}
      </button>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    client: {
      type: Object,
      default: null
    }
  },

  data() {
    return {
      submitting: false,
      form: this.getEmptyForm()
    };
  },

  computed: {
    isEdit() {
      return !!this.client;
    }
  },

  watch: {
    client: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.form = { ...this.getEmptyForm(), ...newVal };
        }
      }
    }
  },

  methods: {
    getEmptyForm() {
      return {
        id: null,
        cpf_cnpj: "",
        razao_social: "",
        nome_fantasia: "",
        email: "",
        telefone: ""
      };
    },

    async handleSubmit() {
      if (this.submitting) return;

      this.submitting = true;

      try {
        // Emite apenas os dados limpos
        this.$emit("submit", { ...this.form });
      } finally {
        this.submitting = false;
      }
    }
  }
};
</script>

<style scoped>
.client-form {
  width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
  color: #ffffff;
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
  border: 1px solid #000000;
  border-radius: 6px;
  background-color: rgb(255, 255, 255);
  color: #000000;
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
  transition: 0.2s;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background-color: #1e40af;
}
</style>
