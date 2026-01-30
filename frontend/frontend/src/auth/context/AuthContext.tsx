// --------------------------------------------------
// AuthContext.tsx 🔐
// --------------------------------------------------
//
// STORY:
// This file is the SECURITY OFFICE of our application.
//
// Imagine a real gym 🏋️‍♂️
// - This office knows who is a member
// - Who is inside the gym
// - Who logged out
//
// Every page in the app can ask this office:
// 👉 "Is the user logged in?"
// 👉 "Who is the user?"
// 👉 "Please log this user out"
// --------------------------------------------------

import { createContext, useContext, useState } from "react";

// --------------------------------------------------
// Types (what data this office manages)
// --------------------------------------------------
type User = {
  email: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
};

// --------------------------------------------------
// Create the AuthContext (empty office initially)
// --------------------------------------------------
const AuthContext = createContext<AuthContextType | null>(null);

// --------------------------------------------------
// AuthProvider 🏢
// --------------------------------------------------
// This wraps the entire app and provides auth data
export function AuthProvider({ children }: { children: React.ReactNode }) {
  /*
    STORY:
    When the app loads or refreshes,
    we check localStorage.

    If a token exists:
    - User was already logged in earlier
    - Keep them logged in

    If not:
    - User is outside the gym
  */

  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("token");
  });

  // ------------------------------------------------
  // LOGIN 🎟️
  // ------------------------------------------------
  const login = (userData: User, tokenData: string) => {
    /*
      STORY:
      - Backend verified user
      - Backend gave us a TOKEN (membership card 🎟️)
      - We store it safely
    */

    setUser(userData);
    setToken(tokenData);

    // Store in browser so refresh doesn't log user out
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", tokenData);
  };

  // ------------------------------------------------
  // LOGOUT 🚪
  // ------------------------------------------------
  const logout = () => {
    /*
      STORY:
      - User leaves the gym
      - We destroy their membership session
      - Security forgets them
    */

    setUser(null);
    setToken(null);

    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  // ------------------------------------------------
  // Value shared with entire app
  // ------------------------------------------------
  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!token,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// --------------------------------------------------
// useAuth 🧠
// --------------------------------------------------
// This is a helper hook so pages can easily
// talk to the Security Office
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}

// --------------------------------------------------
// FINAL STORY SUMMARY 📖
//
// AuthContext = Security Office 🔐
// AuthProvider = Office building 🏢
// useAuth() = Phone call to security
//
// Responsibilities:
// ✅ Store user
// ✅ Store token
// ✅ Remember login after refresh
// ✅ Provide login/logout functions
//
// Pages should NEVER touch localStorage directly.
// They always talk to AuthContext.
// --------------------------------------------------
