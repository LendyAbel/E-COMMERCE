import { useCallback, useEffect, useState, type ReactNode } from 'react';
import type { PublicUser } from '../types';
import { AuthContext } from '../hooks/useAuthContext';
import { setLogoutCallback } from '../../lib/axiosInstance';

const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY;
const USER_KEY = import.meta.env.VITE_USER_KEY;

const isTokenExpired = (token: string): boolean => {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return (payload.exp as number) * 1000 < Date.now();
    } catch {
        return true;
    }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<PublicUser | null>(() => {
        const storedToken = localStorage.getItem(TOKEN_KEY);
        const storedUser = localStorage.getItem(USER_KEY);

        if (storedToken && !isTokenExpired(storedToken)) {
            localStorage.removeItem(TOKEN_KEY);
            localStorage.removeItem(USER_KEY);
            return null;
        }

        return storedUser ? JSON.parse(storedUser) : null;
    });

    const [token, setToken] = useState<string | null>(() => {
        const storedToken = localStorage.getItem(TOKEN_KEY);

        if (storedToken && isTokenExpired(storedToken)) {
            return null;
        }

        return storedToken;
    });

    const login = useCallback((user: PublicUser, token: string) => {
        setUser(user);
        setToken(token);
        localStorage.setItem(USER_KEY, JSON.stringify(user));
        localStorage.setItem(TOKEN_KEY, token);
    }, []);

    const logout = useCallback(() => {
        setUser(null);
        setToken(null);
        localStorage.removeItem(USER_KEY);
        localStorage.removeItem(TOKEN_KEY);
    }, []);

    useEffect(() => {
        setLogoutCallback(logout);
    }, [logout]);

    const isAuthenticated = !!token && !!user;

    return (
        <AuthContext.Provider
            value={{ user, token, isAuthenticated, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};
