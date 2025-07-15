import images from '../assets/avataar01.png';
export default function LeaderboardList({ users }) {
  return (
    <div className="bg-[#121212] p-4 rounded-lg border border-[#f0f0f0]">
      {users.map((user, idx) => (
        <div
          key={user.name}
          className="flex items-center gap-3 py-2 border-b border-gray-700"
        >
          <span className="w-6 text-right">{idx + 4}</span>
          <img
            src={images}
            className="w-8 h-8 rounded-full"
            alt={user.name}
          />
          <span className="flex-1 text-white">{user.name}</span>
          <span className="text-sm text-gray-400">
            {Intl.NumberFormat().format(user.totalPoints)}
          </span>
        </div>
      ))}
    </div>
  );
}
