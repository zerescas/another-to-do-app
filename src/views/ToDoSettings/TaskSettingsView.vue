<script setup lang="ts">
import { computed, ref, type Ref } from 'vue';
import { useRoute } from 'vue-router';
import { useTaskStore } from '@/stores/taskStore';
import { useProjectStore } from '@/stores/projectStore';
import { pinTaskToProject } from '@/stores/common/pin-task-to-project';
import { unpinTaskFromProject } from '@/stores/common/unpin-task-from-project';
import ToDoItem from '@/components/item/ToDoItem.vue';
import NavBar from '@/components/NavBar.vue';
import CustomColorSelector from '@/components/CustomColorSelector.vue';
import CustomPopup from '@/components/CustomPopup.vue';
import type { NavBarSettings } from '@/types/navbar-settings';
import type { Task } from '@/types/task';
import type { Project } from '@/types/project';
import '@/assets/todo-settings/common.css';

const route = useRoute();
const routeItemId = route.params.id;

const isPinToProjectPopupOpened = ref(false);

const taskStore = useTaskStore();
const projectStore = useProjectStore();

let taskItem: Ref<Task> | undefined = taskStore.getTask(routeItemId as string);

const navBarSettings = ref<NavBarSettings>({
  color: 'tasks',
  customTitle: 'Task Edit',
  customTitleMode: 'text',
  fallbackBackRouteName: 'Tasks',
});

const pinnedToProjectName = computed(() => {
  return projectStore.getProject(taskItem?.value.pinnedToProject as number)?.value.content;
});

function updateTaskColor(color: string) {
  if (taskItem) {
    taskStore.updateTask(taskItem?.value.id, { color: color });
  }
}

function selectProjectInList(project: Project | null) {
  if (taskItem) {
    if (project) {
      pinTaskToProject(taskItem.value, project, taskStore, projectStore);
    } else {
      unpinTaskFromProject(taskItem.value, taskStore, projectStore);
    }
  }

  isPinToProjectPopupOpened.value = false;
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
              <div
                class="setting-card-value setting-card-value--limited setting-card-value--editable"
                @click="isPinToProjectPopupOpened = true"
              >
                {{ pinnedToProjectName ?? 'Not pinned' }}
              </div>
            </div>
          </div>
        </section>
      </template>
      <div v-else>Error: Task with id {{ routeItemId }} doesn't exists</div>
    </div>

    <NavBar :settings="navBarSettings" />
  </div>

  <Teleport to="#app">
    <CustomPopup
      :isPopupOpened="isPinToProjectPopupOpened"
      :contentWrapperClass="'app-layout app-layout--centered app-layout--padding'"
      :headerTitle="'Select a project to pin'"
      @close-pressed="isPinToProjectPopupOpened = false"
    >
      <div class="projects-list">
        <div class="project-item-wrapper">
          <div
            class="item-card"
            @click="selectProjectInList(null)"
          >
            <p class="todo-content">None</p>
          </div>
        </div>

        <template
          v-for="project in projectStore.projects"
          :key="project.id"
        >
          <div class="project-item-wrapper">
            <div
              class="item-card item-card--decorated todo-item"
              :style="`--item-card-accent: ${project.color}`"
              @click="selectProjectInList(project)"
            >
              <div class="todo-content-wrapper">
                <p class="todo-content">
                  {{ project.content }}
                </p>

                <sup
                  v-if="project.pinnedTasks"
                  class="subitems-count"
                >
                  + {{ project.pinnedTasks.length }} Tasks
                </sup>
              </div>
            </div>
          </div>
        </template>
      </div>
    </CustomPopup>
  </Teleport>
</template>

<style scoped>
.projects-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.projects-list .project-item-wrapper {
  transition: margin 0.25s;
}

.projects-list .project-item-wrapper:hover {
  margin: 0 24px;
}

.projects-list .item-card {
  cursor: pointer;
}
</style>
