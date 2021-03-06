<template>
  <div>
    <div class="page-title">
      <h3>Планирование</h3>
      <h4>{{ filterCurrency(info.bill, 'RUB') }}</h4>
    </div>

    <Loader v-if="loading" />

    <p class="center" v-else-if="!categories.length">
      Категорий пока нет <router-link to="/categories">Добавить новую категорию</router-link>
    </p>

    <section v-else>
      <div v-for="cat in categories" :key="cat.id">
        <p>
          <strong>{{ cat.title }}</strong>
          {{ filterCurrency(cat.spend, 'RUB') }} из {{ filterCurrency(cat.limit, 'RUB') }}
        </p>
        <div class="progress" v-tooltip="cat.tooltip">
          <div
            class="determinate"
            :class="[cat.progressColor]"
            :style="{ width: `${cat.progressPercent}%` }"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { useMeta } from 'vue-meta';

export default {
  name: 'PlanningView',
  data: () => ({
    loading: true,
    categories: [],
  }),
  computed: {
    ...mapGetters(['info']),
  },
  methods: {
    filterCurrency(value, currency) {
      const options = {
        style: 'currency',
        currency,
      };
      return new Intl.NumberFormat('ru-Ru', options).format(value);
    },
  },
  async mounted() {
    useMeta({ title: 'Planning' });
    const records = await this.$store.dispatch('fetchRecords');
    const categories = await this.$store.dispatch('fetchCategories');

    this.categories = categories.map((cat) => {
      const spend = records
        .filter((r) => r.categoryID === cat.id)
        .filter((r) => r.type === 'outcome')
        .reduce((sum, r) => sum + +r.amount, 0);
      const percent = (100 * spend) / cat.limit;
      const progressPercent = percent > 100 ? 100 : percent;
      // eslint-disable-next-line no-nested-ternary
      const progressColor = percent < 60 ? 'green' : percent < 100 ? 'yellow' : 'red';
      const tooltipValue = cat.limit - spend;
      const tooltip = `${tooltipValue < 0 ? 'Превышение на' : 'Осталось'} ${this.filterCurrency(Math.abs(tooltipValue), 'RUB')}`;
      return {
        ...cat,
        progressPercent,
        progressColor,
        spend,
        tooltip,
      };
    });

    this.loading = false;
  },
};
</script>
