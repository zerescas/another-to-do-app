<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <RouterView v-slot="{ Component }">
    <Transition name="scale-fade">
      <component :is="Component"></component>
    </Transition>
  </RouterView>
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
  transform: scale(0.9);
  opacity: 0;
}
</style>
