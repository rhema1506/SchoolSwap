import React, { useState, useEffect, useRef } from "react";
import api from "../api/axios";


const Chat = ({ chatId, otherUserId }) => {
  const [online, setOnline] = useState(false);
  const [lastSeen, setLastSeen] = useState("");
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    // fetch last seen on mount
    api.get(`/chat/last-seen/${otherUserId}/`)
       .then(res => setLastSeen(res.data.last_seen));

    ws.current = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${chatId}/`);

    ws.current.onmessage = (e) => {
      const data = JSON.parse(e.data);

      if (data.type === "presence") {
        if (data.user_id === otherUserId) {
          setOnline(data.status === "online");

          if (data.status === "offline") {
            api.get(`/chat/last-seen/${otherUserId}/`)
               .then(res => setLastSeen(res.data.last_seen));
          }
        }
      }
    };

    return () => ws.current?.close();
  }, [chatId, otherUserId]);

  return (
    <div>
      <div className="flex gap-2 items-center mb-3">
        <div className={`w-3 h-3 rounded-full ${online ? "bg-green-500" : "bg-gray-400"}`}></div>

        <div>
          {online ? (
            <p className="text-green-600 font-semibold">Online</p>
          ) : (
            <p className="text-gray-500 text-sm">Last seen: {lastSeen || "Unknown"}</p>
          )}
        </div>
      </div>

      {/* ... rest of your chat UI ... */}
    </div>
  );
};

export default Chat;