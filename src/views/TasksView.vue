<script setup>
import { ref } from 'vue';
import NavBar from '../components/NavBar.vue';
import TaskItem from '../components/TaskItem.vue';
import { useTaskStore } from '@/stores/taskStore';

const taskStore = useTaskStore();
const navBarSettings = ref({
  color: 'tasks',
});
</script>

<template>
  <div class="tasks-container">
    <div class="tasks-list">
      <TaskItem
        v-for="(task, index) in taskStore.tasks"
        :key="task.index"
        :task
        @update-task="taskStore.updateTaskStatus(index, $event)"
      />
    </div>

    <NavBar :settings="navBarSettings" />
  </div>
</template>

<style scoped>
.tasks-container {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 1000px;
  min-height: 100%;
  padding: 24px 0;
}

.tasks-list {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 16px;
  padding: 18px;
}

@media (max-width: 1024px) {
  .tasks-container {
    margin: 0;
    max-width: none;
    padding: 0;
  }
}
</style>
