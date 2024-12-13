export type AuthContextType = {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
};

export type AppName = 'host' | 'account-upgrade' | string;
export type EventName = string;
export type EventKey = `${AppName}:${EventName}`;

export interface EventBus<T extends EventKey = EventKey> {
  publish: <D = any>(eventName: T, data: D) => void;
  subscribe: <D = any>(eventName: T, callback: (data: D) => void) => void;
  unsubscribe: <D = any>(eventName: T, callback: (data: D) => void) => void;
}
