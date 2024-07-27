<script setup lang="ts">
const props = defineProps({
  value: {
    type: String,
    required: true,
  },
});

const emits = defineEmits(['input']);

function updateColor(event: Event) {
  const value = (event.target as HTMLInputElement).value;
  emits('input', value);
}
</script>

<template>
  <label
    class="custom-color-selector"
    :style="{ '--current-color': value }"
  >
    <input
      type="color"
      :value="value"
      @input="updateColor"
    />
    <div class="color-selector"></div>
  </label>
</template>

<style scoped>
.custom-color-selector {
  cursor: pointer;
  position: relative;
}

.custom-color-selector input {
  left: 0;
  opacity: 0;
  pointer-events: none;
  position: absolute;
  top: 0;
}

.color-selector {
  background-color: var(--current-color);
  border-radius: 8px;
  box-shadow:
    0 0 12px var(--current-color),
    0 0 8px var(--theme-color-text-primary);
  height: 20px;
  width: 40px;
}
</style>
