// This is the ENTRY GATE of our application 🚪
// React starts its journey from this file

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app/App";
import { AuthProvider } from "./auth/context/AuthContext";

// Step 1:
// We find the <div id="root"></div> inside index.html
// Think of it as an empty room where our app will live

const rootElement = document.getElementById("root")!;

// Step 2:
// We tell React: "Hey, put my app inside that room"
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    {/* 
      BrowserRouter is like Google Maps 🗺️ for our app
      It helps us move between pages like:
      /login → /dashboard → /members
    */}
    <BrowserRouter>

      {/*
        AuthProvider is like a SECURITY OFFICE 🔐
        It remembers:
        - Who is logged in
        - Who logged out
        - User information
        
        So every page inside App can use login data
      */}
      <AuthProvider>

        {/* 
          App is the main building 🏢
          Inside it:
          - routes
          - pages
          - dashboard
          - everything else
        */}
        <App />

      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
