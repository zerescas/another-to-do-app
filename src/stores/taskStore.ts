import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    tasks: [
      {
        content: 'Learn JavaScript',
        color: '#C1FEBC',
        done: true,
      },
      {
        content: 'Finish the walkthrough of Elden Ring',
        color: '#F3BFFB',
        done: false,
      },
    ],
  }),
  actions: {
    updateTaskStatus(index: number, done: boolean) {
      this.tasks[index].done = done;
    },
  },
});
