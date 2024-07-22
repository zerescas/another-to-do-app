<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import AbstractDecorator from '../components/AbstractDecorator.vue';
import Button from '../components/MainMenu/Button.vue';
import SmallButton from '../components/MainMenu/SmallButton.vue';
import IconSettings from '../components/icons/IconSettings.vue';
import IconAbout from '../components/icons/IconAbout.vue';

const router = useRouter();

const buttons = ref([
  {
    title: 'Tasks',
    tip: 'Write down your plans and assign them to a project later',
    color: 'tasks',
    onClick: () => router.push({ name: 'Tasks' }),
  },
  {
    title: 'Projects',
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

        <SmallButton>
          <IconAbout :style="`width: 60%; height: 60%;`" />
        </SmallButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.menu-wrapper {
  display: block;
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
  .menu-wrapper {
    column-gap: 150px;
    display: grid;
    grid-template-areas:
      'title              buttons-list'
      'small-buttons-list buttons-list';
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
