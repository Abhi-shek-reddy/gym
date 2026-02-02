// --------------------------------------------------
// AddMember.tsx 🧾
// --------------------------------------------------
//
// STORY:
// This component is the RECEPTION DESK of the gym.
//
// Admin actions:
// 1️⃣ Enter member details
// 2️⃣ Click "Add Member"
// 3️⃣ Backend saves member
// 4️⃣ Members list refreshes automatically
//
// This component:
// ❌ Does NOT manage members list
// ❌ Does NOT store tokens
// ✅ Only sends new member data
// --------------------------------------------------

import { useState } from "react";
import { addMember } from "./membersApi";
import { useAuth } from "../../auth/context/AuthContext";

type AddMemberProps = {
  onMemberAdded: () => void;
};

export default function AddMember({ onMemberAdded }: AddMemberProps) {
  // ------------------------------------------------
  // STEP 1️⃣: Get token
  // ------------------------------------------------
  const { token } = useAuth();

  // ------------------------------------------------
  // STEP 2️⃣: Form state
  // ------------------------------------------------
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [plan, setPlan] = useState("Monthly");
  const [loading, setLoading] = useState(false);

  // ------------------------------------------------
  // STEP 3️⃣: Submit handler
  // ------------------------------------------------
  const handleAddMember = async () => {
    if (!token) return;

    if (!name || !phone) {
      alert("Please fill all fields ❌");
      return;
    }

    setLoading(true);

    try {
      await addMember(token, {
        name,
        phone,
        plan,
      });

      // Clear form after success
      setName("");
      setPhone("");
      setPlan("Monthly");

      // Tell MembersPage to refresh list
      onMemberAdded();
    } catch (error) {
      alert("Failed to add member ❌");
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------------------------
  // STEP 4️⃣: UI
  // ------------------------------------------------
  return (
    <div style={{ marginBottom: "20px" }}>
      <h3>Add New Member 🏋️‍♂️</h3>

      <input
        placeholder="Member Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br />

      <input
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <br />

      <select value={plan} onChange={(e) => setPlan(e.target.value)}>
        <option value="Monthly">Monthly</option>
        <option value="Quarterly">Quarterly</option>
        <option value="Yearly">Yearly</option>
      </select>

      <br />

      <button onClick={handleAddMember} disabled={loading}>
        {loading ? "Adding..." : "Add Member"}
      </button>
    </div>
  );
}

// --------------------------------------------------
// FINAL STORY SUMMARY 📖
//
// AddMember:
// - Collects member info
// - Sends data to backend
// - Does NOT manage list
// - Parent (MembersPage) refreshes data
// --------------------------------------------------
