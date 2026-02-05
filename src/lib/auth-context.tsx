import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserType } from './types';
import { mockUsers } from './mock-data';

interface AuthContextType {
  user: User | null;
  login: (email: string, role?: UserType) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check local storage for persisted session
    const storedUser = localStorage.getItem('lceo_user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        // Validate date strings back to Date objects if needed, 
        // but for simple display usually string is fine or we re-fetch.
        // For robustness, let's find the fresh record from mock data if ID exists
        const freshUser = mockUsers.find(u => u.id === parsedUser.id);
        setUser(freshUser || parsedUser);
      } catch (e) {
        console.error("Failed to parse stored user", e);
        localStorage.removeItem('lceo_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, role?: UserType) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));

    let foundUser: User | undefined;

    if (email) {
         foundUser = mockUsers.find(u => u.email?.toLowerCase() === email.toLowerCase());
    }
    
    // If no email match (or empty email for quick demo) but role provided, find first user of that role
    if (!foundUser && role) {
        foundUser = mockUsers.find(u => u.userType === role);
    }

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('lceo_user', JSON.stringify(foundUser));
    } else {
      setIsLoading(false);
      throw new Error("Invalid credentials");
    }
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('lceo_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
