<script setup lang="ts">
const props = defineProps({
  isPopupOpened: {
    type: Boolean,
    required: true,
  },
  contentWrapperClass: {
    type: String,
  },
  headerTitle: {
    type: String,
  },
});

const emits = defineEmits(['close-pressed']);

function pressCloseButton() {
  emits('close-pressed');
}
</script>

<template>
  <Transition name="fade-zoom">
    <div
      class="popup"
      :class="{ opened: isPopupOpened }"
      v-show="isPopupOpened"
    >
      <div :class="contentWrapperClass">
        <div class="popup-header">
          <h2 class="popup-header-title">{{ headerTitle }}</h2>
          <button
            class="popup-close-button"
            @click="pressCloseButton"
          >
            X
          </button>
        </div>

        <div class="popup-content">
          <slot></slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
/* Transition */
.fade-zoom-enter-active,
.fade-zoom-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

/* Elements */
.fade-zoom-enter-from,
.fade-zoom-leave-to {
  opacity: 0;
  transform: scale(2);
}

.popup {
  backdrop-filter: blur(12px);
  background-color: #eeeeee8e;
  display: flex;
  inset: 0;
  overflow: auto;
  pointer-events: none;
  position: absolute;
  z-index: 1000;
}

.popup.opened {
  pointer-events: all;
}

.popup-header {
  align-items: center;
  display: flex;
  position: relative;
}

.popup-header-title {
  flex-grow: 1;
}

.popup-close-button {
  background-color: transparent;
  border: none;
  color: inherit;
  cursor: pointer;
  font-size: 24px;
  font-weight: 500;
  outline: none;
  padding: 16px 0 16px 16px;
}

.popup-content {
  margin-top: 24px;
}

/* Dark theme */
[data-theme='dark'] .popup {
  background-color: #00000080;
}
</style>
