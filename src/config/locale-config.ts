/** 界面语言（locale = locales/ 目录名） */
export const LOCALES = [
  { locale: 'zh-CN', label: '简体中文' },
  { locale: 'en', label: 'English' },
] as const;

export type LocaleType = (typeof LOCALES)[number]['locale'];

/** 默认语言 = 语言表首项 */
export const DEFAULT_LOCALE: LocaleType = LOCALES[0].locale;

/** 文档方向（与语言独立） */
export const DIRECTION_ITEMS = [
  { id: 'ltr', icon: 'ri:text-direction-l' },
  { id: 'rtl', icon: 'ri:text-direction-r' },
] as const;

export type DirectionType = (typeof DIRECTION_ITEMS)[number]['id'];

/** 默认方向 */
export const DEFAULT_DIRECTION: DirectionType = DIRECTION_ITEMS[0].id;
