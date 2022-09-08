import router from '@/router';
import axios from 'axios';
import AuthService from './auth';
import UsersService from './users';

const API_ENVS = {
  local: 'http://localhost:3000',
  production: 'https://api.example.com'
};

const httpClient = axios.create({
  baseURL: API_ENVS.local
});

httpClient.interceptors.response.use(
  response => response,
  error => {
    const canThrowError = error.request.status === 0 || error.request.status === 500;

    if (canThrowError) {
      throw Error(error.message);
    }

    if (error.response.status === 401) {
      router.push({ name: 'Home' });
    }

    return error;
  }
);

httpClient.interceptors.request.use(
  config => {
    const token = window.localStorage.getItem('token');

    if (token) {
      config.headers.common.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => Promise.reject(error)
);

export default {
  auth: AuthService(httpClient),
  users: UsersService(httpClient)
};
