import axios from 'axios';
import router from '@/router';
import { setGlobalLoading } from '@st/global';
import AuthService from './auth';
import UsersService from './users';
import FeedbacksService from './feedbacks';

const API_ENVS = {
  local: 'http://localhost:3000',
  production: 'https://backend-treinamento-vue3.vercel.app'
};

const httpClient = axios.create({
  baseURL: API_ENVS[process.env.NODE_ENV] ?? API_ENVS.local
});

httpClient.interceptors.request.use(
  config => {
    setGlobalLoading(true);
    const token = window.localStorage.getItem('token');

    if (token) {
      config.headers.common.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => Promise.reject(error)
);

httpClient.interceptors.response.use(
  response => {
    setGlobalLoading(false);
    return response;
  },
  error => {
    const canThrowError = error.request.status === 0 || error.request.status === 500;

    if (canThrowError) {
      setGlobalLoading(false);
      throw Error(error.message);
    }

    if (error.response.status === 401) {
      router.push({ name: 'Home' });
    }

    setGlobalLoading(false);
    return error;
  }
);

export default {
  auth: AuthService(httpClient),
  users: UsersService(httpClient),
  feedbacks: FeedbacksService(httpClient)
};
