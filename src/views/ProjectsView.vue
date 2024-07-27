<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import ToDoList from '../components/ToDoList.vue';
import { useProjectStore } from '@/stores/projectStore';
import NavBar from '@/components/NavBar.vue';
import type { NavBarSettings } from '@/types/navbar-settings';

const projectStore = useProjectStore();

const navBarTitle = computed(() => {
  return /* html */ `
    Projects
    <sup class="title-superscript">
      ${projectStore.projects.length}  
    </sup>
  `;
});

const navBarSettings = ref<NavBarSettings>({
  color: 'projects',
  customTitle: navBarTitle,
  customTitleMode: 'html',
});
</script>

<template>
  <div class="app-layout app-layout--desktop-float">
    <div class="app-layout--content app-layout--padding">
      <ToDoList
        :items="projectStore.projects"
        :toDoType="'project'"
        @create-todo="projectStore.createProject"
        @update-todo="projectStore.updateProject"
        @delete-todo="projectStore.deleteProject"
      ></ToDoList>
    </div>

    <NavBar :settings="navBarSettings" />
  </div>
</template>
