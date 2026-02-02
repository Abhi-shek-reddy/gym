// --------------------------------------------------
// AuthContext.tsx 🔐
// --------------------------------------------------
//
// STORY:
// This file is the SECURITY OFFICE of the app.
//
// It remembers:
// - Who is logged in
// - What token they have
//
// It also controls:
// - Login
// - Logout
//
// Every protected page talks to this file.
// --------------------------------------------------

import { createContext, useContext, useState } from "react";

type User = {
  email: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
};

// Create empty security office
const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // ------------------------------------------------
  // STEP 1️⃣: Load saved data (if page refresh)
  // ------------------------------------------------
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("token");
  });

  // ------------------------------------------------
  // STEP 2️⃣: LOGIN
  // ------------------------------------------------
  const login = (user: User, token: string) => {
    /*
      STORY:
      - Backend gives ID card (token)
      - We store it safely
    */

    setUser(user);
    setToken(token);

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  // ------------------------------------------------
  // STEP 3️⃣: LOGOUT 🚪
  // ------------------------------------------------
  const logout = () => {
    /*
      STORY:
      - User leaves the gym
      - We destroy ID card
      - Security forgets user
    */

    setUser(null);
    setToken(null);

    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook used by pages
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
