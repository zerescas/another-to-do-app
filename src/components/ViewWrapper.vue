<template>
  <div class="view-wrapper">
    <slot></slot>
  </div>
</template>

<style scoped>
.view-wrapper {
  display: flex;
  height: 100%;
  overflow: auto;
  position: absolute;
  width: 100%;
}
</style>
