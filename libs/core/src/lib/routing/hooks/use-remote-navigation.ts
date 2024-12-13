import { useEffect, useRef } from 'react';
import { NavigationEvent } from '../../typings';
import { EVENTS } from '../constants';

export const useRemoteNavigation = (
  appName: string,
  onPathChange: (path: string) => void,
) => {
  const lastEmittedPath = useRef<string | null>(null);

  useEffect(() => {
    const handleHostNavigation = (event: Event) => {
      const { appName: eventAppName, path } = (
        event as CustomEvent<NavigationEvent>
      ).detail;
      if (eventAppName === appName) {
        const strippedPath = path.replace(`/${appName}`, '');
        if (strippedPath !== lastEmittedPath.current) {
          onPathChange(strippedPath || '/');
        }
      }
    };

    window.addEventListener(
      EVENTS.ROUTING.HOST_NAVIGATION,
      handleHostNavigation,
    );

    return () => {
      window.removeEventListener(
        EVENTS.ROUTING.HOST_NAVIGATION,
        handleHostNavigation,
      );
    };
  }, [appName, onPathChange]);

  const emitNavigation = (path: string) => {
    if (path !== lastEmittedPath.current) {
      lastEmittedPath.current = path;
      const fullPath = `/${appName}${path}`;

      const event = new CustomEvent<NavigationEvent>(
        EVENTS.ROUTING.REMOTE_NAVIGATION,
        {
          detail: {
            appName,
            path: fullPath,
          },
        },
      );
      window.dispatchEvent(event);
    }
  };

  return emitNavigation;
};
