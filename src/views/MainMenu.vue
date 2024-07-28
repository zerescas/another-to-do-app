<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useTaskStore } from '@/stores/taskStore';
import { useProjectStore } from '@/stores/projectStore';
import AbstractDecorator from '../components/AbstractDecorator.vue';
import Button, { type MainMenuButtonProps } from '../components/MainMenu/Button.vue';
import SmallButton from '../components/MainMenu/SmallButton.vue';
import IconSettings from '../components/icons/IconSettings.vue';
import IconAbout from '../components/icons/IconAbout.vue';
import CustomPopup from '@/components/CustomPopup.vue';
import AboutView from './AboutView.vue';

const router = useRouter();

const taskStore = useTaskStore();
const projectStore = useProjectStore();

const isAboutPopupOpened = ref(false);

const tasksWithoutProjectPinCount = computed(() => `${taskStore.tasksWithoutProjectPin.length}`);

const projectsCount = computed(() => {
  return `${projectStore.projects.length}`;
});

const buttons = ref<Array<MainMenuButtonProps>>([
  {
    title: 'Tasks',
    titleSuperscript: tasksWithoutProjectPinCount,
    tip: 'Write down your plans and assign them to a project later',
    color: 'tasks',
    onClick: () => router.push({ name: 'Tasks' }),
  },
  {
    title: 'Projects',
    titleSuperscript: projectsCount,
    tip: 'Create and categorize your tasks by projects',
    color: 'projects',
    onClick: () => router.push({ name: 'Projects' }),
  },
]);
</script>

<template>
  <div class="app-layout app-layout--centered app-layout--padding">
    <div class="menu-wrapper">
      <h1 class="title">
        <span class="title-intro">Look, this is</span><br />
        <span class="title-app-name">
          Another To Do App
          <AbstractDecorator />
        </span>
      </h1>

      <div class="buttons-list">
        <Button
          v-for="button in buttons"
          :key="button.title"
          :settings="button"
        ></Button>
      </div>

      <div class="small-buttons-list">
        <SmallButton>
          <IconSettings :style="`width: 60%; height: 60%;`" />
        </SmallButton>

        <SmallButton @click="isAboutPopupOpened = true">
          <IconAbout :style="`width: 60%; height: 60%;`" />
        </SmallButton>
      </div>
    </div>
  </div>

  <Teleport :to="`#app`">
    <CustomPopup
      :isPopupOpened="isAboutPopupOpened"
      :contentWrapperClass="'app-layout app-layout--centered app-layout--padding about-popup-wrapper'"
      @closePressed="isAboutPopupOpened = false"
    >
      <AboutView />
    </CustomPopup>
  </Teleport>
</template>

<style scoped>
.menu-wrapper {
  display: block;
  margin: 0 auto;
  max-width: 500px;
  width: 100%;
}

.title {
  font-size: 32px;
  font-weight: normal;
  margin-bottom: 50px;
  margin-right: 0;
}

.title-intro {
  font-weight: 600;
}

.title-app-name {
  font-weight: 300;
  position: relative;
}

.buttons-list {
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-bottom: 50px;
}

.small-buttons-list {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

@media (min-width: 768px) {
  .title {
    font-size: 34px;
  }
}

@media (min-width: 991px) {
  .menu-wrapper {
    column-gap: 130px;
    display: grid;
    grid-template-areas:
      'title              buttons-list'
      'small-buttons-list buttons-list';
    margin: 0;
    max-width: unset;
    width: unset;
  }

  .title {
    align-self: flex-end;
    font-size: 38px;
    grid-area: title;
    margin-bottom: 20px;
  }

  .buttons-list {
    grid-area: buttons-list;
    margin-bottom: 0;
  }

  .small-buttons-list {
    grid-area: small-buttons-list;
    justify-content: flex-start;
  }
}
</style>
