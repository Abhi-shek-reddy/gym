// This file is the SECURITY GUARD 🚨
// It controls entry to private pages

import { Navigate } from "react-router-dom";
import { useAuth } from "../../auth/hooks/useAuth";


export default function ProtectedRoute({ children }: any) {

  // Ask the security system:
  // "Is anyone logged in?"
  const { user } = useAuth() as { user: any };

  /*
    If no user found:
    - Person is NOT logged in
    - Kick them back to login page
  */
  if (!user) {
    return <Navigate to="/" />;
  }

  /*
    If user exists:
    - Person is logged in
    - Allow entry
  */
  return children;
}
// ProtectedRoute stands at the door
// It checks your ID

// No ID → go back

// Valid ID → come in