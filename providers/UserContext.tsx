import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserContextType {
  user: { name: string; email: string, theme?: boolean } | null;
  setUser: (user: { name: string; email: string, theme?: boolean } | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ name: string; email: string, theme?: boolean } | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};