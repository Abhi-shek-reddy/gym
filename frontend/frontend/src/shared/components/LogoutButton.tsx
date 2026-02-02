// --------------------------------------------------
// LogoutButton.tsx 🚪
// --------------------------------------------------
//
// STORY:
// This button is the EXIT DOOR.
//
// When clicked:
// - User logs out
// - Token is destroyed
// - User is sent to login page
// --------------------------------------------------

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/context/AuthContext";

export default function LogoutButton() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    /*
      STORY:
      - User clicks Logout
      - Security clears data
      - Send user to login
    */

    logout();
    navigate("/");
  };

  return <button onClick={handleLogout}>Logout 🚪</button>;
}
