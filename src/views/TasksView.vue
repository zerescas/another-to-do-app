<script setup lang="ts">
import { ref } from 'vue';
import ToDoList from '../components/ToDoList.vue';
import NavBar from '../components/NavBar.vue';
import { useTaskStore } from '@/stores/taskStore';

const taskStore = useTaskStore();
const navBarSettings = ref({
  color: 'tasks',
});
</script>

<template>
  <div class="tasks-list-container">
    <ToDoList
      :items="taskStore.tasks"
      @update-todo="(index, isDone) => taskStore.updateToDoDone(index, isDone)"
    ></ToDoList>

    <NavBar :settings="navBarSettings" />
  </div>
</template>

<style scoped>
.tasks-list-container {
  display: flex;
  flex-direction: column;
  margin: 0;
  max-width: none;
  min-height: 100%;
  padding: 0;
}

@media (min-width: 1024px) {
  .tasks-list-container {
    margin: 0 auto;
    max-width: 1000px;
    padding: 24px 0;
  }
}
</style>
