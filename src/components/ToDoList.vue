<script setup lang="ts">
import ToDoItem from '@/components/item/ToDoItem.vue';
import NewToDoItem from './item/NewToDoItem.vue';
import type { ToDo } from '@/types/todo';

const props = defineProps({
  items: {
    type: Array<ToDo>,
    required: true,
  },
});

const emits = defineEmits(['create-todo', 'update-todo']);

function createToDo(toDo: ToDo) {
  emits('create-todo', toDo);
}

function updateToDo(index: number, updates: ToDo) {
  emits('update-todo', index, updates);
}
</script>

<template>
  <div class="todo-list">
    <ToDoItem
      v-for="(item, index) in items"
      :key="index"
      :toDo="item"
      @update-todo="(updates: ToDo) => updateToDo(index, updates)"
    ></ToDoItem>

    <NewToDoItem @create-todo="createToDo"></NewToDoItem>
  </div>
</template>

<style scoped>
.todo-list {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 16px;
  overflow: auto;
  padding: 18px;
}
</style>
