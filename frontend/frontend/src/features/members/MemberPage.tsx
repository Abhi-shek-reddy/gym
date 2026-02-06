// --------------------------------------------------
// MembersPage.tsx 🏋️‍♂️
// --------------------------------------------------
//
// STORY:
//
// This page is the MEMBERS ROOM of the gym.
//
// Only logged-in users can enter here.
// When someone enters:
//
// 1️⃣ Security gives us the TOKEN 🎟️
// 2️⃣ We fetch members from backend
// 3️⃣ We show members in clean cards
// 4️⃣ Admin can:
//    - Add member
//    - Edit member
//    - Delete member
//    - Logout 🚪
//
// Styling is handled by global.css
// --------------------------------------------------

import { useEffect, useState } from "react";
import { useAuth } from "../../auth/hooks/useAuth";
import LogoutButton from "../../shared/components/LogoutButton";
import AddMember from "./AddMember";
import { getMembers, updateMember, deleteMember } from "./membersApi";

type Member = {
  id: number;
  name: string;
  phone: string;
  plan: string;
  joined_on: string;
};

export default function MembersPage() {
  const { token } = useAuth();

  const [members, setMembers] = useState<Member[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [editForm, setEditForm] = useState({
    name: "",
    phone: "",
    plan: "Monthly",
  });

  // ----------------------------------------------
  // Fetch members from backend
  // ----------------------------------------------
  const fetchMembers = async () => {
    if (!token) return;

    const data = await getMembers(token);

    const formatted = data.map((row: any) => ({
      id: row[0],
      name: row[1],
      phone: row[2],
      plan: row[3],
      joined_on: row[4],
    }));

    setMembers(formatted);
  };

  useEffect(() => {
    fetchMembers();
  }, [token]);

  // ----------------------------------------------
  // Edit flow
  // ----------------------------------------------
  const startEdit = (member: Member) => {
    setEditingId(member.id);
    setEditForm({
      name: member.name,
      phone: member.phone,
      plan: member.plan,
    });
  };

  const saveEdit = async (id: number) => {
    if (!token) return;
    await updateMember(token, id, editForm);
    setEditingId(null);
    fetchMembers();
  };

  // ----------------------------------------------
  // Delete flow
  // ----------------------------------------------
  const removeMember = async (id: number) => {
    if (!token) return;
    if (!confirm("Delete this member?")) return;
    await deleteMember(token, id);
    fetchMembers();
  };

  return (
    <div className="container">
      {/* Top bar */}
      <div className="top-bar">
        <h2>Gym Members 💪</h2>
        <LogoutButton />
      </div>

      {/* Add member section */}
      <AddMember onMemberAdded={fetchMembers} />

      {/* Members list */}
      {members.map((member) => (
        <div key={member.id} className="card">
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
                <option>Monthly</option>
                <option>Quarterly</option>
                <option>Yearly</option>
              </select>

              <button onClick={() => saveEdit(member.id)}>Save</button>
              <button
                className="secondary"
                onClick={() => setEditingId(null)}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <p><strong>Name:</strong> {member.name}</p>
              <p><strong>Phone:</strong> {member.phone}</p>
              <p><strong>Plan:</strong> {member.plan}</p>

              <button onClick={() => startEdit(member)}>Edit</button>
              <button
                className="danger"
                onClick={() => removeMember(member.id)}
              >
                Delete
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
