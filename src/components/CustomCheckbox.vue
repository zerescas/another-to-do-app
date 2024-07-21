<script setup lang="ts">
const props = defineProps({
  checked: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(['input']);

function updateChecked(event: Event) {
  const isChecked = (event.target as HTMLInputElement).checked;
  emits('input', isChecked);
}
</script>

<template>
  <label class="custom-checkbox">
    <input
      type="checkbox"
      :checked="props.checked"
      @input="updateChecked"
    />
    <span class="checkbox"></span>
  </label>
</template>

<style scoped>
@media (prefers-color-scheme: dark) {
  .custom-checkbox {
    --custom-checkbox-accent: var(--item-card-accent);
  }
}
</style>
