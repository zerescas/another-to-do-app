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
    onClick: () => router.push({ name: 'tasks' }),
  },
  {
    title: 'Projects',
    tip: 'Create and categorize your tasks by projects',
    color: 'projects',
    onClick: () => alert('Clicked2!'),
  },
]);
</script>

<template>
  <div class="menu-container">
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
.menu-container {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 24px;
  min-height: 100%;
}

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
  font-weight: normal;
  grid-area: title;
  margin-bottom: 20px;
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
  grid-area: buttons-list;
}

.small-buttons-list {
  display: flex;
  gap: 12px;
  grid-area: small-buttons-list;
}

@media (max-width: 768px) {
  .menu-wrapper {
    display: block;
  }

  .title {
    font-size: 32px;
    margin-bottom: 50px;
    margin-right: 0;
  }

  .buttons-list {
    margin-bottom: 50px;
  }

  .small-buttons-list {
    justify-content: flex-end;
  }
}
</style>
