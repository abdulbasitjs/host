import React from 'react';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => (
  <div data-testid='mock-auth-provider'>{children}</div>
);
