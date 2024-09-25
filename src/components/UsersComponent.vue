<template>
  <div>
    <h1>Пользователи</h1>
    <table>
      <thead>
        <tr>
          <th>Username</th>
          <th>Active</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.username" @click="toggleDetails(user)">
          <td>{{ user.username }}</td>
          <td>{{ user.isActive ? 'Yes' : 'No' }}</td>
        </tr>
      </tbody>
    </table>

    <div v-if="selectedUser" class="user-details">
      <h2>Информация о пользователе</h2>
      <p>Username: {{ selectedUser.username }}</p>
      <label>
        Active: 
        <input type="checkbox" v-model="selectedUser.isActive" />
      </label>
      <button @click="saveToBatch">OK</button>
      <button @click="closeDetails">Отмена</button>
    </div>
  <div v-if="modifiedUsers.length > 0" class="batch-save">
      <p>One or more users have been modified.</p>
      <button @click="saveBatch">Save</button>
    </div>
  </div>
</template>

<script>

import api from '../services/api';


export default {
  data() {
    return {
      users: [],
      selectedUser: null,
      modifiedUsers: []
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    toggleDetails(user) {
      this.selectedUser = user;
    },

    closeDetails() {
      this.selectedUser = null;
    },
    saveToBatch() {
      const index = this.modifiedUsers.findIndex(u => u.username === this.selectedUser.username);
      if (index === -1) {
        this.modifiedUsers.push(this.selectedUser);
      } else {
        this.modifiedUsers[index] = this.selectedUser;
      }
      this.closeDetails();
    },
    async fetchUsers() {
      try {
        const response = await api.getUsers();
        this.users = response.data;
      } catch (error) {
        console.error('Ошибка при получении пользователей:', error);
      }
    },
     async saveBatch() {
      try {
        for (const user of this.modifiedUsers) {
          await api.updateUserActivity(user.username, user.isActive);
        }
        alert('Изменения сохранены!');
        this.modifiedUsers = [];
      } catch (error) {
        console.error('Ошибка при сохранении изменений:', error);
      }
    }
  },
};
</script>

<style scoped>
.user-details {
  border: 1px solid #ccc;
  padding: 10px;
  margin-top: 10px;
}
.batch-save {
  margin-top: 20px;
  padding: 10px;
  background-color: #f1f1f1;
  border: 1px solid #ccc;
}
</style>
