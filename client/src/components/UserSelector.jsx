import { useEffect, useState } from "react";
import { fetchUsers, addUser } from "../api";
import ClaimButton from "./ClaimButton";

export default function UserSelector({
  selectedUser,
  setSelectedUser,
  onUserAdded,
  onUserClaimed,
}) {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");

  const loadUsers = () => {
    fetchUsers().then((res) => setUsers(res.data));
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleAdd = async () => {
    const trimmed = name.trim();
    if (!trimmed) return;

    try {
      const res = await addUser(trimmed);
      setUsers([...users, res.data]);
      setName("");
      onUserAdded(); 
    } catch (error) {
      console.error("Failed to add user:", error);
    }
  };

  const handleClaim = () => {
    onUserClaimed(); 
  };

  return (
    <div className="w-full max-w-xl mx-auto my-6 p-4 rounded-xl shadow-md flex flex-col md:flex-row items-center gap-10 bg-[#1e1e1e]">
      <div className="flex flex-col sm:flex-row items-center gap-2 w-full md:w-1/2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter new user name"
          className="w-full flex-1 border border-gray-700 px-4 py-2 rounded-full bg-[#2a2a2a] text-sm outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-sm transition-all"
        >
          Add
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-2 w-full md:w-1/2">
        <select
          onChange={(e) => setSelectedUser(e.target.value)}
          value={selectedUser}
          className="w-full flex-1 border border-gray-700 px-4 py-2 rounded-full bg-[#2a2a2a] text-sm outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select User</option>
          {users.map((u) => (
            <option key={u._id} value={u._id}>
              {u.name}
            </option>
          ))}
        </select>

        <ClaimButton selectedUser={selectedUser} onClaim={handleClaim} />
      </div>
    </div>
  );
}
