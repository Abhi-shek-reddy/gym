// --------------------------------------------------
// routes.tsx 🗺️
// --------------------------------------------------
//
// This file is the MAP of our app.
//
// Think of this like the RECEPTION DESK of a gym 🏋️‍♂️
//
// A user comes with a URL (address).
// This file decides:
// 👉 Which room (page) the user should go to.
//
// It also checks:
// 👉 Is this room PUBLIC or PRIVATE?
// --------------------------------------------------

import { Routes, Route } from "react-router-dom";

// Pages
import Login from "../auth/pages/Login";
import Dashboard from "../features/dashboard/Dashboard";

// Security guard for private rooms
import ProtectedRoute from "../shared/components/ProtectedRoute";
import MembersPage from "../features/members/MemberPage";

export default function AppRoutes() {
  return (
    <Routes>

      {/* ---------------------------------------------
        🟢 PUBLIC ROUTE
        ---------------------------------------------

        If user opens:
        http://localhost:5173/

        STORY:
        - User is outside the gym
        - They have no membership card yet
        - We show them the LOGIN page
      */}
      <Route path="/" element={<Login />} />

      {/* ---------------------------------------------
        🔒 PRIVATE ROUTE
        ---------------------------------------------

        If user opens:
        http://localhost:5173/dashboard

        STORY:
        - Dashboard is a MEMBERS-ONLY room
        - A security guard (ProtectedRoute) stands here

        Guard checks:
        ✅ Token present? → Allow entry
        ❌ No token?      → Send back to Login
      */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
  path="/members"
  element={
    <ProtectedRoute>
      <MembersPage />
    </ProtectedRoute>
  }
/>

    </Routes>
  );
}

// --------------------------------------------------
// FINAL STORY SUMMARY 📖
//
// routes.tsx = Reception Desk
// URL          = Visitor asking for a room
// ProtectedRoute = Security guard
// Pages        = Rooms inside the gym
//
// This file NEVER contains business logic.
// It ONLY decides "who goes where".
// --------------------------------------------------
