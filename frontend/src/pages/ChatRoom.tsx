import React, { useEffect, useState } from "react";

const ChatRoom = ({ chatId, username }) => {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [text, setText] = useState("");

  useEffect(() => {
    const ws = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${chatId}/`);
    setSocket(ws);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prev) => [...prev, data]);
    };

    return () => ws.close();
  }, [chatId]);

  const sendMessage = () => {
    if (socket && text.trim()) {
      socket.send(
        JSON.stringify({
          message: text,
          sender: username,
        })
      );
      setText("");
    }
  };

  return (
    <div>
      <h1>Chat Room {chatId}</h1>

      <div style={{ height: "300px", overflowY: "scroll", border: "1px solid gray" }}>
        {messages.map((msg, i) => (
          <div key={i}><strong>{msg.sender}</strong>: {msg.message}</div>
        ))}
      </div>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatRoom;
