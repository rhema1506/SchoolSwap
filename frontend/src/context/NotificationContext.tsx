import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Notification } from "../types/notification";

// Define the shape of the context
interface NotificationContextType {
  notifications: Notification[];
}

// Create the context with undefined initial value
const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// Define props for the provider
interface NotificationProviderProps {
  children: ReactNode;
}

// NotificationProvider component
export const NotificationProvider = ({ children }: NotificationProviderProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const ws = new WebSocket("ws://127.0.0.1:8000/ws/notifications/");

    ws.onmessage = (event) => {
      try {
        const data: Notification = JSON.parse(event.data);
        setNotifications(prev => [data, ...prev]);
      } catch (err) {
        console.error("Failed to parse notification:", err);
      }
    };

    ws.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications }}>
      {children}
    </NotificationContext.Provider>
  );
};

// Custom hook to use notifications
export const useNotifications = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
};
