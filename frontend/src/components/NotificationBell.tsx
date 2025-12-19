import { Link } from "react-router-dom";
import { useNotifications } from "../context/NotificationContext";

const NotificationBell: React.FC = () => {
  const { notifications } = useNotifications();
  const unreadCount = notifications.filter(n => !n.is_read).length;

  return (
    <Link
      to="/notifications"
      className="relative inline-block"
      aria-label={unreadCount > 0 ? `You have ${unreadCount} unread notifications` : "No unread notifications"}
    >
      <span className="text-2xl">🔔</span>
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs px-1 rounded-full">
          {unreadCount}
        </span>
      )}
    </Link>
  );
};

export default NotificationBell;
