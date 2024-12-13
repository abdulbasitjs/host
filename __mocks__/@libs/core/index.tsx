import React from 'react';

export const ROUTES = {
  BO: { ROOT: '/bo' },
  BRM: { ROOT: '/brm' },
};

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => (
  <div data-testid='mock-protected-route'>{children}</div>
);
