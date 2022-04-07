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
      <div class="input-field">
        <input
          id="name"
          type="text"
          v-model.trim="name"
          :class="{
            invalid: this.v$.name.$errors.length && this.v$.name.$dirty,
          }"
        />
        <label for="name">Имя</label>
        <small
          class="helper-text invalid"
          v-if="this.v$.name.required.$invalid && this.v$.name.$dirty"
          >{{ this.v$.name.required.$message }}</small
        >
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="agree"/>
          <span>С правилами согласен</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { email, required, minLength } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';

export default {
  name: 'registerView',
  data: () => ({
    v$: useVuelidate(),
    email: '',
    password: '',
    name: '',
    agree: false,
  }),
  validations: () => ({
    email: { email, required },
    password: { required, minLength: minLength(6) },
    name: { required },
    agree: { checked: (v) => v },
  }),
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
        name: this.name,
      };
      try {
        await this.$store.dispatch('register', formData);
        this.$router.push('/');
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
