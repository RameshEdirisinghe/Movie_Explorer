/**
 * AuthContext provides authentication state management
 * Handles login, logout, and persists auth state in localStorage
 */
import React, { createContext, useContext, useState, useEffect, type ReactNode,  } from 'react';
import { type User } from '../types/movie';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: () => false,
  logout: () => {},
});

// Custom hook for accessing auth context
export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // Initialize user from localStorage or default to null
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Computed property to determine if a user is authenticated
  const isAuthenticated = !!user;

  // Mock login functionality (would connect to a real API in production)
  const login = (username: string, password: string): boolean => {
    // In a real app, this would verify credentials against an API
    if (username && password.length >= 4) {
      const newUser = { username, password };
      setUser(newUser);
      return true;
    }
    return false;
  };

  // Logout functionality
  const logout = () => {
    setUser(null);
  };

  // Update localStorage when user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;