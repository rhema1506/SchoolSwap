import React from "react";
import { useAuth } from "../auth/AuthContext";

const Profile: React.FC = () => {
  const { user } = useAuth();
  if (!user) return <div className="container py-6">Not logged in</div>;
  return (
    <div className="container py-6">
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold">Profile</h2>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>ID:</strong> {user.id}</p>
      </div>
    </div>
  );
};

export default Profile;
