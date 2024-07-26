import { ref, computed, toRef } from 'vue';
import { defineStore } from 'pinia';
import type { Task } from '@/types/task';

interface State {
  _id: number;
  tasks: Array<Task>;
}

export const useTaskStore = defineStore('tasks', {
  state: (): State => ({
    _id: 0,
    tasks: [],
  }),
  actions: {
    createTask(newTask: Task & { id: number }) {
      newTask.id = this._id++;
      this.tasks.push(newTask);

      return newTask;
    },

    updateTask(id: number, updates: Task) {
      const index = this.tasks.findIndex((t) => t.id == id);
      if (index === -1) return;

      this.tasks[index] = { ...this.tasks[index], ...updates };
    },

    deleteTask(id: number) {
      this.tasks = this.tasks.filter((t) => t.id !== id);
    },

    getTask(id: number | string) {
      const index = this.tasks.findIndex((t) => t.id == id);
      if (index === -1) return;

      return toRef(this.tasks, index);
    },
  },
});
