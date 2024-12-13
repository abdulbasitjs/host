import { MFE_APPS_BASE_PATH, useHostNavigation } from '@libs/core';
import { lazy, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const BOApp = lazy(() => import('boApp/Module'));
const BRMApp = lazy(() => import('brmApp/Module'));

export const MFAppWrapper = ({ appName }: { appName: string }) => {
  const location = useLocation();
  const emitNavigation = useHostNavigation(appName);

  useEffect(() => {
    emitNavigation(location.pathname);
  }, [location.pathname]);

  const initialPath = location.pathname.replace(`/${appName}`, '');

  switch (appName) {
    case MFE_APPS_BASE_PATH.BO:
      return <BOApp initialPath={initialPath} />;
    case MFE_APPS_BASE_PATH.BRM:
      return <BRMApp initialPath={initialPath} />;
    default:
      throw new Error(`Unknown MFE: ${appName}`);
  }
};
