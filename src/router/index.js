import { createRouter, createWebHistory } from 'vue-router';
import LoginComponent from '../components/LoginComponent.vue';
import WelcomeComponent from '../components/WelcomeComponent.vue';
import UsersComponent from '../components/UsersComponent.vue';

const routes = [
  { path: '/login', name: 'Login', component: LoginComponent },
  { path: '/welcome', name: 'Welcome', component: WelcomeComponent },
  { path: '/users', name: 'Users', component: UsersComponent }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('username');

  if (to.name === 'Welcome' && !isAuthenticated) {
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router;
