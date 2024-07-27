<script setup lang="ts">
import { computed, ref, type Ref } from 'vue';
import { useRoute } from 'vue-router';
import { useTaskStore } from '@/stores/taskStore';
import { useProjectStore } from '@/stores/projectStore';
import ToDoItem from '@/components/item/ToDoItem.vue';
import NavBar from '@/components/NavBar.vue';
import CustomColorSelector from '@/components/CustomColorSelector.vue';
import type { NavBarSettings } from '@/types/navbar-settings';
import type { Task } from '@/types/task';
import '@/assets/todo-settings/common.css';

const route = useRoute();
const routeItemId = route.params.id;

const taskStore = useTaskStore();
const projectStore = useProjectStore();

let taskItem: Ref<Task> | undefined = taskStore.getTask(routeItemId as string);

const navBarSettings = ref<NavBarSettings>({
  color: 'tasks',
  customTitle: 'Task Edit',
  customTitleMode: 'text',
});

const pinnedToProjectName = computed(() => {
  return projectStore.getProject(taskItem?.value.pinnedToProject as number)?.value.content;
});

function updateTaskColor(color: string) {
  if (taskItem) {
    taskStore.updateTask(taskItem?.value.id, { color: color });
  }
}
</script>

<template>
  <div class="app-layout app-layout--desktop-float">
    <div class="settings-container app-layout--padding">
      <template v-if="taskItem">
        <ToDoItem
          :settings="{ editableContent: true }"
          :toDo="taskItem"
          @update-todo="(updates: Task) => taskItem && taskStore.updateTask(taskItem.id, updates)"
        ></ToDoItem>

        <section class="settings-section">
          <h2>Settings</h2>

          <div class="settings-cards">
            <div class="item-card setting-card">
              <div class="setting-card-title">Color</div>
              <div class="setting-card-value">
                <CustomColorSelector
                  :value="taskItem.color ?? ''"
                  @input="updateTaskColor"
                />
              </div>
            </div>

            <div class="item-card setting-card column-span-2">
              <div class="setting-card-title">Project</div>
              <div class="setting-card-value">
                {{ pinnedToProjectName ?? 'none' }}
              </div>
            </div>
          </div>
        </section>
      </template>
      <div v-else>Error: Task with id {{ routeItemId }} doesn't exists</div>
    </div>

    <NavBar :settings="navBarSettings" />
  </div>
</template>
