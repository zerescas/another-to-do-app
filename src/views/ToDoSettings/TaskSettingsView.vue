<script setup lang="ts">
import { computed, ref, type Ref } from 'vue';
import { useRoute } from 'vue-router';
import { useTaskStore } from '@/stores/taskStore';
import { useProjectStore } from '@/stores/projectStore';
import ToDoItem from '@/components/item/ToDoItem.vue';
import NavBar from '@/components/NavBar.vue';
import ToDoList from '@/components/ToDoList.vue';
import type { NavBarSettings } from '@/types/navbar-settings';
import type { Task } from '@/types/task';
import '@/assets/todo-settings/common.css';

const route = useRoute();
const routeItemId = route.params.id;

const taskStore = useTaskStore();
const projectStore = useProjectStore();

let taskItem: Ref<Task> | undefined = taskStore.getTask(routeItemId as string);

const navBarSettings = ref<NavBarSettings>({
  color: 'tasks',
  customTitle: 'Task Edit',
  customTitleMode: 'text',
});

const pinnedToProjectName = computed(() => {
  return projectStore.getProject(taskItem?.value.pinnedToProject as number)?.value.content;
});
</script>

<template>
  <div class="app-layout app-layout--padding">
    <div class="settings-container">
      <template v-if="taskItem">
        <ToDoItem
          :settings="{ editableContent: true }"
          :toDo="taskItem"
          @update-todo="(updates: Task) => taskItem && taskStore.updateTask(taskItem.id, updates)"
        ></ToDoItem>

        <section class="settings-section">
          <h2>Settings</h2>

          <div v-if="0" class="item-card">Color</div>
          <div class="item-card">
            Project -
            {{ pinnedToProjectName ?? 'none' }}
          </div>
        </section>
      </template>
      <div v-else>Error: Task with id {{ routeItemId }} doesn't exists</div>
    </div>

    <NavBar :settings="navBarSettings" />
  </div>
</template>
