import React, { createContext, useState, useEffect, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import { User } from '@/types';

type UserContextType = {
  user: User | null;
  setUser: (value: User | null) => void;
  loadUser: () => Promise<void>;
  saveUser: (user: User) => Promise<void>;
  clearUser: () => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    loadUser();
  }, []);

  // Load user data from SecureStore
  const loadUser = async () => {
    try {
      const userData = await SecureStore.getItemAsync('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Failed to load user:', error);
    }
  };

  // Save user data to SecureStore
  const saveUser = async (user: User) => {
    try {
      await SecureStore.setItemAsync('user', JSON.stringify(user));
      setUser(user);
    } catch (error) {
      console.error('Failed to save user:', error);
    }
  };

  // Clear user data from SecureStore
  const clearUser = async () => {
    try {
      await SecureStore.deleteItemAsync('user');
      setUser(null);
    } catch (error) {
      console.error('Failed to clear user:', error);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, loadUser, saveUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
