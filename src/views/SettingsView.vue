<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import CustomPopup from '@/components/CustomPopup.vue';
import '@/assets/css/item/item-card.css';
import '@/assets/css/todo-settings/common.css';
import { initPiniaStores } from '@/assets/ts/pinia-init';
import { useThemeStore } from '@/stores/themeStore';

const themeStore = useThemeStore();

const isThemeListPopupOpened = ref(false);
const currentTheme = computed(() => themeStore.getCurrentTheme);

const isResetAppConfirmPopupOpened = ref(false);

const rootButtons = ref([
  {
    content: 'Theme',
    value: currentTheme,
    action: () => (isThemeListPopupOpened.value = true),
  },
  {
    content: 'Reset app data to defaults',
    action: () => (isResetAppConfirmPopupOpened.value = true),
  },
]);

const themesButtons = [
  {
    content: 'Light',
    action: () => {
      themeStore.setIsUseDeviceTheme(false);
      themeStore.setTheme('light');
      setTimeout(() => (isThemeListPopupOpened.value = false), 400);
    },
  },
  {
    content: 'Dark',
    action: () => {
      themeStore.setIsUseDeviceTheme(false);
      themeStore.setTheme('dark');
      setTimeout(() => (isThemeListPopupOpened.value = false), 400);
    },
  },
  {
    content: 'Device',
    action: () => {
      themeStore.setIsUseDeviceTheme(true);
      setTimeout(() => (isThemeListPopupOpened.value = false), 400);
    },
  },
];

const resetAppButtons = [
  {
    content: 'Yes',
    action: () => {
      initPiniaStores(true);
      isResetAppConfirmPopupOpened.value = false;
    },
  },
  {
    content: 'No',
    action: () => (isResetAppConfirmPopupOpened.value = false),
  },
];
</script>

<template>
  <div class="settings-wrapper">
    <div class="settings-list">
      <div
        v-for="(rootButton, index) in rootButtons"
        :key="index"
        @click="rootButton.action"
        class="item-card setting-card"
      >
        <div class="setting-card-title">
          {{ rootButton.content }}
        </div>
        <div class="setting-card-value">
          {{ rootButton.value }}
        </div>
      </div>
    </div>
  </div>

  <Teleport :to="`#popup`">
    <CustomPopup
      :isPopupOpened="isThemeListPopupOpened"
      :contentWrapperClass="'app-layout app-layout--centered app-layout--padding theme-list-popup-wrapper'"
      :headerTitle="'Select a theme'"
      @closePressed="isThemeListPopupOpened = false"
    >
      <div class="settings-list">
        <div
          v-for="(themeButton, index) in themesButtons"
          :key="index"
          @click="themeButton.action"
          class="item-card setting-card"
        >
          <div class="setting-card-title">
            {{ themeButton.content }}
          </div>
        </div>
      </div>
    </CustomPopup>
  </Teleport>

  <Teleport :to="`#popup`">
    <CustomPopup
      :isPopupOpened="isResetAppConfirmPopupOpened"
      :contentWrapperClass="'app-layout app-layout--centered app-layout--padding confirm-popup-wrapper'"
      :headerTitle="'Are you sure?'"
      @closePressed="isResetAppConfirmPopupOpened = false"
    >
      <div class="settings-list">
        <div
          v-for="(resetAppButton, index) in resetAppButtons"
          :key="index"
          @click="resetAppButton.action"
          class="item-card setting-card"
        >
          <div class="setting-card-title">
            {{ resetAppButton.content }}
          </div>
        </div>
      </div>
    </CustomPopup>
  </Teleport>
</template>

<style scoped lang="css">
:deep(.settings-list) {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.setting-card {
  cursor: pointer;
  user-select: none;
}

.setting-card:hover {
  background-color: var(--theme-color-item-card-background-hover);
}

:deep(.theme-list-popup-wrapper),
:deep(.confirm-popup-wrapper) {
  max-width: 350px;
}
</style>
