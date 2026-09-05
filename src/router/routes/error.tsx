import type { RouteObject } from 'react-router-dom';

export const errorRoutes: RouteObject[] = [
  {
    path: '/403',
    lazy: () => import('@/features/error/403').then((m) => ({ Component: m.default })),
  },
  {
    path: '/500',
    lazy: () => import('@/features/error/500').then((m) => ({ Component: m.default })),
  },
  {
    path: '*',
    lazy: () => import('@/features/error/404').then((m) => ({ Component: m.default })),
  },
];
