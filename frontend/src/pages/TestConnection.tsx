import React, { useEffect, useState } from "react";
import api from "../api/axios";

export default function TestConnection() {
  const [status, setStatus] = useState("Checking backend...");

  useEffect(() => {
    api.get("test/")
      .then(() => setStatus("Backend connected"))
      .catch((err) => {
        console.error(err);
        setStatus("Connection failed");
      });
  }, []);

  return <div style={{ paddingTop: 20 }}>{status}</div>;
}
