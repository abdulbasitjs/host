import { useEffect } from "react";
import {
  createMemoryRouter,
  createBrowserRouter,
  RouteObject,
} from "react-router-dom";

import { useRemoteNavigation } from "./use-remote-navigation";

type UseRemoteRouterProps = {
  isStandAlone?: boolean;
  routes: RouteObject[];
  initialPath?: string;
  appName: string;
};

export const useRemoteRouter = ({
  isStandAlone = false,
  routes,
  initialPath,
  appName,
}: UseRemoteRouterProps) => {
  const router = isStandAlone
    ? createBrowserRouter(routes, {
        basename: "/bo-account-upgrade/",
      })
    : createMemoryRouter(routes, {
        initialEntries: [initialPath ?? "/"],
      });

  const emitNavigation = useRemoteNavigation(appName, (path) => {
    if (!isStandAlone) {
      router.navigate(path);
    }
  });

  useEffect(() => {
    if (isStandAlone) return;

    const unsubscribe = router.subscribe((state) => {
      const currentPath = state.location.pathname;
      emitNavigation(currentPath);
    });

    return () => unsubscribe();
  }, [router, isStandAlone, emitNavigation]);

  return router;
};
