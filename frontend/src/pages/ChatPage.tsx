import React, { useEffect, useRef, useState } from "react";
import useChat from "../hooks/useChat"; // your ws hook
import api from "../api/axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function ChatPage() {
  const { id } = useParams<{ id?: string }>();
  const chatId = id ?? "1";
  const { connected, messages, sendMessage } = useChat(chatId);
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const { user } = useAuth();

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
    if (f) setPreview(URL.createObjectURL(f));
    else setPreview(null);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (file) {
        const form = new FormData();
        form.append("file", file);
        const res = await api.post("chat/upload/", form, { headers: { "Content-Type": "multipart/form-data" }});
        const url = res.data.url; // absolute URL to media
        // send ws message referencing image URL
        sendMessageWithImage("", url);
        // clear
        setFile(null);
        setPreview(null);
        return;
      }

      if (text.trim()) {
        sendMessage(text.trim());
        setText("");
      }
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  // helper to send image message (via ws hook)
  const sendMessageWithImage = (content: string, imageUrl: string) => {
    // your useChat hook's sendMessage currently sends only text; adapt to send object
    // We'll call the browser WS directly via 'sendRaw' if available from hook
    // For simplicity, we'll store a small global function on window in useChat hook
    ;(window as any).__send_ws_json?.({ type: "message", content, image: imageUrl });
  };

  return (
    <div>
      <h3>Chat #{chatId}</h3>
      <div style={{ border: "1px solid #ddd", padding: 12, height: 400, overflowY: "auto" }}>
        {messages.map((m, i) => (
          <div key={i} style={{ marginBottom: 8 }}>
            <strong>{m.sender_username ?? (m.sender_id === user?.id ? "You" : "User")}</strong>: {m.content}
            {m.image && (
              <div><img src={m.image} alt="attachment" style={{ maxWidth: 300, display: "block", marginTop: 6 }} /></div>
            )}
            <div style={{ fontSize: 12, color: "#666" }}>{m.created_at}</div>
          </div>
        ))}
      </div>

      <form onSubmit={submit} style={{ marginTop: 8 }}>
        <input value={text} onChange={e => setText(e.target.value)} style={{ width: "60%" }} />
        <input type="file" accept="image/*" onChange={handleFile} style={{ marginLeft: 8 }} />
        <button type="submit" style={{ marginLeft: 8 }}>Send</button>
      </form>

      {preview && <div style={{ marginTop: 8 }}><img src={preview} alt="preview" style={{ width: 200 }} /></div>}
    </div>
  );
}
