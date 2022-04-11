<template>
  <div class="col s12 m6 l4">
        <div class="card light-blue bill-card">
          <div class="card-content white-text">
            <span class="card-title">Счет в валюте</span>

            <p
              class="currency-line"
              :key="cur"
              v-for="cur in currencies"
            >
              <span>{{ filterCurrency(getCurrency(cur), cur) }}</span>
            </p>
          </div>
        </div>
      </div>
</template>

<script>
export default {
  props: ['rates'],
  data: () => ({
    currencies: ['RUB', 'USD', 'EUR'],
  }),
  computed: {
    base() {
      return this.$store.getters.info.bill / (this.rates.RUB / this.rates.EUR);
    },
  },
  methods: {
    getCurrency(currency) {
      const rate = this.rates[currency] ? this.rates[currency] : 1;
      return Math.floor(this.base * rate);
    },
    filterCurrency(value, currency) {
      const options = {
        style: 'currency',
        currency,
      };
      return new Intl.NumberFormat('ru-Ru', options).format(value);
    },
  },
};
</script>
