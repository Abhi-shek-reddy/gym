// --------------------------------------------------
// MembersPage.tsx 🏋️‍♂️
// --------------------------------------------------

import { useEffect, useState } from "react";
import { useAuth } from "../../auth/context/AuthContext";
import { getMembers } from "./membersApi";

export default function MembersPage() {
  const { token } = useAuth();
  const [members, setMembers] = useState([]);

  useEffect(() => {
    if (token) {
      getMembers(token).then(setMembers);
    }
  }, [token]);

  return (
    <div>
      <h2>Gym Members 💪</h2>

      {members.map((m: any) => (
        <div key={m[0]}>
          {m[1]} - {m[3]}
        </div>
      ))}
    </div>
  );
}
