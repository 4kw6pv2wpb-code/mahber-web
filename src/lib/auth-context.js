'use client';

/*
 * Copyright (c) 2026 Mahber, Inc. All rights reserved.
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, or distribution is strictly prohibited.
 */


import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authApi, setToken, removeToken, getToken, setRefreshToken, removeRefreshToken } from './api';

const AuthContext = createContext(null);

const USER_STORAGE_KEY = 'mahber_user';

function getStoredUser() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(USER_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function storeUser(user) {
  if (typeof window === 'undefined') return;
  if (user) {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(USER_STORAGE_KEY);
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore session on mount
  useEffect(() => {
    const token = getToken();
    const storedUser = getStoredUser();

    if (token && storedUser) {
      setUser(storedUser);
    } else if (token && !storedUser) {
      // Token exists but no cached user — try to fetch profile
      authApi
        .refreshToken(token)
        .then((res) => {
          const userData = res.data?.user || res.data;
          setUser(userData);
          storeUser(userData);
        })
        .catch(() => {
          // Token is invalid, clean up
          removeToken();
          removeRefreshToken();
          storeUser(null);
        });
    }

    setIsLoading(false);
  }, []);

  const login = useCallback(async (credentials) => {
    const res = await authApi.login(credentials);
    const { token, refreshToken, user: userData } = res.data;

    setToken(token);
    if (refreshToken) setRefreshToken(refreshToken);
    setUser(userData);
    storeUser(userData);

    return userData;
  }, []);

  const register = useCallback(async (data) => {
    const res = await authApi.register(data);
    const { token, refreshToken, user: userData } = res.data;

    setToken(token);
    if (refreshToken) setRefreshToken(refreshToken);
    setUser(userData);
    storeUser(userData);

    return userData;
  }, []);

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch {
      // Ignore errors — we still want to clear local state
    } finally {
      removeToken();
      removeRefreshToken();
      setUser(null);
      storeUser(null);
    }
  }, []);

  const updateUser = useCallback((updates) => {
    setUser((prev) => {
      const updated = { ...prev, ...updates };
      storeUser(updated);
      return updated;
    });
  }, []);

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
