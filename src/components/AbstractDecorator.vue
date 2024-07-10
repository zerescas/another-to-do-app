<script setup></script>

<template>
  <div class="abstract-decorator">
    <div class="line"></div>
    <div class="line"></div>
  </div>
</template>

<style scoped>
.abstract-decorator {
  position: absolute;
  top: 0;
  right: 0;
  transform: translateX(100%);
  animation: rotate 1.5s normal infinite;
}

.line {
  position: absolute;
  left: 100%;
  top: 50%;
  width: 18px;
  height: 2px;
  background-color: var(--light-theme-fg);
  transform: translate(-50%, -50%) rotate(45deg);
  transform-origin: center;
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

@media (prefers-color-scheme: dark) {
  .line {
    background-color: var(--dark-theme-fg);
  }
}
</style>
