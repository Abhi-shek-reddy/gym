// --------------------------------------------------
// main.tsx 🚪
// --------------------------------------------------
//
// This file is the ENTRY GATE of our application.
//
// Think of this like the MAIN DOOR of a gym 🏋️‍♂️
// Everyone enters the building through this door.
//
// React starts its journey from THIS file.
// --------------------------------------------------

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./app/App";
import { AuthProvider } from "./auth/context/AuthContext";

// --------------------------------------------------
// STEP 1️⃣: Find the empty room
// --------------------------------------------------
//
// Inside index.html, there is a line like this:
//
// <div id="root"></div>
//
// This is an EMPTY ROOM 🏠
// React will live inside this room.
//
const rootElement = document.getElementById("root")!;

// --------------------------------------------------
// STEP 2️⃣: Put the app inside the room
// --------------------------------------------------
//
// We now tell React:
//
// "Hey React 👋
//  Take my application and place it inside that room."
//
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>

    {/*
      ------------------------------------------------
      BrowserRouter 🗺️
      ------------------------------------------------
      STORY:
      This is like GOOGLE MAPS for our app.

      It understands URLs like:
      /            → Login page
      /dashboard   → Dashboard page
      /members     → Members page

      Without this, React would not know
      how to move between pages.
    */}
    <BrowserRouter>

      {/*
        ------------------------------------------------
        AuthProvider 🔐
        ------------------------------------------------
        STORY:
        This is the SECURITY OFFICE of the gym.

        It remembers:
        - Who is logged in
        - Who logged out
        - The login token (membership card 🎟️)

        Because AuthProvider wraps the whole app,
        EVERY page can ask:
        "Is the user logged in?"
      */}
      <AuthProvider>

        {/*
          ----------------------------------------------
          App 🏢
          ----------------------------------------------
          STORY:
          This is the MAIN BUILDING.

          Inside App:
          - Routes (map of rooms)
          - Pages (Login, Dashboard, Members)
          - Protected routes
          - All features

          main.tsx does NOT care what App contains.
          It only opens the door and lets App run.
        */}
        <App />

      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// --------------------------------------------------
// FINAL STORY SUMMARY 📖
//
// main.tsx = Main Entrance 🚪
// BrowserRouter = Navigation system 🗺️
// AuthProvider = Security office 🔐
// App = The building itself 🏢
//
// This file is written ONCE and rarely touched again.
// --------------------------------------------------
