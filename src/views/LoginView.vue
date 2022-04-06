<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{
            invalid: this.v$.email.$errors.length && this.v$.email.$dirty,
          }"
        />
        <label for="email">Email</label>
        <small
          class="helper-text invalid"
          v-if="this.v$.email.email.$invalid && this.v$.email.$dirty"
          >{{ this.v$.email.email.$message }}</small
        >
        <small
          class="helper-text invalid"
          v-else-if="this.v$.email.required.$invalid && this.v$.email.$dirty"
          >{{ this.v$.email.required.$message }}</small
        >
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model.trim="password"
          :class="{
            invalid: this.v$.password.$errors.length && this.v$.password.$dirty,
          }"
        />
        <label for="password">Пароль</label>
        <small
          class="helper-text invalid"
          v-if="this.v$.password.required.$invalid && this.v$.password.$dirty"
          >{{ this.v$.password.required.$message }}</small
        >
        <small
          class="helper-text invalid"
          v-else-if="this.v$.password.minLength.$invalid && this.v$.password.$dirty"
          >Длина пароля должна быть больше {{ this.v$.password.minLength.$params.min }}</small
        >
      </div>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <router-link to="/register">Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { email, required, minLength } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import messages from '@/utils/messages';

export default {
  name: 'loginPage',
  data: () => ({
    v$: useVuelidate(),
    email: '',
    password: '',
  }),
  validations: () => ({
    email: { email, required },
    password: { required, minLength: minLength(6) },
  }),
  mounted() {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message]);
    }
  },
  methods: {
    async submitHandler() {
      this.v$.$validate();
      if (this.v$.$error) {
        this.v$.$touch();
        return;
      }
      const formData = {
        email: this.email,
        password: this.password,
      };
      try {
        await this.$store.dispatch('login', formData);
        this.$router.push('/');
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
