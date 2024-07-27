import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';

import App from './App.vue';
import router from './router';
import { initPiniaStores } from './assets/pinia-init';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(PrimeVue, {
  unstyled: true,
});

initPiniaStores();

app.mount('#app');
