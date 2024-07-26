<script setup lang="ts">
import { computed, ref, type Ref } from 'vue';
import { useRoute } from 'vue-router';
import { useTaskStore } from '@/stores/taskStore';
import { useProjectStore } from '@/stores/projectStore';
import ToDoItem from '@/components/item/ToDoItem.vue';
import NavBar from '@/components/NavBar.vue';
import ToDoList from '@/components/ToDoList.vue';
import type { NavBarSettings } from '@/types/navbar-settings';
import type { Project } from '@/types/project';
import '@/assets/todo-settings/common.css';
import type { Task } from '@/types/task';

const route = useRoute();
const routeItemId = route.params.id;

const taskStore = useTaskStore();
const projectStore = useProjectStore();

let projectItem: Ref<Project> | undefined = projectStore.getProject(routeItemId as string);

const navBarSettings = ref<NavBarSettings>({
  color: 'projects',
  customTitle: 'Project Edit',
  customTitleMode: 'text',
});

const pinnedTasks = computed(() => {
  const tasks: Array<Task> = taskStore.tasks.filter((t) =>
    projectItem?.value.pinnedTasks.includes(t.id),
  );

  return tasks;
});

function createPinnedTask(task: Task) {
  const newTask = taskStore.createTask(task);

  newTask.pinnedToProject = projectItem?.value.id as number;
  projectItem?.value.pinnedTasks.push(newTask.id);
}

function deletePinnedTask(id: number) {
  if (!projectItem) return;

  projectItem.value.pinnedTasks = projectItem.value.pinnedTasks.filter((taskId) => taskId !== id);
  taskStore.deleteTask(id);
}
</script>

<template>
  <div class="app-layout app-layout--padding">
    <div class="settings-container">
      <template v-if="projectItem">
        <ToDoItem
          :settings="{ editableContent: true }"
          :toDo="projectItem"
          @update-todo="
            (updates: Project) => projectItem && projectStore.updateProject(projectItem.id, updates)
          "
        ></ToDoItem>

        <section
          v-if="0"
          class="settings-section"
        >
          <h2>Settings</h2>

          <div class="item-card">Color</div>
        </section>

        <section class="subitems-section">
          <h2>Pinned tasks</h2>

          <ToDoList
            :items="pinnedTasks"
            :toDoType="'task'"
            @create-todo="createPinnedTask"
            @update-todo="taskStore.updateTask"
            @delete-todo="deletePinnedTask"
          ></ToDoList>
        </section>
      </template>
      <div v-else>Error: Project with id {{ routeItemId }} doesn't exists</div>
    </div>

    <NavBar :settings="navBarSettings" />
  </div>
</template>
