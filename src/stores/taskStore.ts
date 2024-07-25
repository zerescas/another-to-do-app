import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import type { Task } from '@/types/task';

interface State {
  tasks: Array<Task>;
}

export const useTaskStore = defineStore('tasks', {
  state: (): State => ({
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
    createTask(newTask: Task) {
      this.tasks.push(newTask);
    },
    updateTask(index: number, updates: Task) {
      this.tasks[index] = { ...this.tasks[index], ...updates };
    },
  },
});
