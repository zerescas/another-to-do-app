import type { Project } from '@/types/project';
import { defineStore } from 'pinia';
import { toRef } from 'vue';

interface State {
  _id: number;
  projects: Array<Project>;
}

export const useProjectStore = defineStore('projects', {
  state: (): State => ({
    _id: 0,
    projects: [],
  }),
  actions: {
    createProject(newProject: Project) {
      newProject.id = this._id++;
      this.projects.push(newProject);

      return newProject;
    },

    updateProject(id: number, updates: Project) {
      const index = this.projects.findIndex((p) => p.id == id);
      if (index === -1) return;

      this.projects[index] = { ...this.projects[index], ...updates };
    },

    deleteProject(id: number) {
      this.projects = this.projects.filter((p) => p.id !== id);
    },

    getProject(id: number | string) {
      const index = this.projects.findIndex((p) => p.id == id);
      if (index === -1) return;

      return toRef(this.projects, index);
    },
  },
});
