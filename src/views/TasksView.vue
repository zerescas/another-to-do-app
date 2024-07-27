<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import ToDoList from '../components/ToDoList.vue';
import NavBar from '../components/NavBar.vue';
import { useTaskStore } from '@/stores/taskStore';
import type { NavBarSettings } from '@/types/navbar-settings';

const taskStore = useTaskStore();

const tasksWithoutProjectPin = computed(() => taskStore.tasksWithoutProjectPin);

const navBarTitle = computed(() => {
  return /* html */ `
    Tasks
    <sup class="title-superscript">
      ${tasksWithoutProjectPin.value.length}  
    </sup>
  `;
});

const navBarSettings = ref<NavBarSettings>({
  color: 'tasks',
  customTitle: navBarTitle,
  customTitleMode: 'html',
});
</script>

<template>
  <div class="app-layout app-layout--desktop-float">
    <ToDoList
      :items="tasksWithoutProjectPin"
      :toDoType="'task'"
      @create-todo="taskStore.createTask"
      @update-todo="taskStore.updateTask"
      @delete-todo="taskStore.deleteTask"
    ></ToDoList>

    <NavBar :settings="navBarSettings" />
  </div>
</template>
