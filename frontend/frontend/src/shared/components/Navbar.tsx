// This is the TOP BAR of our app 🧭
// It shows:
// - App name
// - Logout button

import useAuth from "../../auth/hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Navbar() {

  // Get logout function
  const { logout, user } = useAuth();

  // To move user to login page
  const navigate = useNavigate();

  const handleLogout = () => {

    /*
      User clicked LOGOUT

      So we:
      1. Clear login memory
      2. Remove data from storage
      3. Send user to login page
    */

    logout();
    navigate("/");
  };

  return (
    <div style={{ background: "#222", color: "white", padding: "10px" }}>

      {/* App name */}
      <span>🏋️ Gym Management</span>

      {/* Welcome user */}
      <span style={{ marginLeft: "20px" }}>
        Hello, {user?.name}
      </span>

      {/* Logout button */}
      <button
        style={{ float: "right" }}
        onClick={handleLogout}
      >
        Logout
      </button>

    </div>
  );
}

// Navbar is receptionist
// It says hello
// Gives logout button