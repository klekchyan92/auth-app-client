<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <div>
        <label for="username">Username:</label>
        <input type="text" v-model="username" />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="password" />
      </div>
      <button type="submit">Submit</button>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import api from '../services/api';

export default {
  data() {
    return {
      username: '',
      password: '',
      error: '',
    };
  },
  methods: {
    async login() {
      try {
        const response = await api.login({
          username: this.username,
          password: this.password,
        });

        if (response.data.active === false) {
          this.error = 'User is not active';
          this.password = '';
        } else {
          localStorage.setItem('username', this.username);
          localStorage.setItem('password', this.password);
          this.$router.push('/welcome');
        }
      } catch (error) {
        this.error = 'We could not log you in. Please check your username/password and try again.';
        this.password = '';
      }
    },
  },
};
</script>
