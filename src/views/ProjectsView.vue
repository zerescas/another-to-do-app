<script setup lang="ts">
import { ref, watch } from 'vue';
import ToDoList from '../components/ToDoList.vue';
import { useProjectStore } from '@/stores/projectStore';
import NavBar from '@/components/NavBar.vue';
import type { NavBarSettings } from '@/types/navbar-settings';
import type { Project } from '@/types/project';

const projectStore = useProjectStore();

const navBarSettings = ref<NavBarSettings>({
  color: 'projects',
  customTitle: '',
  customTitleMode: 'html',
});

watch(
  () => projectStore.projects.length,
  () => {
    navBarSettings.value.customTitle =
      /* html */
      `
        Projects
        <sup class="title-superscript">
          ${projectStore.projects.length}  
        </sup>
      `;
  },
  { immediate: true },
);
</script>

<template>
  <div class="app-layout app-layout--desktop-float">
    <ToDoList
      :items="projectStore.projects"
      :toDoType="'project'"
      @create-todo="projectStore.createProject"
      @update-todo="projectStore.updateProject"
      @delete-todo="projectStore.deleteProject"
    ></ToDoList>

    <NavBar :settings="navBarSettings" />
  </div>
</template>
