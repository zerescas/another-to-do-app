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
    {
      path: '/tasks/edit/:id',
      name: 'TaskSettings',
      component: () => import('@/views/ToDoSettings/TaskSettingsView.vue'),
    },
    {
      path: '/projects/edit/:id',
      name: 'ProjectSettings',
      component: () => import('@/views/ToDoSettings/ProjectSettingsView.vue'),
    },
  ],
});

export default router;
