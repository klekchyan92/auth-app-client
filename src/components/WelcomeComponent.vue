<template>
  <div>
    <h1>Welcome, {{ username }}!</h1>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import api from '../services/api';

export default {
  data() {
    return {
      username: '',
      message: '',
    };
  },
  created() {
    this.username = localStorage.getItem('username') || 'Guest';
  },
  async mounted() {
    try {
      const response = await api.getWelcome();
      this.message = response.data;
    } catch (error) {
      console.log('Error fetching welcome message');
    }
  },
};
</script>
