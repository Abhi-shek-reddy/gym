// --------------------------------------------------
// Login.tsx 🚪
// --------------------------------------------------
//
// This page is the FRONT DOOR of the application.
//
// STORY:
// - User stands outside the gym
// - They enter email + password
// - We send these details to the backend
// - Backend verifies identity
// - Backend gives a TOKEN (membership card 🎟️)
// - Frontend stores it and opens the dashboard
// --------------------------------------------------

import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { useAuth } from "../context/AuthContext";
import { loginApi } from "../services/authApi";

export default function Login() {
  // ------------------------------------------------
  // Navigation helper
  // ------------------------------------------------
  // Used to move user to another page after login
  const navigate = useNavigate();

  // ------------------------------------------------
  // Auth context
  // ------------------------------------------------
  // login() = function that stores user + token
  const { login } = useAuth();

  // ------------------------------------------------
  // Local state for input fields
  // ------------------------------------------------
  // These temporarily hold what user types
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ------------------------------------------------
  // Handle LOGIN button click
  // ------------------------------------------------
  const handleLogin = async () => {
    /*
      STORY:
      - User clicks LOGIN
      - We send email + password to backend
      - Backend checks database
      - If valid → backend responds with TOKEN + USER
    */

    const res = await loginApi({ email, password });

    if (res.data.status === "success") {
      /*
        STORY:
        Backend says:
        "Yes, this user is valid 👍
         Here is their membership card (token)"
      */

      // 🔐 Save login info globally (AuthContext)
      login(res.data.user, res.data.token);

      // 🚀 Send user inside the gym (Dashboard)
      navigate("/dashboard");
    } else {
      /*
        STORY:
        - Wrong email or password
        - Gym door stays closed ❌
      */
      alert("Invalid login ❌");
    }
  };

  // ------------------------------------------------
  // UI (what user sees)
  // ------------------------------------------------
  return (
    <div>
      <h2>Gym Login 🏋️‍♂️</h2>

      {/* User enters email */}
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />

      {/* User enters password */}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />

      {/* User clicks LOGIN */}
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

// --------------------------------------------------
// FINAL STORY SUMMARY 📖
//
// 1️⃣ User types email
// 2️⃣ User types password
// 3️⃣ Clicks LOGIN
// 4️⃣ Frontend sends data to backend
// 5️⃣ Backend verifies credentials
// 6️⃣ Backend gives TOKEN 🎟️
// 7️⃣ Frontend stores token securely
// 8️⃣ User enters dashboard 🚪
//
// This page does NOT know how auth works.
// It only asks: "Am I allowed in?"
// --------------------------------------------------
