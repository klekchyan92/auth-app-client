import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5118/api',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(config => {
  const username = localStorage.getItem('username');
  const password = localStorage.getItem('password');
  
  if (username && password) {
    const base64Credentials = btoa(`${username}:${password}`);
    config.headers['Authorization'] = `Basic ${base64Credentials}`;
  }

  return config;
}, error => {
  return Promise.reject(error);
});

export default {
  login(user) {
    return apiClient.post('/Auth/login', user);
  },
  getWelcome() {
    return apiClient.get('/Welcome');
  },
  getUsers() {
    return apiClient.get('/Users');
  },
  updateUserActivity(username, isActive) {
    return apiClient.put(`/Users/${username}`, isActive );
  }
};
