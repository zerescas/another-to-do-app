import type { ToDo } from './todo';

export interface Project extends ToDo {
  pinnedTasks: Array<number>;
}
