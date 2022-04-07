<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Создать</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model.trim="title"
            :class="{ invalid: this.v$.title.$errors.length && this.v$.title.$dirty }"
          />
          <label for="name">Название</label>
          <span
            v-if="this.v$.title.$errors.length && this.v$.title.$dirty"
            class="helper-text invalid"
            >Введите название категории</span
          >
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{ invalid: this.v$.limit.$errors.length && this.v$.limit.$dirty }"
          />
          <label for="limit">Лимит</label>
          <span
            v-if="this.v$.limit.$errors.length && this.v$.limit.$dirty"
            class="helper-text invalid"
            >Минимальная величина {{ this.v$.limit.minValue.$params.min }}</span
          >
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Создать
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';

export default {
  data: () => ({
    v$: useVuelidate(),
    title: '',
    limit: 100,
  }),
  validations: () => ({
    title: { required },
    limit: { minValue: minValue(100) },
  }),
  mounted() {
    M.updateTextFields();
  },
  methods: {
    async submitHandler() {
      this.v$.$validate();
      if (this.v$.$error) {
        this.v$.$touch();
        return;
      }

      try {
        const category = await this.$store.dispatch('createCategory', {
          title: this.title,
          limit: this.limit,
        });
        this.title = '';
        this.limit = 100;
        this.v$.$reset();
        this.$message('Категория была успешно создана!');
        this.$emit('created', category);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
