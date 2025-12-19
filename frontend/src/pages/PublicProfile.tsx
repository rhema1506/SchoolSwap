import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPublicProfile } from "../api/profile";
import RatingStars from "../components/RatingStars";

const PublicProfile = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    getPublicProfile(username!).then(res => setProfile(res.data));
  }, [username]);

  if (!profile) return null;

  return (
    <div>
      <img src={profile.avatar} />
      <h2>{profile.username}</h2>
      <RatingStars value={profile.rating} />
      <p>Trades: {profile.completed_trades}</p>
    </div>
  );
};

export default PublicProfile;
