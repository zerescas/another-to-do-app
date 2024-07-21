<script setup lang="ts">
import CardItem from '@/components/item/ItemCard.vue';
import CustomCheckbox from '@/components/CustomCheckbox.vue';

const props = defineProps({
  toDo: {
    type: Object,
    required: true,
  },
});

const emits = defineEmits(['update-todo']);

function updateTaskDone(isDone: boolean) {
  emits('update-todo', isDone);
}
</script>

<template>
  <CardItem
    :class="`todo-item ${toDo.done && 'done'}`"
    :style="`--item-card-accent: ${toDo.color}`"
  >
    <CustomCheckbox
      :checked="props.toDo.done"
      @input="updateTaskDone"
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
