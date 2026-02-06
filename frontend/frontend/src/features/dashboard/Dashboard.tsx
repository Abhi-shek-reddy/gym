// --------------------------------------------------
// Dashboard.tsx 📊
// --------------------------------------------------
//
// STORY:
//
// This page is the MANAGER CABIN of the gym.
//
// After login:
// - User lands here
// - Gets an overview
// - Can navigate to other rooms
//
// This page:
// ❌ Does NOT manage members directly
// ❌ Does NOT handle authentication logic
//
// It ONLY:
// ✅ Shows summary
// ✅ Guides user to other pages
// --------------------------------------------------

// --------------------------------------------------
// Dashboard.tsx 📊
// --------------------------------------------------
//
// STORY:
//
// This page is the MANAGER CABIN.
//
// After login:
// - User lands here
// - Sees quick summary
// - Navigates to Members
// - Can logout
// --------------------------------------------------

// --------------------------------------------------
// Dashboard.tsx 📊
// --------------------------------------------------
//
// STORY:
//
// This is the ADMIN CONTROL CENTER.
// Admin does NOT manage data here.
// Admin OBSERVES the gym.
//
// This page answers:
// - How many members?
// - Who is active?
// - Which plans are popular?
// --------------------------------------------------

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/hooks/useAuth";
import LogoutButton from "../../shared/components/LogoutButton";

type Stats = {
  total_members: number;
  active_members: number;
  inactive_members: number;
  plans: {
    Monthly: number;
    Quarterly: number;
    Yearly: number;
  };
};

export default function Dashboard() {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    if (!token) return;

    fetch("http://127.0.0.1:8000/dashboard/stats", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setStats(data));
  }, [token]);

  if (!stats) return <p>Loading dashboard...</p>;

  return (
    <div className="container">
      <div className="top-bar">
        <h2>Admin Dashboard 📊</h2>
        <LogoutButton />
      </div>

      <div className="card">
        <h3>Total Members</h3>
        <p>{stats.total_members}</p>
      </div>

      <div className="card">
        <h3>Active Members</h3>
        <p>{stats.active_members}</p>
      </div>

      <div className="card">
        <h3>Inactive Members</h3>
        <p>{stats.inactive_members}</p>
      </div>

      <div className="card">
        <h3>Plans Distribution</h3>
        <p>Monthly: {stats.plans.Monthly}</p>
        <p>Quarterly: {stats.plans.Quarterly}</p>
        <p>Yearly: {stats.plans.Yearly}</p>
      </div>

      <button onClick={() => navigate("/members")}>
        Manage Members 👥
      </button>
    </div>
  );
}


// --------------------------------------------------
// FINAL STORY SUMMARY 📖
//
// Dashboard:
// - Entry point after login
// - Shows summary (counts, stats)
// - Guides user to other pages
//
// It is the CONTROL CENTER of the app.
// --------------------------------------------------
