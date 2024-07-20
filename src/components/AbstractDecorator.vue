<script setup lang="ts"></script>

<template>
  <div class="abstract-decorator">
    <div class="line"></div>
    <div class="line"></div>
  </div>
</template>

<style scoped>
.abstract-decorator {
  animation: rotate 1.5s normal infinite;
  position: absolute;
  right: 0;
  top: 0;
  transform: translateX(100%);
}

.line {
  background-color: var(--theme-color-text-primary);
  height: 2px;
  left: 100%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%) rotate(45deg);
  transform-origin: center;
  width: 18px;
}

.abstract-decorator > .line:first-child {
  transform: translate(-50%, -50%) rotate(-45deg);
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }

  50% {
    transform: rotate(90deg);
  }

  100% {
    transform: rotate(90deg);
  }
}
</style>
