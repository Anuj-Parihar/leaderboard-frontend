import { useState, useEffect } from "react";
import api from "../api";

export default function ClaimHistory({ refreshTrigger }) {
  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {
    const res = await api.get("/claims");
    setHistory(res.data);
  };

  useEffect(() => {
    fetchHistory();
  }, [refreshTrigger]);

  return (
    <div className="claim-history">
      <h2>Claim History</h2>
      <ul>
        {history.map((h, index) => (
          <li key={index}>
            {h.userName} claimed {h.points} points on {new Date(h.claimedAt).toLocaleString()} (Ref: {h.claimRef})
          </li>
        ))}
      </ul>
    </div>
  );
}
