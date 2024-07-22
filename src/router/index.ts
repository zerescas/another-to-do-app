import { createRouter, createWebHistory } from 'vue-router';
import MainMenu from '../views/MainMenu.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Main Menu',
      component: MainMenu,
    },
    {
      path: '/tasks',
      name: 'Tasks',
      component: () => import('../views/TasksView.vue'),
    },
    {
      path: '/projects',
      name: 'Projects',
      component: () => import('@/views/ProjectsView.vue'),
    },
  ],
});

export default router;
