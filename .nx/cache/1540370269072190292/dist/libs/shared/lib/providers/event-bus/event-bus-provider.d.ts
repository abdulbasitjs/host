import { EventBus } from '../types';
import { PropsWithChildren } from 'react';

export declare const EventBusProvider: React.FC<PropsWithChildren<{
    eventBus?: EventBus;
}>>;
export declare const useEventBus: () => EventBus<`${string}:${string}`>;
