<template>
  <div>
    <div class="page-title">
      <h3>{{ $filters.localizeFilter('ProfileTitle') }}</h3>
    </div>

    <form class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="userName"
          :class="{
            invalid: this.v$.userName.$errors.length && this.v$.userName.$dirty,
          }"
        />
        <label for="description">{{ $filters.localizeFilter('Name') }}</label>
        <small
          class="helper-text invalid"
          v-if="this.v$.userName.required.$invalid && this.v$.userName.$dirty"
          >{{ this.v$.userName.required.$message }}</small
        >
      </div>

      <div class="switch">
        <label>
          English
          <input type="checkbox" v-model="isRuLocale"/>
          <span class="lever"></span>
          Русский
        </label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{$filters.localizeFilter('Update')}}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { required } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import { useMeta } from 'vue-meta';

export default {
  data: () => ({
    userName: '',
    isRuLocale: true,
    v$: useVuelidate(),
  }),
  computed: {
    ...mapGetters(['info']),
  },
  validations: () => ({
    userName: { required },
  }),
  mounted() {
    useMeta({ title: 'Profile' });
    this.userName = this.info.name;
    this.isRuLocale = this.info.locale === 'ru-RU';
    setTimeout(() => {
      M.updateTextFields();
    }, 0);
  },
  methods: {
    ...mapActions(['updateInfo']),
    async submitHandler() {
      this.v$.$validate();
      if (this.v$.$error) {
        this.v$.$touch();
        return;
      }
      try {
        await this.updateInfo({
          name: this.userName,
          locale: this.isRuLocale ? 'ru-RU' : 'en-US',
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.switch {
  margin-bottom: 2rem;
}
</style>
