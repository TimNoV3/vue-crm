<template>
  <ul class="sidenav app-sidenav" :class="{open: modelValue}">
    <router-link
      v-for="link in links"
      :key="link.url"
      :to="link.url"
      custom
      v-slot="{ navigate, isActive }"
    >
      <li @click="navigate" @keypress.enter="navigate" :class="{ 'active': isActive }">
        <a href="#" class="waves-effect waves-orange pointer">{{ link.title }}</a>
      </li>
    </router-link>
  </ul>
</template>

<script>
import localizeFilter from '@/filters/locale.filter';

export default {
  props: ['modelValue'],
  data: () => ({
    links: [
      {
        title: localizeFilter('Menu_Bill'),
        url: '/',
        exact: true,
      },
      {
        title: localizeFilter('Menu_History'),
        url: '/history',
      },
      {
        title: localizeFilter('Menu_Planning'),
        url: '/planning',
      },
      {
        title: localizeFilter('Menu_Record'),
        url: '/record',
      },
      {
        title: localizeFilter('Menu_Categories'),
        url: '/categories',
      },
    ],
  }),
};
</script>
