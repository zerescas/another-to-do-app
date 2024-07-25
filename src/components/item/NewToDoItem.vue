<script setup lang="ts">
import Textarea from 'primevue/textarea';
import type { ToDo } from '@/types/todo';
import { ref, type PropType } from 'vue';
import '@/assets/item/item-card.css';
import '@/assets/item/todo/todo-item.css';

const toDoContentRef = ref<InstanceType<typeof Textarea>>();

const toDo = ref<ToDo>({
  content: '',
  color: 'white',
});

const placeholders = ["What's on your mind?", 'How about another goal?'];
const placeholder = ref('');

const emits = defineEmits(['create-todo']);

function switchToRandomPlaceholder() {
  const index = Math.round(Math.random() * (placeholders.length - 1));
  placeholder.value = placeholders[index];
}

function createToDo() {
  if (toDo.value.content === '') return;

  emits('create-todo', { ...toDo.value });
  reset();
}

function reset() {
  (toDoContentRef.value?.$el as HTMLInputElement).blur();
  toDo.value.content = '';
  switchToRandomPlaceholder();
}

switchToRandomPlaceholder();
</script>

<template>
  <div class="item-card todo-item">
    <Textarea
      ref="toDoContentRef"
      class="todo-content"
      v-model="toDo.content"
      @keydown.enter.exact="createToDo"
      :placeholder="placeholder"
      maxlength="200"
      autoResize
      rows="1"
    ></Textarea>
  </div>
</template>
