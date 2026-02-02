// --------------------------------------------------
// MembersPage.tsx 🏋️‍♂️
// --------------------------------------------------
//
// STORY:
//
// This file represents the MEMBERS ROOM of the gym.
//
// Only logged-in users can enter this room.
// (ProtectedRoute already checks that)
//
// What happens when someone enters this page?
//
// 1️⃣ We ask: "Who is logged in?"
// 2️⃣ We take their TOKEN (gym ID card 🎟️)
// 3️⃣ We call the backend to get members
// 4️⃣ We show members on the screen
// 5️⃣ Admin can:
//    - Add a new member
//    - Edit an existing member
//    - Delete a member
//
// This page DOES NOT:
// ❌ Create tokens
// ❌ Verify tokens
// ❌ Talk directly to database
//
// It ONLY:
// ✅ Shows data
// ✅ Sends actions to backend
// --------------------------------------------------

import { useEffect, useState } from "react";
import { useAuth } from "../../auth/context/AuthContext";

// Backend communication functions
import {
  getMembers,
  updateMember,
  deleteMember,
} from "./membersApi";

// Add Member form component
import AddMember from "./AddMember";

// --------------------------------------------------
// TYPE: How one member looks in frontend
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
  // AuthContext is our SECURITY OFFICE 🔐
  // It remembers who is logged in
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
      - We show members
      - We need data from backend
    */

    if (!token) return; // Safety check

    const data = await getMembers(token);

    // Backend sends rows → we convert to objects
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
      - Admin clicks "Edit"
      - We switch this member into edit mode
      - We preload existing data into form
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
      - We send updated data to backend
      - Backend updates DB
      - We reload members list
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
      - Admin clicks "Delete"
      - We ask for confirmation
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
// MembersPage is the CONTROL CENTER:
//
// - Shows all members
// - Adds members
// - Edits members
// - Deletes members
//
// Backend does security & DB
// Frontend does interaction & display
//
// This is REAL-WORLD CRUD logic.
// --------------------------------------------------
