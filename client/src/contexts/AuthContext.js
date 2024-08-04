'use client';

import React, { createContext, useState, useEffect } from 'react';
import { parseCookies, destroyCookie } from 'nookies';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const { token } = parseCookies();
        setIsAuthenticated(!!token);
    }, []);

    const logout = () => {
        destroyCookie(undefined, 'token');
        destroyCookie(undefined, 'user');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
