<template>
  <div class="col s12 m6 l8">
        <div class="card orange darken-3 bill-card">
          <div class="card-content white-text">
            <div class="card-header">
              <span class="card-title">Курс валют</span>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Валюта</th>
                  <th>Курс</th>
                  <th>Дата</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="cur in currencies" :key="cur">
                  <td>{{ cur }}</td>
                  <td>{{ rates[cur] ? rates[cur].toFixed(2) : 1}}</td>
                  <td>{{filterDate(date)}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
</template>

<script>
export default {
  props: ['rates', 'date'],
  data: () => ({
    currencies: ['RUB', 'USD', 'EUR'],
  }),
  methods: {
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
