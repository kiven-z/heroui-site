import type { ColorScheme } from '@/config/ui-config';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { THEME_DEFAULT_COLOR_SCHEME } from '@/config/ui-config';

const COLOR_SCHEMES = new Set<ColorScheme>(['light', 'dark', 'system']);

let stopSystemThemeWatch: (() => void) | null = null;

function isColorScheme(value: unknown): value is ColorScheme {
  return typeof value === 'string' && COLOR_SCHEMES.has(value as ColorScheme);
}

interface ThemePreferencesState {
  /** 颜色方案：浅色 / 深色 / 跟随系统 */
  colorScheme: ColorScheme;
  /** OS 是否偏好深色（运行时信号，不落盘） */
  osPrefersDark: boolean;
  /** 设置颜色方案 */
  setColorScheme: (value: string) => void;
  /** 应用主题到 DOM */
  applyToDom: () => void;
  /** 监听 prefers-color-scheme（幂等） */
  startSystemThemeWatch: () => () => void;
}

/** 主题偏好（ui.theme） */
export const useThemePreferencesStore = create<ThemePreferencesState>()(
  persist(
    (set, get) => ({
      colorScheme: THEME_DEFAULT_COLOR_SCHEME,
      osPrefersDark: globalThis.matchMedia?.('(prefers-color-scheme: dark)')?.matches ?? false,

      setColorScheme: (value) => {
        if (!isColorScheme(value)) {
          return;
        }

        set({ colorScheme: value });
        get().applyToDom();
      },

      applyToDom: () => {
        const { colorScheme, osPrefersDark } = get();

        const dark = colorScheme === 'system' ? osPrefersDark : colorScheme === 'dark';
        const resolved = dark ? 'dark' : 'light';
        const html = document.documentElement;

        html.classList.toggle('dark', dark);
        html.classList.toggle('light', !dark);
        html.setAttribute('data-theme', resolved);
      },

      startSystemThemeWatch: () => {
        if (stopSystemThemeWatch) {
          return stopSystemThemeWatch;
        }

        const applyOsPrefersDark = (event: MediaQueryList | MediaQueryListEvent) => {
          set({ osPrefersDark: event.matches });

          if (get().colorScheme === 'system') {
            get().applyToDom();
          }
        };

        const mediaQueryList = globalThis.matchMedia('(prefers-color-scheme: dark)');

        applyOsPrefersDark(mediaQueryList);
        mediaQueryList.addEventListener('change', applyOsPrefersDark);

        stopSystemThemeWatch = () => {
          mediaQueryList.removeEventListener('change', applyOsPrefersDark);
          stopSystemThemeWatch = null;
        };

        return stopSystemThemeWatch;
      },
    }),
    {
      name: 'ui.theme',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ colorScheme: state.colorScheme }),
    }
  )
);
