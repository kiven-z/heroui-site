import { Icon as Iconify } from '@iconify/react';
import clsx from 'clsx';

import './offline';

interface IconProps {
  /** Iconify 名，如 `ri:sun-line` */
  name: string;
  className?: string;
  width?: string | number;
  height?: string | number;
}

/**
 * 配置名与组件内写死的 `ri:…` 都走 Iconify。
 * 壳层常用图标在 `offline.ts` 注册，其余按名加载。
 */
export function Icon({ name, className, width, height }: IconProps) {
  return (
    <Iconify
      aria-hidden
      className={clsx('inline-block shrink-0', className)}
      height={height ?? 'unset'}
      icon={name}
      width={width ?? 'unset'}
    />
  );
}
