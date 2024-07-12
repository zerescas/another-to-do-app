<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  settings: {
    type: Object,
    required: true,
  },
});
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
  background-color: var(--theme-color-button-negative);
  border: none;
  border-radius: 16px;
  color: var(--theme-color-background);
  cursor: pointer;
  display: flex;
  height: 54px;
  justify-content: center;
  text-align: left;
  transition: 0.15s ease-in;
  width: 54px;
}

.button:hover {
  background-color: var(--theme-color-button-negative-hover);
}

.button > * {
  transition: 0.35s ease-in;
}

.button:hover > * {
  transform: rotate(180deg);
}

.header {
  font-size: 24px;
  margin-bottom: 4px;
}

.tip {
  font-size: 14px;
  opacity: 0.6;
}
</style>
