import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from './routes';
import { HOST_FEDERATED_BASE_PATH } from '@libs/core';
import { EventBusProvider, EventBus } from '@libs/shared';

type HostAppProps = {
  eventBus?: EventBus;
};

export function App({ eventBus }: HostAppProps) {
  const router = createBrowserRouter(routes, {
    basename: eventBus ? HOST_FEDERATED_BASE_PATH : '/',
  });

  return (
    <EventBusProvider eventBus={eventBus}>
      <RouterProvider router={router} />
    </EventBusProvider>
  );
}

export default App;
