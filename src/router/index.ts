import { createRouter, createWebHistory } from 'vue-router';
import MainMenu from '../views/MainMenu.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainMenu,
    },
  ],
});

export default router;
