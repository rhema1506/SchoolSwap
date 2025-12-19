import { useEffect, useState } from "react";
import { getMyProfile, updateProfile } from "../api/profile";
import RatingStars from "../components/RatingStars";

const Profile = () => {
  const [profile, setProfile] = useState<any>(null);
  const [form, setForm] = useState<any>({});
  const [avatar, setAvatar] = useState<File | null>(null);

  useEffect(() => {
    getMyProfile().then(res => {
      setProfile(res.data);
      setForm(res.data);
    });
  }, []);

  const submit = async () => {
    const fd = new FormData();
    Object.keys(form).forEach(k => fd.append(k, form[k]));
    if (avatar) fd.append("avatar", avatar);

    const res = await updateProfile(fd);
    setProfile(res.data);
  };

  if (!profile) return null;

  return (
    <div className="max-w-lg mx-auto space-y-4">
      <img src={profile.avatar} className="w-24 h-24 rounded-full" />

      <input type="file" onChange={e => setAvatar(e.target.files![0])} />

      <input
        value={form.school || ""}
        onChange={e => setForm({ ...form, school: e.target.value })}
        placeholder="School"
      />

      <input
        value={form.user_class || ""}
        onChange={e => setForm({ ...form, user_class: e.target.value })}
        placeholder="Class"
      />

      <input
        type="number"
        value={form.age || ""}
        onChange={e => setForm({ ...form, age: e.target.value })}
        placeholder="Age"
      />

      <RatingStars value={profile.rating} />
      <p>Completed trades: {profile.completed_trades}</p>

      <button onClick={submit}>Save changes</button>
    </div>
  );
};

export default Profile;
