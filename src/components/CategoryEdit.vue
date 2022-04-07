<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <select ref="select" v-model="current">
            <option v-for="category of categories" :key="category.id" :value="category.id">
              {{ category.title }}
            </option>
          </select>
          <label>Выберите категорию</label>
        </div>

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
          Обновить
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
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    select: null,
    v$: useVuelidate(),
    title: '',
    limit: 100,
    current: null,
  }),
  watch: {
    current(catID) {
      const { title, limit } = this.categories.find((c) => c.id === catID);
      this.title = title;
      this.limit = limit;
    },
  },
  created() {
    const { id, title, limit } = this.categories[0];
    this.current = id;
    this.title = title;
    this.limit = limit;
  },
  validations: () => ({
    title: { required },
    limit: { minValue: minValue(100) },
  }),
  mounted() {
    this.select = M.FormSelect.init(this.$refs.select);
    M.updateTextFields();
  },
  beforeUnmount() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
  methods: {
    async submitHandler() {
      this.v$.$validate();
      if (this.v$.$error) {
        this.v$.$touch();
        return;
      }

      try {
        const categoryData = {
          id: this.current,
          title: this.title,
          limit: this.limit,
        };
        await this.$store.dispatch('updateCategory', categoryData);
        this.$message('Категория успешно обновлена');
        this.$emit('updated', categoryData);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
