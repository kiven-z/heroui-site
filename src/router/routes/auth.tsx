import type { RouteObject } from 'react-router-dom';

export const authRoutes: RouteObject[] = [
  {
    path: '/login',
    lazy: () => import('@/features/auth/login').then((m) => ({ Component: m.default })),
  },
];
