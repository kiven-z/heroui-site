/** 颜色方案：浅色 / 深色 / 跟随系统 */
export type ColorScheme = 'light' | 'dark' | 'system';

/** 默认颜色方案 */
export const THEME_DEFAULT_COLOR_SCHEME: ColorScheme = 'system';

export const THEMES = [
  { id: 'light', icon: 'ri:sun-line' },
  { id: 'dark', icon: 'ri:moon-line' },
  { id: 'system', icon: 'ri:computer-line' },
] as const;
