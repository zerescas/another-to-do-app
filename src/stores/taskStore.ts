import { ref, computed, toRef } from 'vue';
import { defineStore } from 'pinia';
import type { Task } from '@/types/task';
import { loadStateToLocalStorage } from './common/load-state-from-local-storage';

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
      this.saveStateToLocalStorage();

      return newTask;
    },

    updateTask(id: number, updates: Partial<Task>) {
      const index = this.tasks.findIndex((t) => t.id == id);
      if (index === -1) return;

      this.tasks[index] = { ...this.tasks[index], ...updates };
      this.saveStateToLocalStorage();
    },

    deleteTask(id: number) {
      this.tasks = this.tasks.filter((t) => t.id !== id);
      this.saveStateToLocalStorage();
    },

    getTask(id: number | string) {
      const index = this.tasks.findIndex((t) => t.id == id);
      if (index === -1) return;

      return toRef(this.tasks, index);
    },

    loadStateFromLocalStorage(): boolean {
      const propertiesToLoad = ['_id', 'tasks'];

      return loadStateToLocalStorage(this, propertiesToLoad, 'taskStore');
    },

    saveStateToLocalStorage() {
      const currentState = {
        _id: this._id,
        tasks: this.tasks,
      } as State;

      localStorage.setItem('taskStore', JSON.stringify(currentState));
    },
  },
});
