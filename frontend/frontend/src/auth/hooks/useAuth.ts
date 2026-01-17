// This file is a SHORTCUT 🔁
// Instead of importing AuthContext everywhere
// We just call useAuth()

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function useAuth() {

  // Read data from Auth brain
  return useContext(AuthContext);
}

// useAuth = remote control
// Press it → get login info