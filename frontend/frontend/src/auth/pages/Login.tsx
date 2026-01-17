// This page is the FRONT DOOR 🚪
// Users enter their email & password here

import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import { loginApi } from "../services/authApi";

export default function Login() {

  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {

    // Send data to backend
    const res = await loginApi({
      email,
      password,
    });

    if (res.data.status === "success") {

      // Save user
      login(res.data.user);

      // Go dashboard
      navigate("/dashboard");

    } else {
      alert("Invalid login ❌");
    }
  };

  return (
    <div>
      <h2>Gym Login 🏋️</h2>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />

      <button onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

// User types email
// User types password
// Clicks login
// App saves user
// Sends them to dashboard