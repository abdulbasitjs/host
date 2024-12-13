import { PropsWithChildren, createContext, useContext } from 'react';
import { useAuthStore } from '@libs/store';
import { useNavigate } from 'react-router-dom';
import { AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const navigate = useNavigate();
  const { isAuthenticated, setAuthenticated } = useAuthStore();

  const login = () => {
    setAuthenticated(true);
    navigate('./bo');
  };

  const logout = () => {
    setAuthenticated(false);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
