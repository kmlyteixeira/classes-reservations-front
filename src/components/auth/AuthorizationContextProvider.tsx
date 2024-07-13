'use client';

import {
  ISession,
  clearSession,
  getSessionMonitor,
  initializeSession,
  startSessionMonitor,
  stopSessionMonitor,
} from '@/services/auth/session-service';
import { useQuery } from '@tanstack/react-query';
import { ReactNode, createContext, useCallback, useContext, useEffect } from 'react';

export interface IAuthenticationContext {
  isLoading: boolean;
  isAuthenticated: boolean;
  session: ISession;
  logout: () => void;
}

export const AuthenticationContext = createContext<IAuthenticationContext | undefined>(undefined);

export function useAuthentication() {
  const auth = useContext(AuthenticationContext);
  if (!auth)
    throw new Error('Verifique se você está usando useAuthentication dentro de um <AuthenticationContextProvider />');
  return auth;
}

export type AuthenticationContextProviderProps = {
  children?: ReactNode;
};

export default function AuthenticationContextProvider({ children }: AuthenticationContextProviderProps) {
  const { data, isLoading, refetch } = useQuery({ queryKey: ['session'], queryFn: initializeSession});
  const logout = useCallback(() => {
    stopSessionMonitor();
    clearSession();
    refetch();
  }, []);

  const isAuthenticated = !!data;
  const session = data!;

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated) return;
    const sub = getSessionMonitor().subscribe((e) => {
      if (e.type === 'SESSION_ABORTED') logout();
    });
    startSessionMonitor();
    return () => {
      sub.unsubscribe();
      stopSessionMonitor();
    };
  }, [isAuthenticated, isLoading, logout]);

  return (
    <AuthenticationContext.Provider value={{ isLoading, isAuthenticated, session, logout }}>
      {children}
    </AuthenticationContext.Provider>
  );
}
