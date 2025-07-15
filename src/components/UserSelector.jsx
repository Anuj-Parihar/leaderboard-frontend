import { useState, useEffect } from "react";
import api from "../api";

export default function UserSelector({ onClaimSuccess }) {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const [message, setMessage] = useState("");

  const fetchUsers = async () => {
    const res = await api.get("/leaderboard");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleClaim = async () => {
    if (!selectedUserId) return;
    try {
      const res = await api.post(`/claim/${selectedUserId}`);
      setMessage(res.data.message);
      onClaimSuccess(); // trigger leaderboard refresh
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddUser = async () => {
    if (!newUserName) return;
    try {
      await api.post("/add", { name: newUserName });
      setNewUserName("");
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="user-selector">
      <h2>Select User</h2>
      <select
        value={selectedUserId}
        onChange={(e) => setSelectedUserId(e.target.value)}
      >
        <option value="">-- Select a user --</option>
        {users.map((u) => (
          <option key={u.userId} value={u.userId}>
            {u.name}
          </option>
        ))}
      </select>
      <button onClick={handleClaim} disabled={!selectedUserId}>
        Claim Points
      </button>
      {message && <p className="message">{message}</p>}

      <div className="add-user">
        <input
          type="text"
          placeholder="New user name"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
        />
        <button onClick={handleAddUser}>Add User</button>
      </div>
    </div>
  );
}
