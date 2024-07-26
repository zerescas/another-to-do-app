import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';

import App from './App.vue';
import router from './router';
import { useTaskStore } from './stores/taskStore';
import { useProjectStore } from './stores/projectStore';
import type { ToDo } from './types/todo';
import type { Task } from './types/task';
import type { Project } from './types/project';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(PrimeVue, {
  unstyled: true,
});

initPiniaStores();

app.mount('#app');

function initPiniaStores() {
  const tasks: Array<ToDo> = [
    {
      id: 0,
      content: 'Learn JavaScript',
      color: '#C1FEBC',
      done: true,
    },
    {
      id: 0,
      content: 'Finish the walkthrough of Elden Ring',
      color: '#F3BFFB',
      done: false,
    },
  ];

  const taskStore = useTaskStore();
  tasks.forEach((t) => {
    taskStore.createTask(t as Task);
  });

  const projects: Array<ToDo> = [
    {
      id: 0,
      content: "Stars don't twinkle",
      color: '#ecd786',
      done: true,
    },
    {
      id: 0,
      content: "The moon doesn't shine",
      color: '#a255fe',
      done: true,
    },
    {
      id: 0,
      content: "Birds don't sing",
      color: '#9b1101',
      done: false,
    },
    {
      id: 0,
      content: "The wind doesn't blow",
      color: '#019b70',
      done: false,
    },
  ];

  const projectStore = useProjectStore();
  projects.forEach((p) => {
    projectStore.createProject(p as Project);
  });
}
