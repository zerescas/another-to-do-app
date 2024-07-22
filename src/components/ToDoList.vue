<script setup lang="ts">
import ItemToDo from '@/components/item/ToDoItem.vue';
import type { ToDo } from '@/types/todo';

const props = defineProps({
  items: {
    type: Array<Object>,
    required: true,
  },
});

const emits = defineEmits(['update-todo']);

function updateToDo(index: number, updates: ToDo) {
  emits('update-todo', index, updates);
}
</script>

<template>
  <div class="todo-list">
    <ItemToDo
      v-for="(item, index) in items as Array<ToDo>"
      :key="index"
      :toDo="item"
      @update-todo="(updates: ToDo) => updateToDo(index, updates)"
    />
  </div>
</template>

<style scoped>
.todo-list {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 16px;
  padding: 18px;
}
</style>
