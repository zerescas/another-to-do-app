<script setup lang="ts">
import { ref } from 'vue';
import ToDoList from '../components/ToDoList.vue';
import { useProjectStore } from '@/stores/projectStore';
import NavBar from '@/components/NavBar.vue';
import type { NavBarSettings } from '@/types/navbar-settings';
import type { Project } from '@/types/project';

const projectStore = useProjectStore();
const navBarSettings = ref<NavBarSettings>({
  color: 'projects',
});
</script>

<template>
  <div class="app-layout app-layout--desktop-float">
    <ToDoList
      :items="projectStore.projects"
      @update-todo="projectStore.updateProject"
    ></ToDoList>

    <NavBar :settings="navBarSettings" />
  </div>
</template>
