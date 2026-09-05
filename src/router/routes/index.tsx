import type { RouteObject } from 'react-router-dom';

import { appRoutes } from './app';
import { authRoutes } from './auth';
import { errorRoutes } from './error';

import DefaultLayout from '@/layouts';

export const routes: RouteObject[] = [
  ...authRoutes,
  {
    path: '/',
    element: <DefaultLayout />,
    children: appRoutes,
  },
  ...errorRoutes,
];
