import { claimPoints } from "../api"; 
import { toast } from "react-toastify";

export default function ClaimButton({ selectedUser, onClaim }) {
  const handleClick = async () => {
    if (!selectedUser) {
      toast.warning("Please select a user first!");
      return;
    }

    try {
      await claimPoints(selectedUser);
      toast.success("Points claimed successfully!");
      onClaim(); 
    } catch (error) {
      toast.error("Failed to claim points.");
      console.error(error);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full text-sm transition-all"
    >
      Claim
    </button>
  );
}
