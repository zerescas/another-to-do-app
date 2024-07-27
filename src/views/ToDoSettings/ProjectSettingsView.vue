<script setup lang="ts">
import { computed, ref, type Ref } from 'vue';
import { useRoute } from 'vue-router';
import { useTaskStore } from '@/stores/taskStore';
import { useProjectStore } from '@/stores/projectStore';
import ToDoItem from '@/components/item/ToDoItem.vue';
import NavBar from '@/components/NavBar.vue';
import ToDoList from '@/components/ToDoList.vue';
import CustomColorSelector from '@/components/CustomColorSelector.vue';
import type { NavBarSettings } from '@/types/navbar-settings';
import type { Project } from '@/types/project';
import '@/assets/todo-settings/common.css';
import type { Task } from '@/types/task';

const route = useRoute();
const routeItemId = route.params.id;

const taskStore = useTaskStore();
const projectStore = useProjectStore();

let projectItem: Ref<Project> | undefined = projectStore.getProject(routeItemId as string);

const navBarSettings = ref<NavBarSettings>({
  color: 'projects',
  customTitle: 'Project Edit',
  customTitleMode: 'text',
});

const pinnedTasks = computed(() => {
  const tasks: Array<Task> = taskStore.tasks.filter((t) =>
    projectItem?.value.pinnedTasks.includes(t.id),
  );

  return tasks;
});

function createPinnedTask(task: Task) {
  const newTask = taskStore.createTask(task);

  newTask.pinnedToProject = projectItem?.value.id as number;
  projectItem?.value.pinnedTasks.push(newTask.id);

  taskStore.saveStateToLocalStorage();
  projectStore.saveStateToLocalStorage();
}

function deletePinnedTask(id: number) {
  if (!projectItem) return;

  projectItem.value.pinnedTasks = projectItem.value.pinnedTasks.filter((taskId) => taskId !== id);
  taskStore.deleteTask(id);
}

function updateProjectColor(color: string) {
  if (projectItem) {
    projectStore.updateProject(projectItem?.value.id, { color: color });
  }
}
</script>

<template>
  <div class="app-layout app-layout--desktop-float">
    <div class="settings-container app-layout--padding">
      <template v-if="projectItem">
        <ToDoItem
          :settings="{ editableContent: true }"
          :toDo="projectItem"
          @update-todo="
            (updates: Project) => projectItem && projectStore.updateProject(projectItem.id, updates)
          "
        ></ToDoItem>

        <section class="settings-section">
          <h2>Settings</h2>

          <div class="settings-cards">
            <div class="item-card setting-card column-span-3">
              <div class="setting-card-title">Color</div>
              <div class="setting-card-value">
                <CustomColorSelector
                  :value="projectItem.color ?? ''"
                  @input="updateProjectColor"
                />
              </div>
            </div>
          </div>
        </section>

        <section class="subitems-section">
          <h2>Pinned tasks</h2>

          <ToDoList
            :items="pinnedTasks"
            :toDoType="'task'"
            @create-todo="createPinnedTask"
            @update-todo="taskStore.updateTask"
            @delete-todo="deletePinnedTask"
          ></ToDoList>
        </section>
      </template>
      <div v-else>Error: Project with id {{ routeItemId }} doesn't exists</div>
    </div>

    <NavBar :settings="navBarSettings" />
  </div>
</template>
