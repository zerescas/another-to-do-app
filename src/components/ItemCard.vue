<script setup lang="ts">
const props = defineProps({
  class: {
    type: String,
  },
});
</script>

<template>
  <div
    class="item-card"
    :class="props.class"
  >
    <slot></slot>
  </div>
</template>

<style scoped>
.item-card {
  --item-card-accent: var(--theme-color-text-primary);

  align-items: center;
  background: linear-gradient(90deg, var(--item-card-accent), var(--theme-color-background-hover));
  border-radius: 16px;
  color: var(--theme-color-text-primary);
  display: flex;
  font-size: 16px;
  overflow: hidden;
  padding: 24px;
  position: relative;
  transition: 0.15s ease-in;
}

.item-card::before {
  background: var(--item-card-accent);
  content: '';
  display: none;
  height: 4px;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
}

@media (min-width: 768px) {
  .item-card {
    font-size: 18px;
    padding: 32px 24px;
  }
}

@media (prefers-color-scheme: dark) {
  .item-card {
    background: var(--theme-color-background-hover);
  }

  .item-card::before {
    display: block;
  }
}
</style>
