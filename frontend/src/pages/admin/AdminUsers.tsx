import { useEffect, useState } from "react";
import { getUsers, toggleUserBlock } from "../../api/admin";
import { AdminUser } from "../../types/admin";

const AdminUsers = () => {
  const [users, setUsers] = useState<AdminUser[]>([]);

  const load = () => getUsers().then(res => setUsers(res.data));

  useEffect(() => { load(); }, []);

  const toggle = async (id: number) => {
    await toggleUserBlock(id);
    load();
  };

  return (
    <table>
      <thead>
        <tr>
          <th>User</th>
          <th>Email</th>
          <th>Status</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {users.map(u => (
          <tr key={u.id}>
            <td>{u.username}</td>
            <td>{u.email}</td>
            <td>{u.is_active ? "Active" : "Blocked"}</td>
            <td>
              <button onClick={() => toggle(u.id)}>
                {u.is_active ? "Block" : "Unblock"}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AdminUsers;
