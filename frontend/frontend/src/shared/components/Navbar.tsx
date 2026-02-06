// --------------------------------------------------
// Navbar.tsx 🧭
// --------------------------------------------------
//
// STORY:
//
// This component is the NAVIGATION BAR of the gym app.
//
// It is always visible on protected pages.
// It helps users:
// - Move between rooms (Dashboard, Members)
// - Logout and leave the gym 🚪
//
// This component:
// ❌ Does NOT manage auth logic
// ❌ Does NOT talk to backend
// ✅ Only guides navigation
// --------------------------------------------------

import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";

export default function Navbar() {
  return (
    <div className="top-bar">
      {/* Gym brand / logo */}
      <h2>🏋️ Gym Manager</h2>

      {/* Navigation links */}
      <div>
        <Link to="/dashboard" style={{ marginRight: "15px" }}>
          Dashboard
        </Link>

        <Link to="/members" style={{ marginRight: "15px" }}>
          Members
        </Link>

        {/* Exit door */}
        <LogoutButton />
      </div>
    </div>
  );
}
