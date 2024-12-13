export type AuthState = {
  isAuthenticated: boolean;
  setAuthenticated: (value: boolean) => void;
  logout: () => void;
};

export type AppModeState = {
  isStandalone: boolean;
  setStandalone: (value: boolean) => void;
};
