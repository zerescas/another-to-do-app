<script setup lang="ts">
import { defineProps, type PropType } from 'vue';

export interface MainMenuButtonProps {
  title: string;
  titleSuperscript?: string;
  tip: string;
  color?: string;
  onClick: Function;
}

const props = defineProps({
  settings: {
    type: Object as PropType<MainMenuButtonProps>,
    required: true,
  },
});
</script>

<template>
  <button
    class="button"
    :class="settings.color"
    @click="settings.onClick()"
  >
    <div class="title">
      {{ settings.title }}
      <sup class="title-superscript">{{ settings.titleSuperscript }}</sup>
    </div>
    <div class="tip">{{ settings.tip }}</div>
  </button>
</template>

<style scoped>
.button {
  --button-color-background: var(--theme-color-background-hover);
  --button-color-background-hover: var(--theme-color-background-hover);

  background-color: var(--button-color-background);
  border: none;
  border-radius: 16px;
  box-shadow: 0 0 5px var(--button-color-background);
  cursor: pointer;
  min-height: 115px;
  padding: 24px;
  text-align: left;
  transition: 0.15s ease-in;
}

.button:hover {
  box-shadow: 0 0 15px var(--button-color-background-hover);
}

.button.tasks {
  --button-color-background: var(--theme-color-tasks);
  --button-color-background-hover: var(--theme-color-tasks-hover);
}

.button.projects {
  --button-color-background: var(--theme-color-projects);
  --button-color-background-hover: var(--theme-color-projects-hover);
}

.title {
  font-size: 24px;
  margin-bottom: 4px;
}

.title-superscript {
  font-size: 70%;
  font-weight: 500;
}

.tip {
  font-size: 14px;
  opacity: 0.6;
}

@media (min-width: 768px) {
  .button {
    padding: 30px;
  }

  .title {
    font-size: 26px;
    margin-bottom: 6px;
  }

  .tip {
    font-size: 15px;
  }
}

@media (prefers-color-scheme: dark) {
  .button {
    background-color: transparent;
    border: solid 3px var(--button-color-background);
    color: var(--button-color-background);
  }

  .button:hover {
    background-color: var(--button-color-background);
    color: var(--theme-color-background);
  }
}
</style>
