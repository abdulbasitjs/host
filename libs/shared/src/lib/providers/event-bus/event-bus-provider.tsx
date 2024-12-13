import { createContext, useContext, PropsWithChildren } from 'react';
import { EventBus } from '../types';

const EventBusContext = createContext<EventBus | undefined>(undefined);

export const EventBusProvider: React.FC<
  PropsWithChildren<{ eventBus?: EventBus }>
> = ({ children, eventBus }) => {
  return (
    <EventBusContext.Provider value={eventBus}>
      {children}
    </EventBusContext.Provider>
  );
};

export const useEventBus = () => {
  const context = useContext(EventBusContext);
  if (!context) {
    throw new Error('useEventBus must be used within an EventBusProvider');
  }
  return context;
};
