<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  settings: {
    type: Object,
    required: true,
    validator: (value: Object) => {
      return 'header' in value && 'tip' in value && 'onClick' in value;
    }
  }
});
</script>

<template>
  <button
    class="button"
    @click="settings.onClick"
    :style="`
        --accent-color: ${settings.color};
        --accent-color-hover: ${settings.hoverColor};
      `"
  >
    <div class="header">{{ settings.header }}</div>
    <div class="tip">{{ settings.tip }}</div>
  </button>
</template>

<style scoped>
.button {
  --color: var(--accent-color);

  padding: 30px;
  background-color: var(--color);
  box-shadow: 0px 0px 5px var(--color);
  border-radius: 16px;
  text-align: left;
  border: none;
  min-height: 115px;
  cursor: pointer;
  transition: .15s ease-in;
}

.button:hover {
  --color: var(--accent-color-hover);
  box-shadow: 0px 0px 15px var(--color);
}

.header {
  font-size: 26px;
  margin-bottom: 6px
}

.tip {
  font-size: 15px;
  opacity: .6;
}

@media (max-width: 768px) {
  .button {
    padding: 24px;
  }

  .header {
    font-size: 24px;
    margin-bottom: 4px
  }

  .tip {
    font-size: 14px;
  }
}

@media (prefers-color-scheme: dark) {
  .button {
    background-color: transparent;
    border: solid 3px var(--color);
    color: var(--color);
  }

  .button:hover {
    --color: var(--accent-color);
    background-color: var(--color);
    color: var(--dark-theme-bg);
  }
}
</style>
