<script setup lang="ts">
import Textarea from 'primevue/textarea';
import CustomCheckbox from '@/components/CustomCheckbox.vue';
import type { ToDo } from '@/types/todo';
import type { PropType } from 'vue';
import '@/assets/item/item-card.css';
import '@/assets/item/todo/todo-item.css';
import type { ToDoItemSettings } from '@/types/todo-item-settings';
import type { Project } from '@/types/project';

const props = defineProps({
  toDo: {
    type: Object as PropType<ToDo>,
    required: true,
  },
  settings: {
    type: Object as PropType<ToDoItemSettings>,
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

    <div class="todo-content-wrapper">
      <Textarea
        v-if="settings?.editableContent"
        ref="toDoContentRef"
        class="todo-content"
        :value="toDo.content"
        @input="updateToDo({ content: ($event.target as HTMLInputElement).value } as ToDo)"
        maxlength="200"
        autoResize
        rows="1"
      ></Textarea>
      <p
        v-else
        class="todo-content"
      >
        {{ toDo.content }}
      </p>

      <sup
        v-if="(toDo as Project).pinnedTasks"
        class="subitems-count"
      >
        + {{ (toDo as Project).pinnedTasks.length }} Tasks
      </sup>
    </div>
  </div>
</template>
