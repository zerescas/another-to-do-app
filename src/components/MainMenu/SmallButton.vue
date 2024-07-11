<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  settings: {
    type: Object,
    required: true,
  }
})
</script>

<template>
  <button
    class="button"
    @click="settings.onClick"
  >
    <slot></slot>
  </button>
</template>

<style scoped>
.button {
  align-items: center;
  background-color: var(--light-theme-fg);
  border: none;
  border-radius: 16px;
  color: var(--light-theme-bg);
  cursor: pointer;
  display: flex;
  height: 54px;
  justify-content: center;
  text-align: left;
  transition: .15s ease-in;
  width: 54px;
}

.button:hover {
  background-color: var(--light-theme-fg-hover);
}

.button>* {
  transition: .35s ease-in;
}

.button:hover>* {
  transform: rotate(180deg);
}

.header {
  font-size: 24px;
  margin-bottom: 4px
}

.tip {
  font-size: 14px;
  opacity: .6;
}

@media (prefers-color-scheme: dark) {
  .button {
    background-color: var(--dark-theme-fg);
    color: var(--dark-theme-bg);
  }

  .button:hover {
    background-color: var(--dark-theme-fg-hover);
  }
}
</style>
