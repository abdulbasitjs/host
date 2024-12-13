import { RouterProvider } from 'react-router-dom';
import { MFE_APPS_BASE_PATH, useRemoteRouter } from '@libs/core';
import { routes } from './routes';

type AppProps = {
  isStandAlone?: boolean;
  initialPath?: string;
};

export function App({ isStandAlone = false, initialPath }: AppProps) {
  const appName = MFE_APPS_BASE_PATH.BRM;
  const router = useRemoteRouter({
    isStandAlone,
    routes,
    initialPath,
    appName,
  });

  return <RouterProvider router={router} />;
}

export default App;
