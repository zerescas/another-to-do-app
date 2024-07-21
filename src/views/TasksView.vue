<script setup lang="ts">
import { ref } from 'vue';
import NavBar from '../components/NavBar.vue';
import { useTaskStore } from '@/stores/taskStore';
import ItemToDo from '@/components/ItemToDo.vue';

const taskStore = useTaskStore();
const navBarSettings = ref({
  color: 'tasks',
});
</script>

<template>
  <div class="tasks-container">
    <div class="tasks-list">
      <ItemToDo
        v-for="(task, index) in taskStore.tasks"
        :key="task.index"
        :toDo="task"
        @update-todo="taskStore.updateTaskStatus(index, $event)"
      />
    </div>

    <NavBar :settings="navBarSettings" />
  </div>
</template>

<style scoped>
.tasks-container {
  display: flex;
  flex-direction: column;
  margin: 0;
  max-width: none;
  min-height: 100%;
  padding: 0;
}

.tasks-list {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 16px;
  padding: 18px;
}

@media (min-width: 1024px) {
  .tasks-container {
    margin: 0 auto;
    max-width: 1000px;
    padding: 24px 0;
  }
}
</style>
