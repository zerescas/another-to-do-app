<script setup lang="ts">
import Textarea from 'primevue/textarea';
import CustomCheckbox from '@/components/CustomCheckbox.vue';
import type { ToDo } from '@/types/todo';
import type { PropType } from 'vue';
import '@/assets/item/item-card.css';
import '@/assets/item/todo/todo-item.css';

const props = defineProps({
  toDo: {
    type: Object as PropType<ToDo>,
    required: true,
  },
});

const emits = defineEmits(['update-todo']);

function updateToDo(updates: ToDo) {
  emits('update-todo', updates);
}
</script>

<template>
  <div
    class="item-card item-card--decorated todo-item"
    :class="{ done: toDo.done }"
    :style="`--item-card-accent: ${toDo.color}`"
  >
    <CustomCheckbox
      :checked="toDo.done"
      @input="updateToDo({ done: $event } as ToDo)"
    />

    <p class="todo-content">{{ toDo.content }}</p>
  </div>
</template>
