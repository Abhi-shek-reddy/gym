// This file is the MAP of our app 🗺️
// It decides:
// Which URL opens which page

import { Routes, Route } from "react-router-dom";
import Login from "../auth/pages/Login";
import Dashboard from "../features/dashboard/Dashboard";
import ProtectedRoute from "../shared/components/ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>

      {/*
        If user opens:
        http://localhost:5173/

        We show LOGIN page
      */}
      <Route path="/" element={<Login />} />

      {/*
        Dashboard is a PRIVATE room 🔐

        First:
        - Check login

        If logged in:
        - Allow entry

        If NOT:
        - Send back to login
      */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}
// routes.tsx is the reception desk
// It checks the address
// Then guides users to the correct room