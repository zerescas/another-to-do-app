import { useProjectStore } from '@/stores/projectStore';
import { useTaskStore } from '@/stores/taskStore';
import type { Project } from '@/types/project';
import type { Task } from '@/types/task';
import type { ToDo } from '@/types/todo';

export function initPiniaStores() {
  const taskStore = useTaskStore();
  if (!taskStore.loadStateFromLocalStorage()) {
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

    tasks.forEach((t) => {
      taskStore.createTask(t as Task);
    });
  }

  const projectStore = useProjectStore();
  if (!projectStore.loadStateFromLocalStorage()) {
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

    projects.forEach((p) => {
      projectStore.createProject(p as Project);
    });
  }
}
