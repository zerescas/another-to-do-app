import type { Project } from '@/types/project';
import { defineStore } from 'pinia';

interface State {
  projects: Array<Project>;
}

export const useProjectStore = defineStore('projects', {
  state: (): State => ({
    projects: [
      {
        content: "Stars don't twinkle",
        color: '#ecd786',
        done: true,
      },
      {
        content: "The moon doesn't shine",
        color: '#a255fe',
        done: true,
      },
      {
        content: "Birds don't sing",
        color: '#9b1101',
        done: false,
      },
      {
        content: "The wind doesn't blow",
        color: '#019b70',
        done: false,
      },
    ],
  }),
  actions: {
    createProject(newProject: Project) {
      this.projects.push(newProject);
    },
    updateProject(index: number, updates: Project) {
      this.projects[index] = { ...this.projects[index], ...updates };
    },
  },
});
