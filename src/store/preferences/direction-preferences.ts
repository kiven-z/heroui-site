import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { DEFAULT_DIRECTION, DIRECTION_ITEMS, type DirectionType } from '@/config/locale-config';

const DIRECTION_SET = new Set<string>(DIRECTION_ITEMS.map((item) => item.id));

function isDirection(value: unknown): value is DirectionType {
  return typeof value === 'string' && DIRECTION_SET.has(value);
}

interface DirectionPreferencesState {
  /** 文档方向 */
  direction: DirectionType;
  /** 设置文档方向 */
  setDirection: (value: string) => void;
  /** 应用方向到 DOM */
  applyToDom: () => void;
}

/** 文档方向偏好（ui.direction） */
export const useDirectionPreferencesStore = create<DirectionPreferencesState>()(
  persist(
    (set, get) => ({
      direction: DEFAULT_DIRECTION,

      setDirection: (value) => {
        if (!isDirection(value)) {
          return;
        }

        set({ direction: value });
        get().applyToDom();
      },

      applyToDom: () => {
        document.documentElement.dir = get().direction;
      },
    }),
    {
      name: 'ui.direction',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ direction: state.direction }),
      skipHydration: true,
    }
  )
);
