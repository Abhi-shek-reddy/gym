// This file is the MEMORY of our app 🧠
// It remembers:
// - Who is logged in
// - Who logged out
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: any) {

  // Step 1:
  // On first load → check localStorage
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // When user logs in
  const login = (userData: any) => {
    setUser(userData);

    // Save in browser storage 🏦
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // When user logs out
  const logout = () => {
    setUser(null);

    // Remove from storage
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// User logs in
// App saves data in locker (localStorage)

// Refresh page
// App opens locker
// Reads data
// User still logged in 🎉