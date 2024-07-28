<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import ViewWrapper from './components/ViewWrapper.vue';
</script>

<template>
  <div id="current-route-view">
    <RouterView v-slot="{ Component }">
      <Transition name="scale-fade">
        <ViewWrapper :key="$route.fullPath">
          <component :is="Component"></component>
        </ViewWrapper>
      </Transition>
    </RouterView>
  </div>
</template>

<style scoped>
.scale-fade-enter-active,
.scale-fade-leave-active {
  transition:
    opacity 0.25s,
    transform 0.15s;
}

.scale-fade-enter-from,
.scale-fade-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
