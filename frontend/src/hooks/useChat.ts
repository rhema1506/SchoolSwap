import { useEffect, useRef, useState } from "react";

type ChatMessage = {
  id?: number;
  chat_id?: number;
  sender_id?: number;
  sender_username?: string;
  content?: string;
  image?: string | null;
  created_at?: string;
};

export default function useChat(chatId: string | number) {
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!chatId) return;
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.warn("No access token for websocket");
      return;
    }
    const protocol = window.location.protocol === "https:" ? "wss" : "ws";
    const host = window.location.hostname || "127.0.0.1";
    const wsUrl = `${protocol}://${host}:8000/ws/chat/${chatId}/?token=${token}`;
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => setConnected(true);
    ws.onmessage = (ev) => {
      try {
        const data = JSON.parse(ev.data);
        // either a chat.message or object with content
        if (data.type === "chat.message" || data.content || data.image) {
          // Normalize event shape: if chat.message wrapped, get actual message
          const msg = data.type === "chat.message" ? data : data;
          setMessages(prev => [...prev, msg]);
        }
      } catch (err) {
        console.error("parse ws message error", err);
      }
    };
    ws.onclose = () => setConnected(false);
    ws.onerror = (err) => console.error("ws error", err);

    // expose global send function for convenience
    (window as any).__send_ws_json = (obj: object) => {
      if (ws && ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify(obj));
    };

    return () => {
      ws.close();
      wsRef.current = null;
      (window as any).__send_ws_json = undefined;
    };
  }, [chatId]);

  const sendMessage = (text: string) => {
    const ws = wsRef.current;
    if (!ws || ws.readyState !== WebSocket.OPEN) return;
    ws.send(JSON.stringify({ type: "message", content: text }));
  };

  const sendRaw = (obj: object) => {
    const ws = wsRef.current;
    if (!ws || ws.readyState !== WebSocket.OPEN) return;
    ws.send(JSON.stringify(obj));
  };

  return { connected, messages, sendMessage, sendRaw };
}
