import { useEffect } from "react";
import { useNotifications } from "../context/NotificationContext";

export const useNotificationSocket = (userId: number) => {
  const { notification, setNotification } = useNotifications();

  useEffect(() => {
    const ws = new WebSocket(`ws://127.0.0.1:8000/ws/notifications/`);

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setNotifications(prev => [data, ...prev]);

      if (Notification.permission === "granted") {
        new Notification("SchoolSwap", {
          body: data.text,
        });
      }
    };

    return () => ws.close();
  }, []);
};