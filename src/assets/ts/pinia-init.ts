import { useProjectStore } from '@/stores/projectStore';
import { useTaskStore } from '@/stores/taskStore';
import type { Project } from '@/types/project';
import type { Task } from '@/types/task';
import type { ToDo } from '@/types/todo';

export function initPiniaStores(forceToDefaults?: boolean) {
  const taskStore = useTaskStore();

  if (forceToDefaults) {
    taskStore.$reset();
  }

  if (forceToDefaults || !taskStore.loadStateFromLocalStorage()) {
    const tasks: Array<Task> = [
      {
        id: 0,
        content: 'Learn Typescript',
        color: '#CF9EF5',
        done: false,
      },
      {
        id: 1,
        content: 'Learn Vue',
        color: '#C1FEBC',
        done: false,
      },
      {
        id: 2,
        content: 'Implement Main Menu',
        color: '#F5A798',
        done: false,
        pinnedToProject: 0,
      },
      {
        id: 3,
        content: 'Implement Tasks/Projects Views',
        color: '#98F5D0',
        done: false,
        pinnedToProject: 0,
      },
      {
        id: 4,
        content: 'Implement Settings for Tasks/Projects',
        color: '#AC98F5',
        done: false,
        pinnedToProject: 0,
      },
    ];

    tasks.forEach((t) => {
      taskStore.createTask(t as Task);
    });
  }

  const projectStore = useProjectStore();

  if (forceToDefaults) {
    projectStore.$reset();
  }

  if (forceToDefaults || !projectStore.loadStateFromLocalStorage()) {
    const projects: Array<Project> = [
      {
        id: 0,
        content: 'Make another to do app',
        color: '#F5EA81',
        done: false,
        pinnedTasks: [2, 3, 4],
      },
    ];

    projects.forEach((p) => {
      projectStore.createProject(p as Project);
    });
  }
}
