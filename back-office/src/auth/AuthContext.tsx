import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import axios from 'axios';
import { SESSION_TOKEN_KEY, SESSION_USER_KEY, setAccessToken } from '../lib/api';
import type { User } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => readStoredUser());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem(SESSION_TOKEN_KEY);
    if (token) setAccessToken(token);
  }, []);

  // Bootstrap: try to restore session using the refresh cookie
  useEffect(() => {
    let cancelled = false;

    async function bootstrap() {
      try {
        const { data: refreshData } = await axios.post<{ accessToken: string; user: User }>(
          `${API_URL}/api/auth/refresh`,
          {},
          { withCredentials: true }
        );
        if (!cancelled) {
          setAccessToken(refreshData.accessToken);
          setUser(refreshData.user);
          storeSession(refreshData.accessToken, refreshData.user);
        }
      } catch {
        if (!cancelled) {
          const token = sessionStorage.getItem(SESSION_TOKEN_KEY);
          const storedUser = readStoredUser();
          if (token && storedUser) {
            setAccessToken(token);
            setUser(storedUser);
          } else {
            clearSession();
            setAccessToken(null);
            setUser(null);
          }
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    bootstrap();
    return () => { cancelled = true; };
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const { data } = await axios.post<{ accessToken: string; user: User }>(
      `${API_URL}/api/auth/login`,
      { email, password },
      { withCredentials: true }
    );
    setAccessToken(data.accessToken);
    setUser(data.user);
    storeSession(data.accessToken, data.user);
  }, []);

  const logout = useCallback(async () => {
    try {
      await axios.post(`${API_URL}/api/auth/logout`, {}, { withCredentials: true });
    } finally {
      clearSession();
      setAccessToken(null);
      setUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}

function readStoredUser() {
  try {
    const raw = sessionStorage.getItem(SESSION_USER_KEY);
    return raw ? JSON.parse(raw) as User : null;
  } catch {
    return null;
  }
}

function storeSession(token: string, user: User) {
  sessionStorage.setItem(SESSION_TOKEN_KEY, token);
  sessionStorage.setItem(SESSION_USER_KEY, JSON.stringify(user));
}

function clearSession() {
  sessionStorage.removeItem(SESSION_TOKEN_KEY);
  sessionStorage.removeItem(SESSION_USER_KEY);
}
