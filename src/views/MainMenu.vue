<script setup lang="ts">
import { ref } from 'vue';
import Button from '../components/MainMenu/Button.vue';
import SmallButton from '../components/MainMenu/SmallButton.vue';
import IconSettings from '../components/icons/IconSettings.vue';
import IconAbout from '../components/icons/IconAbout.vue';

const buttons = ref([
  {
    header: 'Tasks',
    tip: 'Write down your plans and assign them to a project later',
    color: '#FFBF85',
    hoverColor: '#EDB27C',
    onClick: () => alert('Clicked1!'),
  },
  {
    header: 'Projects',
    tip: 'Create and categorize your tasks by projects',
    color: '#90D7FF',
    hoverColor: '#7CB9DB',
    onClick: () => alert('Clicked2!'),
  },
]);
</script>

<template>
  <div class="menu-container">
    <div class="menu-wrapper">
      <h1 class="header">
        <span class="header-intro">Look, this is</span><br />
        <span class="header-app-name">Another To Do App</span>
      </h1>

      <div class="buttons-list">
        <Button
          v-for="button in buttons"
          :key="button.header"
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
  min-height: 100%;
  margin: 0 24px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.menu-wrapper {
  display: grid;
  grid-template-areas:
  'header         buttons-list'
  'small-buttons-list buttons-list';
  column-gap: 150px;
}

.header {
  grid-area: header;
  align-self: flex-end;
  font-size: 38px;
  font-weight: normal;
  margin-bottom: 20px;
}

.header-intro {
  font-weight: 600;
}

.header-app-name {
  position: relative;
  font-weight: 300;
}

.header-app-name::before,
.header-app-name::after {
  position: absolute;
  left: 100%;
  top: -5px;
  width: 2px;
  height: 15px;
  background-color: var(--light-theme-fg);
  content: '';
  transform: rotate(-45deg);
}

.header-app-name::after {
  transform: rotate(45deg);
}

.buttons-list {
  grid-area: buttons-list;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.small-buttons-list {
  grid-area: small-buttons-list;
  display: flex;
  gap: 12px;
}

@media (max-width: 768px) {
  .menu-wrapper {
    display: block;
  }

  .header {
    font-size: 32px;
    margin-right: 0;
    margin-bottom: 50px;
  }

  .buttons-list {
    margin-bottom: 50px;
  }

  .small-buttons-list {
    justify-content: flex-end;
  }
}

@media (prefers-color-scheme: dark) {
  .header-app-name::before,
  .header-app-name::after {
    background-color: var(--dark-theme-fg);
  }
}
</style>
