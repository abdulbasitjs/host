import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { EVENTS } from '../constants';
import { NavigationEvent } from '../../typings/interfaces/routes';

export const useHostNavigation = (appName: string) => {
  const navigate = useNavigate();
  const location = useLocation();
  const lastEmittedPath = useRef<string | null>(null);

  useEffect(() => {
    const handleRemoteNavigation = (event: Event) => {
      const { appName: eventAppName, path } = (
        event as CustomEvent<NavigationEvent>
      ).detail;
      if (eventAppName === appName && path !== location.pathname) {
        navigate(path);
      }
    };

    window.addEventListener(
      EVENTS.ROUTING.REMOTE_NAVIGATION,
      handleRemoteNavigation,
    );

    return () => {
      window.removeEventListener(
        EVENTS.ROUTING.REMOTE_NAVIGATION,
        handleRemoteNavigation,
      );
    };
  }, [navigate, location.pathname, appName]);

  useEffect(() => {
    if (location.pathname.includes(`/${appName}`)) {
      emitNavigation(location.pathname);
    }
  }, [location.pathname, appName]);

  const emitNavigation = (path: string) => {
    if (path !== lastEmittedPath.current) {
      lastEmittedPath.current = path;

      const event = new CustomEvent(EVENTS.ROUTING.HOST_NAVIGATION, {
        detail: {
          appName,
          path,
        },
      });
      window.dispatchEvent(event);
    }
  };

  return emitNavigation;
};
