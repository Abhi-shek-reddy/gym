// --------------------------------------------------
// MembersPage.tsx 🏋️‍♂️
// --------------------------------------------------
//
// STORY:
//
// This file represents the MEMBERS ROOM of the gym.
//
// Only logged-in users can enter this room.
// (ProtectedRoute already checked that)
//
// When a user enters this room:
//
// 1️⃣ Security office gives us the TOKEN (ID card 🎟️)
// 2️⃣ We call backend to get members list
// 3️⃣ We show all members
// 4️⃣ Admin can:
//    - Add a new member
//    - Edit an existing member
//    - Delete a member
//    - Logout and leave the gym 🚪
//
// This page DOES NOT:
// ❌ Create tokens
// ❌ Verify tokens
// ❌ Talk directly to the database
//
// It ONLY:
// ✅ Displays data
// ✅ Sends actions to backend
// --------------------------------------------------

import { useEffect, useState } from "react";

// Security office 🔐
import { useAuth } from "../../auth/context/AuthContext";

// Exit door 🚪
import LogoutButton from "../../shared/components/LogoutButton";

// Backend communication
import {
  getMembers,
  updateMember,
  deleteMember,
} from "./membersApi";

// Reception desk 🧾
import AddMember from "./AddMember";

// --------------------------------------------------
// TYPE: Shape of one member in frontend
// --------------------------------------------------
type Member = {
  id: number;
  name: string;
  phone: string;
  plan: string;
  joined_on: string;
};

export default function MembersPage() {
  // ------------------------------------------------
  // STEP 1️⃣: Get token from AuthContext
  // ------------------------------------------------
  // This token proves the user is logged in
  const { token } = useAuth();

  // ------------------------------------------------
  // STEP 2️⃣: Local page state
  // ------------------------------------------------
  const [members, setMembers] = useState<Member[]>([]);

  // Which member is currently being edited
  const [editingId, setEditingId] = useState<number | null>(null);

  // Temporary form used while editing
  const [editForm, setEditForm] = useState({
    name: "",
    phone: "",
    plan: "Monthly",
  });

  // ------------------------------------------------
  // STEP 3️⃣: Fetch members from backend
  // ------------------------------------------------
  const fetchMembers = async () => {
    /*
      STORY:
      - Page opens
      - We need members list
      - Token is sent to backend
      - Backend verifies & returns data
    */

    if (!token) return;

    const data = await getMembers(token);

    // Backend sends rows → convert to readable objects
    const formattedMembers = data.map((row: any) => ({
      id: row[0],
      name: row[1],
      phone: row[2],
      plan: row[3],
      joined_on: row[4],
    }));

    setMembers(formattedMembers);
  };

  // ------------------------------------------------
  // STEP 4️⃣: Load members when page opens
  // ------------------------------------------------
  useEffect(() => {
    fetchMembers();
  }, [token]);

  // ------------------------------------------------
  // STEP 5️⃣: Start editing a member
  // ------------------------------------------------
  const startEdit = (member: Member) => {
    /*
      STORY:
      - Admin clicks "Edit ✏️"
      - That row switches to edit mode
      - Existing data fills the form
    */

    setEditingId(member.id);
    setEditForm({
      name: member.name,
      phone: member.phone,
      plan: member.plan,
    });
  };

  // ------------------------------------------------
  // STEP 6️⃣: Save edited member
  // ------------------------------------------------
  const saveEdit = async (memberId: number) => {
    /*
      STORY:
      - Admin clicks "Save"
      - Updated data goes to backend
      - Backend updates database
      - We refresh the list
    */

    if (!token) return;

    await updateMember(token, memberId, editForm);

    setEditingId(null); // Exit edit mode
    fetchMembers();     // Refresh list
  };

  // ------------------------------------------------
  // STEP 7️⃣: Delete member
  // ------------------------------------------------
  const removeMember = async (memberId: number) => {
    /*
      STORY:
      - Admin clicks "Delete 🗑️"
      - Confirmation appears
      - Backend deletes member
      - UI refreshes
    */

    if (!token) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this member?"
    );

    if (!confirmDelete) return;

    await deleteMember(token, memberId);
    fetchMembers();
  };

  // ------------------------------------------------
  // STEP 8️⃣: UI Rendering
  // ------------------------------------------------
  return (
    <div>
      {/* Exit door */}
      <LogoutButton />

      <h2>Gym Members 💪</h2>

      {/* Reception desk to add new members */}
      <AddMember onMemberAdded={fetchMembers} />

      {/* Members list */}
      {members.map((member) => (
        <div
          key={member.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          {/* EDIT MODE */}
          {editingId === member.id ? (
            <>
              <input
                value={editForm.name}
                onChange={(e) =>
                  setEditForm({ ...editForm, name: e.target.value })
                }
              />

              <input
                value={editForm.phone}
                onChange={(e) =>
                  setEditForm({ ...editForm, phone: e.target.value })
                }
              />

              <select
                value={editForm.plan}
                onChange={(e) =>
                  setEditForm({ ...editForm, plan: e.target.value })
                }
              >
                <option value="Monthly">Monthly</option>
                <option value="Quarterly">Quarterly</option>
                <option value="Yearly">Yearly</option>
              </select>

              <br />

              <button onClick={() => saveEdit(member.id)}>Save ✅</button>
              <button onClick={() => setEditingId(null)}>Cancel ❌</button>
            </>
          ) : (
            /* VIEW MODE */
            <>
              <p><strong>Name:</strong> {member.name}</p>
              <p><strong>Phone:</strong> {member.phone}</p>
              <p><strong>Plan:</strong> {member.plan}</p>

              <button onClick={() => startEdit(member)}>Edit ✏️</button>
              <button onClick={() => removeMember(member.id)}>Delete 🗑️</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

// --------------------------------------------------
// FINAL STORY SUMMARY 📖
//
// MembersPage is the CONTROL ROOM:
//
// - Shows members
// - Adds members
// - Edits members
// - Deletes members
// - Allows logout
//
// Backend handles:
// - Security
// - Token validation
// - Database
//
// Frontend handles:
// - UI
// - User interaction
//
// This is REAL FULL-STACK CRUD.
// --------------------------------------------------
