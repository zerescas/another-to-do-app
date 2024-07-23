<script setup lang="ts">
import CardItem from '@/components/item/ItemCard.vue';
import CustomCheckbox from '@/components/CustomCheckbox.vue';
import type { ToDo } from '@/types/todo';
import type { PropType } from 'vue';

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
  <CardItem
    class="todo-item"
    :class="{ done: toDo.done }"
    :style="`--item-card-accent: ${toDo.color}`"
  >
    <CustomCheckbox
      :checked="props.toDo.done"
      @input="updateToDo({ done: $event } as ToDo)"
    />

    <p class="content">{{ toDo.content }}</p>
  </CardItem>
</template>

<style scoped>
.todo-item.done {
  filter: saturate(0.8) opacity(0.5);
}

.todo-item.done .content {
  text-decoration: line-through;
}

@media (prefers-color-scheme: dark) {
  .item-card.done .content {
    color: var(--item-card-accent);
  }
}
</style>
