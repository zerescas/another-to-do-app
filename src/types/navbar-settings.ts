import type { Ref } from 'vue';

export type NavBarCustomTitleMode = 'disabled' | 'text' | 'html';

export interface NavBarSettings {
  color: string;
  customTitleMode?: NavBarCustomTitleMode;
  customTitle?: string | Ref<string>;
  fallbackBackRouteName?: string;
}
