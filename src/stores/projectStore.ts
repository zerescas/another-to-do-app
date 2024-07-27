import type { Project } from '@/types/project';
import { defineStore } from 'pinia';
import { toRef } from 'vue';
import { loadStateToLocalStorage } from './common/load-state-from-local-storage';

interface ProjectsState {
  _id: number;
  projects: Array<Project>;
}

export const useProjectStore = defineStore('projects', {
  state: (): ProjectsState => ({
    _id: 0,
    projects: [],
  }),
  actions: {
    createProject(newProject: Project) {
      newProject.id = this._id++;
      newProject.pinnedTasks = [];

      this.projects.push(newProject);
      this.saveStateToLocalStorage();

      return newProject;
    },

    updateProject(id: number, updates: Partial<Project>) {
      const index = this.projects.findIndex((p) => p.id == id);
      if (index === -1) return;

      this.projects[index] = { ...this.projects[index], ...updates };
      this.saveStateToLocalStorage();
    },

    deleteProject(id: number) {
      this.projects = this.projects.filter((p) => p.id !== id);
      this.saveStateToLocalStorage();
    },

    getProject(id: number | string) {
      const index = this.projects.findIndex((p) => p.id == id);
      if (index === -1) return;

      return toRef(this.projects, index);
    },

    loadStateFromLocalStorage(): boolean {
      const propertiesToLoad = ['_id', 'projects'];

      return loadStateToLocalStorage(this, propertiesToLoad, 'projectStore');
    },

    saveStateToLocalStorage() {
      const currentState = {
        _id: this._id,
        projects: this.projects,
      } as ProjectsState;

      localStorage.setItem('projectStore', JSON.stringify(currentState));
    },
  },
});
