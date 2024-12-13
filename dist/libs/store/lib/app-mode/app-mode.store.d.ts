import { AppModeState } from '../typings';

export declare const useAppModeStore: import('zustand').UseBoundStore<Omit<import('zustand').StoreApi<AppModeState>, "persist"> & {
    persist: {
        setOptions: (options: Partial<import('zustand/middleware').PersistOptions<AppModeState, unknown>>) => void;
        clearStorage: () => void;
        rehydrate: () => Promise<void> | void;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: AppModeState) => void) => () => void;
        onFinishHydration: (fn: (state: AppModeState) => void) => () => void;
        getOptions: () => Partial<import('zustand/middleware').PersistOptions<AppModeState, unknown>>;
    };
}>;
