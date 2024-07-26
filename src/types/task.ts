import type { ToDo } from './todo';

export interface Task extends ToDo {
  pinnedToProject: number;
}
