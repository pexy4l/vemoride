import React, { createContext, useContext, useState } from 'react';
import { users } from '@/data/dummy';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    const found = users.find(u => u.email === email && u.password === password);
    if (found) { setUser(found); return { success: true, user: found }; }
    return { success: false, error: 'Invalid email or password' };
  };

  const register = (name, email, password, role) => {
    const exists = users.find(u => u.email === email);
    if (exists) return { success: false, error: 'Email already exists' };
    const newUser = { id: `u${Date.now()}`, email, password, role, name, phone: '', avatar: null };
    users.push(newUser);
    setUser(newUser);
    return { success: true, user: newUser };
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
