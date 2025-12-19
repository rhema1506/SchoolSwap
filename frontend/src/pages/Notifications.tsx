import api from "../api/axios";
import { useNotifications } from "../context/NotificationContext";

const Notifications = () => {
  const { notifications, setNotifications } = useNotifications();

  const openChat = async (n) => {
    await api.post(`/notifications/${n.id}/read/`);
    setNotifications(prev =>
      prev.map(x => x.id === n.id ? { ...x, is_read: true } : x)
    );
    window.location.href = `/chat/${n.chat_id}`;
  };

  return (
    <div>
      <h1>Уведомления</h1>
      {notifications.map(n => (
        <div
          key={n.id}
          onClick={() => openChat(n)}
          className={`p-3 border ${n.is_read ? "" : "bg-gray-100"}`}
        >
          <b>{n.sender_username}</b>: {n.text}
        </div>
      ))}
    </div>
  );
};

export default Notifications;