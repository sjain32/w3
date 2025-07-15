import { useEffect, useState } from "react";
import UserSelector from "./components/UserSelector";
import LeaderboardCard from "./components/LeaderboardCard";
import LeaderboardList from "./components/LeaderboardList";
import HistoryLog from "./components/HistoryLog";
import { getLeaderboard } from "./api";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { io } from "socket.io-client";
import { FcIdea } from "react-icons/fc";

const socket = io("http://localhost:5000");

export default function App() {
  const [selectedUser, setSelectedUser] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const [topThree, setTopThree] = useState([]);
  const [others, setOthers] = useState([]);

  const fetchLeaderboard = () => {
    getLeaderboard().then((res) => {
      setTopThree(res.data.slice(0, 3));
      setOthers(res.data.slice(3));
    });
  };

  useEffect(() => {
    fetchLeaderboard();
    socket.on("leaderboard-updated", fetchLeaderboard);
    return () => socket.disconnect();
  }, []);

  const handleUserAdded = () => {
    fetchLeaderboard();
  };

  const handleUserClaimed = () => {
    setRefreshKey((prev) => prev + 1); 
    fetchLeaderboard(); 
  };

  return (
    <div className="flex items-center justify-center bg-black min-h-screen text-white p-4">
      <div className="w-full max-w-3xl min-h-175 border-2 border-gray-900 rounded-4xl p-4 bg-transparent">
        <div className="flex items-center justify-center gap-4 mb-6">
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent text-center">
            Leaderboard
          </h1>
          <FcIdea className="text-4xl" />
        </div>

        <UserSelector
          setSelectedUser={setSelectedUser}
          selectedUser={selectedUser}
          onUserAdded={handleUserAdded}
          onUserClaimed={handleUserClaimed}
        />

        <LeaderboardCard topUsers={topThree} />
        <LeaderboardList users={others} />
        <HistoryLog refresh={refreshKey} />
        <ToastContainer />
      </div>
    </div>
  );
}
