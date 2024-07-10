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
  width: 54px;
  height: 54px;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: var(--light-theme-fg);
  color: var(--light-theme-bg);
  border-radius: 16px;
  text-align: left;
  border: none;
  cursor: pointer;
  transition: .15s ease-in;
}

.button:hover {
  background-color: var(--light-theme-fg-hover);
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
