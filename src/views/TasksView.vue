<script setup lang="ts">
import { ref, watch } from 'vue';
import ToDoList from '../components/ToDoList.vue';
import NavBar from '../components/NavBar.vue';
import { useTaskStore } from '@/stores/taskStore';
import type { NavBarSettings } from '@/types/navbar-settings';

const taskStore = useTaskStore();
const navBarSettings = ref<NavBarSettings>({
  color: 'tasks',
  customTitle: '',
  customTitleMode: 'html',
});

watch(
  () => taskStore.tasks.length,
  () => {
    navBarSettings.value.customTitle =
      /* html */
      `
        Tasks
        <sup class="title-superscript">
          ${taskStore.tasks.length}  
        </sup>
      `;
  },
  { immediate: true },
);
</script>

<template>
  <div class="app-layout app-layout--desktop-float">
    <ToDoList
      :items="taskStore.tasks"
      @create-todo="taskStore.createTask"
      @update-todo="taskStore.updateTask"
      @delete-todo="taskStore.deleteTask"
    ></ToDoList>

    <NavBar :settings="navBarSettings" />
  </div>
</template>
