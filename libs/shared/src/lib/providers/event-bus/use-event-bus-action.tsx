import { useCallback } from 'react';
import { useEventBus } from './event-bus-provider';
import { EventKey } from '../types';

export const useEventBusAction = () => {
  const eventBus = useEventBus();

  const emitToHost = useCallback(
    <TPayload,>(event: EventKey, payload?: TPayload) => {
      if (eventBus) {
        eventBus.publish(event, payload);
      } else {
        console.warn(`Failed to emit ${event}: EventBus not available`);
      }
    },
    [eventBus],
  );

  const subscribeToHost = useCallback(
    <TPayload,>(event: EventKey, callback: (payload: TPayload) => void) => {
      if (eventBus) {
        eventBus.subscribe(event, callback);
        return () => eventBus.unsubscribe(event, callback);
      }
      console.warn(`Failed to subscribe to ${event}: EventBus not available`);
      // TODO: Need to update this
      return () => 0;
    },
    [eventBus],
  );

  return {
    emitToHost,
    subscribeToHost,
    isConnected: !!eventBus,
  };
};
