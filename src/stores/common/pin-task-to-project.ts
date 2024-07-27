import type { Project } from '@/types/project';
import type { Task } from '@/types/task';
import { unpinTaskFromProject } from './unpin-task-from-project';

export function pinTaskToProject(task: Task, project: Project, taskStore: any, projectStore: any) {
  if (task.pinnedToProject) {
    unpinTaskFromProject(task, taskStore, projectStore);
  }

  task.pinnedToProject = project?.id as number;
  project?.pinnedTasks.push(task.id);

  taskStore.saveStateToLocalStorage();
  projectStore.saveStateToLocalStorage();
}
