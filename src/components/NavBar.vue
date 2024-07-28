<script setup lang="ts">
import { computed, type PropType } from 'vue';
import { useRouter } from 'vue-router';
import IconBack from '../components/icons/IconBack.vue';
import type { NavBarSettings } from '@/types/navbar-settings';
import { useNavigationStore } from '@/stores/navigationStore';

const router = useRouter();
const navigationStore = useNavigationStore();

const props = defineProps({
  settings: {
    type: Object as PropType<NavBarSettings>,
  },
});

const title = computed(() => {
  if (props.settings?.customTitleMode === 'html' || props.settings?.customTitleMode === 'text') {
    return props.settings.customTitle;
  } else {
    return router.currentRoute.value.name;
  }
});

function goBack() {
  // If there is a previous route, just go back
  if (navigationStore.previousRouteName) {
    router.back();
    return;
  }

  // If not, go to:
  if (props.settings?.fallbackBackRouteName) {
    // fallbackBackRouteName route
    router.replace({ name: props.settings?.fallbackBackRouteName, params: { fallback: 'y' } });
  } else {
    // root route
    router.replace('/');
  }
}
</script>

<template>
  <div
    class="header-container"
    :class="settings?.color"
  >
    <div class="header-line"></div>
    <header class="header">
      <button
        class="button-back"
        @click="goBack"
      >
        <IconBack />
      </button>

      <h1
        class="title"
        v-if="settings?.customTitleMode === 'html'"
        v-html="title"
      ></h1>
      <h1
        class="title"
        v-else
      >
        {{ title }}
      </h1>
    </header>
  </div>
</template>

<style scoped>
.header-container {
  --header-accent: var(--theme-color-text-primary);

  color: var(--theme-color-text-primary);
  position: relative;
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
  align-items: center;
  background-color: transparent;
  border: none;
  color: inherit;
  cursor: pointer;
  display: flex;
  outline: none;
}

.header {
  background-color: var(--theme-color-navbar-background);
  display: flex;
  gap: 18px;
  padding: 16px 20px;
}

.title {
  font-size: 19px;
  font-weight: normal;
}

.title :deep(.title-superscript) {
  font-weight: 500;
}

@media (min-width: 768px) {
  .header {
    gap: 24px;
    padding: 14px;
  }

  .title {
    font-size: 22px;
  }
}

/* Dark theme */
[data-theme='dark'] .header-container {
  color: var(--header-accent);
}

[data-theme='dark'] .header-line {
  box-shadow: 0 -2px 10px var(--header-accent);
}
</style>
