import { useState, useEffect } from "react";
import api from "../api";

export default function Leaderboard({ refreshTrigger }) {
  const [leaderboard, setLeaderboard] = useState([]);

  const fetchLeaderboard = async () => {
    const res = await api.get("/leaderboard");
    setLeaderboard(res.data);
  };

  useEffect(() => {
    fetchLeaderboard();
  }, [refreshTrigger]);

  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Total Points</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((user) => (
            <tr key={user.userId}>
              <td>{user.rank}</td>
              <td>{user.name}</td>
              <td>{user.totalPoints}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
