export type NavBarCustomTitleMode = 'disabled' | 'text' | 'html';

export interface NavBarSettings {
  color: string;
  customTitleMode?: NavBarCustomTitleMode;
  customTitle?: string;
}
