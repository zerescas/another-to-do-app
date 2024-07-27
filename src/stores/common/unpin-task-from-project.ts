import type { Project } from '@/types/project';
import type { Task } from '@/types/task';
import type { Ref } from 'vue';

export function unpinTaskFromProject(task: Task, taskStore: any, projectStore: any) {
  const projectMaster: Ref<Project> = projectStore.getProject(task.pinnedToProject);

  projectMaster.value.pinnedTasks = projectMaster.value.pinnedTasks.filter((t) => t !== task.id);
  task.pinnedToProject = undefined;

  taskStore.saveStateToLocalStorage();
  projectStore.saveStateToLocalStorage();
}
