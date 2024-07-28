import { onMounted, onUnmounted, watch } from 'vue';
import { useThemeStore } from '@/stores/themeStore';

export function useThemeWatcher(appRoot: HTMLElement) {
  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
  const themeStore = useThemeStore();

  const loadThemeFromLocalStorage = () => themeStore.loadThemeFromLocalStorage();
  const saveThemeToLocalStorage = () => themeStore.saveThemeToLocalStorage();

  /**
   * Update themeStore's "isDarkThemeOnDevice" based on "isDarkMode" media query
   */
  function updateIsDarkThemeOnDevice() {
    themeStore.setIsDarkThemeOnDevice(isDarkMode.matches);
  }

  onMounted(() => {
    // Listen to "isDarkMode" media query changes
    isDarkMode.addEventListener('change', updateIsDarkThemeOnDevice);

    // And check the media query manually
    updateIsDarkThemeOnDevice();
  });

  onUnmounted(() => {
    // Stop to listen to "isDarkMode" media query changes
    isDarkMode.removeEventListener('change', updateIsDarkThemeOnDevice);
  });

  // Watch for themeStore's "currentTheme" changes
  watch(
    () => themeStore.currentTheme,
    (newTheme) => {
      if (!appRoot) return;

      // Update appRoot's "data-theme" and save theme to localStorage
      appRoot.setAttribute('data-theme', newTheme);
      saveThemeToLocalStorage();
    },
  );

  watch(
    () => themeStore.isDarkThemeOnDevice,
    () => themeStore.isUseDeviceTheme && themeStore.setThemeFromDeviceTheme(),
  );

  watch(
    () => themeStore.isUseDeviceTheme,
    (newIsUseDeviceTheme) => newIsUseDeviceTheme && themeStore.setThemeFromDeviceTheme(),
  );

  loadThemeFromLocalStorage();
}
