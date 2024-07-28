import { defineStore } from 'pinia';

export const THEME_VALUES = <const>['light', 'dark'];

export type Themes = (typeof THEME_VALUES)[number];

/**
 * State for themeStore
 */
interface ThemeState {
  /**
   * The theme (light/dark) selected in the app
   */
  currentTheme: Themes;
  /**
   * Indicates if dark mode is enabled on the user's device.
   */
  isDarkThemeOnDevice: boolean;
  /**
   * Determines if the app should change its theme based on the device's theme
   */
  isUseDeviceTheme: boolean;
}

export const useThemeStore = defineStore('theme', {
  state: (): ThemeState => ({
    currentTheme: 'light',
    isDarkThemeOnDevice: false,
    isUseDeviceTheme: true,
  }),
  actions: {
    setTheme(theme: Themes) {
      this.currentTheme = theme;
    },

    setIsDarkThemeOnDevice(isDarkThemeOnDevice: boolean) {
      this.isDarkThemeOnDevice = isDarkThemeOnDevice;
    },

    setIsUseDeviceTheme(isUseDeviceTheme: boolean) {
      this.isUseDeviceTheme = isUseDeviceTheme;
    },

    setThemeFromDeviceTheme() {
      this.setTheme(this.isDarkThemeOnDevice ? 'dark' : 'light');
    },

    loadThemeFromLocalStorage() {
      const themeFromLocalStorage = localStorage.getItem('theme') as Themes;
      const isUseDeviceThemeFromLocalStorage = localStorage.getItem('isUseDeviceTheme');

      // Use a theme from localStorage if its value is acceptable
      if (THEME_VALUES.includes(themeFromLocalStorage)) {
        this.setTheme(themeFromLocalStorage);
      }

      // Use a "isUseDeviceTheme" from localStorage if its value is acceptable
      if (
        isUseDeviceThemeFromLocalStorage === 'true' ||
        isUseDeviceThemeFromLocalStorage === 'false'
      ) {
        this.setIsUseDeviceTheme(isUseDeviceThemeFromLocalStorage === 'true');
        return;
      }

      this.setIsDarkThemeOnDevice(true);
      this.setThemeFromDeviceTheme();
    },

    saveThemeToLocalStorage() {
      localStorage.setItem('theme', this.currentTheme);
      localStorage.setItem('isUseDeviceTheme', String(this.isUseDeviceTheme));
    },
  },
});
