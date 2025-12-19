import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

type Trade = {
  id: number;
  requester: string;
  responder: string;
  requested_product: any;
  offered_product: any | null;
  message: string;
  status: string;
  created_at: string;
};

export default function Trades() {
  const [inbox, setInbox] = useState<Trade[]>([]);
  const [outbox, setOutbox] = useState<Trade[]>([]);
  const { user } = useAuth();
  const nav = useNavigate();

  const load = async () => {
    try {
      const resIn = await api.get("trades/list/?box=inbox");
      setInbox(resIn.data);
      const resOut = await api.get("trades/list/?box=outbox");
      setOutbox(resOut.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const accept = async (id: number) => {
    try {
      const res = await api.post(`trades/${id}/accept/`);
      const chatId = res.data.chat_id;
      // reload lists
      await load();
      // open chat if chatId returned
      if (chatId) {
        nav(`/chat/${chatId}`);
      }
    } catch (err: any) {
      console.error(err);
      alert(err?.response?.data?.detail || "Accept failed");
    }
  };

  const reject = async (id: number) => {
    try {
      await api.post(`trades/${id}/reject/`);
      await load();
    } catch (err) {
      console.error(err);
      alert("Reject failed");
    }
  };

  const cancel = async (id: number) => {
    try {
      await api.post(`trades/${id}/cancel/`);
      await load();
    } catch (err) {
      console.error(err);
      alert("Cancel failed");
    }
  };

  return (
    <div>
      <h2>Incoming Requests (Inbox)</h2>
      {inbox.length === 0 ? <div>No incoming requests</div> : inbox.map(t => (
        <div key={t.id} style={{ border: "1px solid #ccc", padding: 8, marginBottom: 8 }}>
          <div><strong>{t.requester}</strong> offered: {t.offered_product ? t.offered_product.title : "(no offer)"}</div>
          <div>Requested: <Link to={`/products/${t.requested_product.id}`}>{t.requested_product.title}</Link></div>
          <div>Message: {t.message}</div>
          <div>Status: {t.status}</div>
          {t.status === "pending" && (
            <>
              <button onClick={() => accept(t.id)}>Accept</button>
              <button onClick={() => reject(t.id)}>Reject</button>
            </>
          )}
        </div>
      ))}

      <h2>Outgoing Requests (Outbox)</h2>
      {outbox.length === 0 ? <div>No outgoing requests</div> : outbox.map(t => (
        <div key={t.id} style={{ border: "1px solid #ccc", padding: 8, marginBottom: 8 }}>
          <div>To: <strong>{t.responder}</strong></div>
          <div>Requested: <Link to={`/products/${t.requested_product.id}`}>{t.requested_product.title}</Link></div>
          <div>Offered: {t.offered_product ? t.offered_product.title : "(no offer)"}</div>
          <div>Message: {t.message}</div>
          <div>Status: {t.status}</div>
          {t.status === "pending" && (
            <button onClick={() => cancel(t.id)}>Cancel</button>
          )}
        </div>
      ))}
    </div>
  );
}
