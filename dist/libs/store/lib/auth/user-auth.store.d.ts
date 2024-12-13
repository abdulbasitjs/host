import { AuthState } from '../typings';

export declare const useAuthStore: import('zustand').UseBoundStore<Omit<import('zustand').StoreApi<AuthState>, "persist"> & {
    persist: {
        setOptions: (options: Partial<import('zustand/middleware').PersistOptions<AuthState, unknown>>) => void;
        clearStorage: () => void;
        rehydrate: () => Promise<void> | void;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: AuthState) => void) => () => void;
        onFinishHydration: (fn: (state: AuthState) => void) => () => void;
        getOptions: () => Partial<import('zustand/middleware').PersistOptions<AuthState, unknown>>;
    };
}>;
