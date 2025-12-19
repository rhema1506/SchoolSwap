import { useEffect, useState } from "react";
import { getAdminStats } from "../../api/admin";
import { AdminStats } from "../../types/admin";

const AdminDashboard = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);

  useEffect(() => {
    getAdminStats().then(res => setStats(res.data));
  }, []);

  if (!stats) return null;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      <div className="grid grid-cols-4 gap-4">
        <div>Users: {stats.total_users}</div>
        <div>Products: {stats.total_products}</div>
        <div>Chats: {stats.total_chats}</div>
        <div>Messages: {stats.total_messages}</div>
      </div>

      <h2 className="text-xl">New users (7 days)</h2>
      <ul>
        {stats.users_last_7_days.map(d => (
          <li key={d.date}>{d.date}: {d.users}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
