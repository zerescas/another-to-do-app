<script setup lang="ts">
import { ref, defineProps, watch } from 'vue';

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
});

const emits = defineEmits(['update-task']);

function updateTaskDone(isDone) {
  emits('update-task', isDone);
}
</script>

<template>
  <div
    :class="`task-item ${task.done && 'done'}`"
    :style="`--task-item-accent: ${task.color}`"
  >
    <label class="custom-checkbox">
      <input
        type="checkbox"
        :checked="props.task.done"
        @input="updateTaskDone($event.target.checked)"
      />
      <span class="checkbox"></span>
    </label>

    <p class="content">{{ task.content }}</p>
  </div>
</template>

<style scoped>
.task-item {
  --task-item-accent: var(--theme-color-text-primary);

  align-items: center;
  background: linear-gradient(90deg, var(--task-item-accent), var(--theme-color-background-hover));
  border-radius: 16px;
  color: var(--theme-color-text-primary);
  display: flex;
  font-size: 16px;
  overflow: hidden;
  padding: 24px;
  position: relative;
  transition: 0.15s ease-in;
}

.task-item::before {
  background: var(--task-item-accent);
  content: '';
  display: none;
  height: 4px;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
}

.task-item.done {
  filter: saturate(0.5) opacity(0.8);
}

.task-item.done .content {
  text-decoration: line-through;
}

@media (min-width: 768px) {
  .task-item {
    font-size: 18px;
    padding: 32px 24px;
  }
}

@media (prefers-color-scheme: dark) {
  .task-item {
    background: var(--theme-color-background-hover);
  }

  .task-item::before {
    display: block;
  }

  .custom-checkbox {
    --custom-checkbox-accent: var(--task-item-accent);
  }

  .task-item.done .content {
    color: var(--task-item-accent);
    filter: grayscale();
  }
}
</style>
