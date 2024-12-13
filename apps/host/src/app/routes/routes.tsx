import { MFE_APPS_BASE_PATH } from '@libs/core';
import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { MFAppWrapper } from '../components/mfe-app-wrapper';

export const routes = [
  {
    element: <Outlet />,
    children: [
      {
        path: `/${MFE_APPS_BASE_PATH.BO}/*`,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <MFAppWrapper appName={MFE_APPS_BASE_PATH.BO} />
          </Suspense>
        ),
      },
      {
        path: `/${MFE_APPS_BASE_PATH.BRM}/*`,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <MFAppWrapper appName={MFE_APPS_BASE_PATH.BRM} />
          </Suspense>
        ),
      },
      {
        path: '/',
        element: <Navigate to={`/${MFE_APPS_BASE_PATH.BO}`} replace />,
      },
    ],
  },
];
