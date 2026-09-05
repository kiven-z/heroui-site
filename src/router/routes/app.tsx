import type { RouteObject } from 'react-router-dom';

import HomePage from '@/features/home';

export const appRoutes: RouteObject[] = [
  { index: true, element: <HomePage /> },
  {
    path: 'data-table',
    lazy: () => import('@/features/data-table').then((m) => ({ Component: m.default })),
  },
];
