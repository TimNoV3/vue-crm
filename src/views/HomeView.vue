<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>

      <button class="btn waves-effect waves-light btn-small" @click="refresh">
        <i class="material-icons">refresh</i>
      </button>
    </div>
    <Loader v-if="loading"/>
    <div v-else class="row">
      <HomeBillVue
        :rates="currency.rates"
      />
      <HomeCurrencyVue
        :rates="currency.rates"
        :date="currency.timestamp"
      />
    </div>
  </div>
</template>

<script>
import HomeBillVue from '@/components/HomeBill.vue';
import HomeCurrencyVue from '@/components/HomeCurrency.vue';
import { useMeta } from 'vue-meta';

export default {
  name: 'HomeView',
  data: () => ({
    loading: true,
    currency: null,
  }),
  async mounted() {
    useMeta({ title: 'Home' });
    this.currency = await this.$store.dispatch('fetchCurrency');
    this.loading = false;
  },
  components: {
    HomeBillVue, HomeCurrencyVue,
  },
  methods: {
    async refresh() {
      this.loading = true;
      this.currency = await this.$store.dispatch('fetchCurrency');
      this.loading = false;
    },
  },
};
</script>
