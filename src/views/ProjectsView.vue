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
  <div class="list-projects-container">
    <ToDoList
      :items="projectStore.projects"
      @update-todo="projectStore.updateProject"
    ></ToDoList>

    <NavBar :settings="navBarSettings" />
  </div>
</template>

<style scoped>
.list-projects-container {
  display: flex;
  flex-direction: column;
  margin: 0;
  max-width: none;
  min-height: 100%;
  padding: 0;
}

@media (min-width: 1024px) {
  .list-projects-container {
    margin: 0 auto;
    max-width: 1000px;
    padding: 24px 0;
  }
}
</style>
