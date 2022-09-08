import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import 'animate.css';
import '@a/css/tailwind.css';
import '@a/css/fonts.css';

createApp(App).use(router).mount('#app');
