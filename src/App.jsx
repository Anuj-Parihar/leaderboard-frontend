import { useState } from "react";
import UserSelector from "./components/UserSelector";
import Leaderboard from "./components/Leaderboard";
import ClaimHistory from "./components/ClaimHistory";
import "./App.css";
import './styles/layout.css';
import './styles/userSelector.css';
import './styles/leaderboard.css';
import './styles/claimHistory.css';


export default function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const triggerRefresh = () => setRefreshKey((k) => k + 1);

  return (
    <div className="container">
      <h1>Leaderboard System</h1>
      <UserSelector onClaimSuccess={triggerRefresh} />
      <Leaderboard refreshTrigger={refreshKey} />
      <ClaimHistory refreshTrigger={refreshKey} />
    </div>
  );
}
