import { Icon as Iconify } from '@iconify/react';

import { OFFLINE_ICONS } from './offline';

interface IconProps {
  /** Iconify 名，如 `ri:sun-line` */
  name: string;
  className?: string;
  width?: string | number;
  height?: string | number;
}

/**
 * 配置 / 接口中的图标名：离线表命中用编译产物，否则走 Iconify CDN。
 * 组件内写死的图标请直接 `import … from '~icons/…'`，不要走本组件。
 */
export function Icon({ name, className, width, height }: IconProps) {
  const OfflineIcon = OFFLINE_ICONS[name];

  if (OfflineIcon) {
    return <OfflineIcon aria-hidden className={className} height={height} width={width} />;
  }

  return <Iconify aria-hidden className={className} height={height} icon={name} width={width} />;
}
