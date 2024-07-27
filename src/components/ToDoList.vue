<script setup lang="ts">
import ToDoItem from '@/components/item/ToDoItem.vue';
import NewToDoItem from './item/NewToDoItem.vue';
import type { ToDo } from '@/types/todo';
import { ref, type PropType } from 'vue';
import SmallButton from './MainMenu/SmallButton.vue';
import IconSettings from '@/components/icons/IconSettings.vue';
import IconDelete from '@/components/icons/IconDelete.vue';

type ToDoTypes = 'task' | 'project';

const props = defineProps({
  items: {
    type: Array<ToDo & MenuItemState>,
    required: true,
  },
  toDoType: {
    type: String as PropType<ToDoTypes>,
    required: true,
  },
});

let settingsRouteName = '';
switch (props.toDoType) {
  case 'task':
    settingsRouteName = 'TaskSettings';
    break;

  case 'project':
    settingsRouteName = 'ProjectSettings';
    break;
}

const emits = defineEmits(['create-todo', 'update-todo', 'delete-todo']);

// Methods to notify a parent component of changes to todo item
function createToDo(toDo: ToDo) {
  emits('create-todo', toDo);
}

function updateToDo(id: number, updates: ToDo) {
  emits('update-todo', id, updates);
}

function deleteToDo(id: number) {
  emits('delete-todo', id);
}

// Implementation of menu with actions for todo items
interface MenuItemState {
  [isMenuOpened]?: boolean;
}

const isMenuOpened = Symbol();
const currentOpenedItem = ref<MenuItemState>();

function openToDoMenu(toDo: ToDo & MenuItemState) {
  // Disable menu for item with active menu if you press on another item
  if (currentOpenedItem.value && toDo !== currentOpenedItem.value) {
    currentOpenedItem.value[isMenuOpened] = false;
  }

  toDo[isMenuOpened] = !toDo[isMenuOpened];
  if (toDo[isMenuOpened]) {
    currentOpenedItem.value = toDo;
  }
}
</script>

<template>
  <div class="todo-list">
    <template
      v-for="item in items"
      :key="item.id"
    >
      <div
        class="menu"
        :class="{ opened: item[isMenuOpened] }"
      >
        <div class="menu-buttons">
          <button
            class="menu-button"
            @click="
              $router.push({
                name: settingsRouteName,
                params: {
                  id: item.id,
                },
              })
            "
          >
            <IconSettings />
          </button>
          <button
            class="menu-button"
            @click="deleteToDo(item.id)"
          >
            <IconDelete />
          </button>
        </div>

        <ToDoItem
          class="menu-item"
          :toDo="item"
          @update-todo="(updates: ToDo) => updateToDo(item.id, updates)"
          @click="openToDoMenu(item)"
        ></ToDoItem>
      </div>
    </template>

    <NewToDoItem @create-todo="createToDo"></NewToDoItem>
  </div>
</template>

<style scoped>
.todo-list {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 12px;
  overflow: hidden auto;
}

.menu {
  position: relative;
}

.menu-buttons {
  align-items: center;
  display: flex;
  gap: 12px;
  inset: 0;
  left: 0;
  opacity: 0;
  position: absolute;
  top: 0;
  transform: translateX(150px);
  transition:
    transform 0.35s,
    opacity 0.35s;
}

.menu-button {
  align-items: center;
  background-color: var(--theme-color-button-negative);
  border: none;
  border-radius: 16px;
  color: var(--theme-color-background);
  cursor: pointer;
  display: flex;
  height: 54px;
  justify-content: center;
  text-align: left;
  width: 54px;
}

.menu-button svg {
  width: 65%;
  height: 65%;
}

.menu-item {
  transition: transform 0.25s ease-out;
}

.menu.opened .menu-buttons {
  opacity: 1;
  transform: translateX(0);
}

.menu.opened .menu-item {
  transform: translateX(150px);
}

@media (min-width: 768px) {
  .todo-list {
    gap: 16px;
  }
}
</style>
