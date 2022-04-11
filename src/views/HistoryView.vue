<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <Pie v-if="records.length" :chart-data="chartData"/>
      <!-- <canvas></canvas> -->
    </div>

    <Loader v-if="loading" />

    <p class="center" v-else-if="!records.length">
      Записей пока нет
      <router-link to="/record">Добавьте первую</router-link>
    </p>

    <section v-else>
      <HistoryTable :records="items" />
      <Paginate
        v-model="page"
        :page-count="pageCount"
        :click-handler="pageChangeHandler"
        :prev-text="'Назад'"
        :next-text="'Вперед'"
        :container-class="'pagination'"
        :page-class="'waves-effect'"
      />
    </section>
  </div>
</template>

<script>
import HistoryTable from '@/components/HistoryTable.vue';
import paginationMixin from '@/mixins/pagination.mixin';
import { Pie } from 'vue-chartjs';
import { useMeta } from 'vue-meta';
import {
  Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale,
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

export default {
  name: 'HistoryView',
  components: {
    HistoryTable, Pie,
  },
  mixins: [paginationMixin],
  data: () => ({
    loading: true,
    records: [],
    chartData: {
      labels: [],
      datasets: [
      ],
    },
  }),
  methods: {
    setup(categories) {
      this.setupPagination(this.records.map((record) => ({
        ...record,
        categoryName: categories.find((c) => c.id === record.categoryID).title,
        typeClass: record.type === 'income' ? 'green' : 'red',
        typeText: record.type === 'income' ? 'Доход' : 'Расход',
      })));

      this.chartData.labels = categories.map((c) => c.title);
      this.chartData.datasets.push({
        label: 'Расходы по категориям',
        backgroundColor: ['rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'],
        data: categories.map((c) => this.records.reduce((total, r) => {
          if (r.categoryID === c.id && r.type === 'outcome') {
            return total + +r.amount;
          }
          return total;
        }, 0)),
      });
    },
  },
  async mounted() {
    useMeta({ title: 'History' });
    this.records = await this.$store.dispatch('fetchRecords');
    const categories = await this.$store.dispatch('fetchCategories');
    this.setup(categories);
    this.loading = false;
  },
};
</script>
