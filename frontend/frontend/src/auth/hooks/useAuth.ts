// --------------------------------------------------
// useAuth.ts 🔐
// --------------------------------------------------
//
// STORY:
//
// This file is a SMALL HELPING DOOR 🚪
//
// Instead of every component going directly to
// AuthContext, they use this helper.
//
// It simply says:
// "Go to the Security Office (AuthContext)
//  and bring me the auth details"
//
// This keeps imports clean and simple.
// --------------------------------------------------

import { useAuth as useAuthFromContext } from "../context/AuthContext";

export function useAuth() {
  return useAuthFromContext();
}

