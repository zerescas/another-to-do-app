<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  settings: {
    type: Object,
    required: true,
    validator: (value: Object) => {
      return 'title' in value && 'tip' in value && 'onClick' in value;
    }
  }
});
</script>

<template>
  <button
    class="button"
    @click="settings.onClick"
    :style="`
        --accent-color: var(${settings.color});
        --accent-color-hover: var(${settings.hoverColor});
      `"
  >
    <div class="title">{{ settings.title }}</div>
    <div class="tip">{{ settings.tip }}</div>
  </button>
</template>

<style scoped>
.button {
  --color: var(--accent-color);

  background-color: var(--color);
  border: none;
  border-radius: 16px;
  box-shadow: 0 0 5px var(--color);
  cursor: pointer;
  min-height: 115px;
  padding: 30px;
  text-align: left;
  transition: .15s ease-in;
}

.button:hover {
  --color: var(--accent-color-hover);

  box-shadow: 0 0 15px var(--color);
}

.title {
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

  .title {
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
    color: var(--theme-color-background);
  }
}
</style>
