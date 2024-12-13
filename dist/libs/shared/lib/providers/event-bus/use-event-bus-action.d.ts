import { EventKey } from '../types';

export declare const useEventBusAction: () => {
    emitToHost: <TPayload>(event: EventKey, payload?: TPayload) => void;
    subscribeToHost: <TPayload>(event: EventKey, callback: (payload: TPayload) => void) => () => void;
    isConnected: boolean;
};
