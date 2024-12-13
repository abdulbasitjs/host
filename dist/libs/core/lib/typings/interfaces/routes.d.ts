export interface NavigationEvent {
    appName: string;
    path: string;
    timestamp?: number;
}
export interface MFRouterConfig {
    appName: string;
    basePath?: string;
    isStandalone?: boolean;
}
export interface NavigationOptions {
    replace?: boolean;
    state?: unknown;
}
