<script setup>
import IconBack from '../components/icons/IconBack.vue';

const props = defineProps({
  settings: {
    type: Object,
    required: true,
  }
})
</script>

<template>
  <div
    class="header-container"
    :class="settings.color"
  >
    <div class="header-line"></div>
    <header class="header">
      <button
        class="button-back"
        @click="$router.back()"
      >
        <IconBack />
      </button>
      <h1 class="title">Tasks</h1>
    </header>
  </div>
</template>

<style scoped>
.header-container {
  --header-accent: var(--theme-color-text-primary);

  color: var(--theme-color-text-primary);
}

.header-container.tasks {
  --header-accent: var(--theme-color-tasks);
}

.header-container.projects {
  --header-accent: var(--theme-color-projects);
}

.header-line {
  background-color: var(--header-accent);
  height: 3px;
}

.button-back {
  background-color: transparent;
  border: none;
  color: inherit;
  cursor: pointer;
  outline: none;
}

.header {
  background-color: var(--theme-color-navbar-background);
  display: flex;
  gap: 24px;
  padding: 12px;
}

.title {
  font-size: 24px;
  font-weight: normal;
}

@media (max-width: 768px) {
  .header {
    gap: 16px;
  }

  .title {
    font-size: 19px;
  }
}

@media (prefers-color-scheme: dark) {
  .header-container {
    color: var(--header-accent);
  }

  .header-line {
    box-shadow: 0 -2px 10px var(--header-accent);
  }
}
</style>
