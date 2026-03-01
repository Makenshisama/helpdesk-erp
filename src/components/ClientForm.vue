<template>
  <form class="client-form" @submit.prevent="handleSubmit">
    <div v-if="isEdit" class="form-group">
      <label>Código do Cliente</label>
      <input :value="form.id" disabled />
    </div>    
    <div class="form-group">
      <label>CPF/CNPJ</label>
      <input 
        :value="form.cpf_cnpj"
        @input="onCpfCnpjInput"
        required
      />
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
      <input 
        :value="form.telefone"
        @input="onPhoneInput"
      />
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

    onlyNumbers(value) {
      return (value || "").replace(/\D/g, "");
    },

    maskCpfCnpj(value) {
      let v = this.onlyNumbers(value).slice(0, 14);

      if (v.length <= 11) {
        v = v.replace(/(\d{3})(\d)/, "$1.$2");
        v = v.replace(/(\d{3})(\d)/, "$1.$2");
        v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
      } else {
        v = v.replace(/^(\d{2})(\d)/, "$1.$2");
        v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
        v = v.replace(/\.(\d{3})(\d)/, ".$1/$2");
        v = v.replace(/(\d{4})(\d)/, "$1-$2");
      }

      return v;
    },

     maskPhone(value) {
       let v = this.onlyNumbers(value);

       if (v.length > 10) {
         v = v.replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3");
      } else {
        v = v.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, "($1) $2-$3");
      }

      return v;
    },

     onCpfCnpjInput(e) {
       const numbers = this.onlyNumbers(e.target.value).slice(0, 14);
       this.form.cpf_cnpj = this.maskCpfCnpj(e.target.value);
     },

     onPhoneInput(e) {
       const numbers = this.onlyNumbers(e.target.value).slice(0, 11);
       this.form.telefone = this.maskPhone(e.target.value);
     },

    async handleSubmit() {
      if (this.submitting) return;

      this.submitting = true;

      try {
        this.$emit("submit", {
          ...this.form,
          cpf_cnpj: this.onlyNumbers(this.form.cpf_cnpj),
          telefone: this.onlyNumbers(this.form.telefone)
        });
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
