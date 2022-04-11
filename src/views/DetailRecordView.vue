<template>
  <div>
    <Loader v-if="loading" />
    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">История</router-link>
        <a @click.prevent class="breadcrumb">
          {{ record.type === 'income' ? 'Доход' : 'Расход' }}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div
            class="card"
            :class="{
              red: record.type === 'outcome',
              green: record.type === 'income',
            }"
          >
            <div class="card-content white-text">
              <p>Описание: {{ record.description }}</p>
              <p>Сумма: {{ filterCurrency(record.amount, 'RUB') }}</p>
              <p>Категория: {{ record.categoryName }}</p>

              <small>{{ filterDate(record.date) }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="center" v-else>Такой записи нет</p>
  </div>
</template>

<script>
export default {
  name: 'DetailView',
  data: () => ({
    record: null,
    loading: true,
  }),
  async mounted() {
    const { id } = this.$route.params;
    const record = await this.$store.dispatch('fetchRecordByID', id);
    const category = await this.$store.dispatch('fetchCategoryByID', record.categoryID);

    this.record = {
      ...record,
      categoryName: category.title,
    };

    this.loading = false;
  },
  methods: {
    filterCurrency(value, currency) {
      const options = {
        style: 'currency',
        currency,
      };
      return new Intl.NumberFormat('ru-Ru', options).format(value);
    },
    filterDate(date) {
      const options = {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      };

      return new Intl.DateTimeFormat(this.$store.getters.info.locale, options).format(
        new Date(date),
      );
    },
  },
};
</script>
