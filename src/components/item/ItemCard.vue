<script setup lang="ts"></script>

<template>
  <div class="item-card">
    <slot></slot>
  </div>
</template>

<style scoped>
.item-card {
  --item-card-accent: var(--theme-color-text-primary);

  align-items: center;
  background: var(--theme-color-item-card-background);
  box-shadow: 0 0 8px var(--theme-color-item-card-box-shadow);
  border-radius: 16px;
  color: var(--theme-color-text-primary);
  display: flex;
  flex-shrink: 0;
  font-size: 16px;
  overflow: hidden;
  padding: 24px;
  position: relative;
  transition: 0.15s ease-in;
}

.item-card::before {
  background: var(--item-card-accent);
  box-shadow: 0 2px 4px var(--theme-color-item-card-box-shadow);
  content: '';
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 12px;
}

@media (min-width: 768px) {
  .item-card {
    font-size: 18px;
    padding: 32px 24px;
  }
}

@media (prefers-color-scheme: dark) {
  .item-card {
    background: var(--theme-color-item-card-background);
  }

  .item-card::before {
    box-shadow: none;
    height: 4px;
    width: 100%;
  }
}
</style>
