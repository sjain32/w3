import images from '../assets/avataar01.png';
import image from '../assets/images.jpg';
export default function LeaderboardCard({ topUsers }) {
  const medals = ["🥇", "🥈", "🥉"];

  return (
    <div
      className="flex justify-center gap-4 my-6 bg-cover bg-center rounded-2xl p-4"
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      {topUsers.map((user, idx) => (
        <div
          key={user.name}
          className="flex flex-col items-center bg-[#121212] bg-opacity-90 border border-[#f0f0f0] rounded-xl p-4 w-24 backdrop-blur-sm"
        >
          <div className="text-2xl">{medals[idx]}</div>
          <img
            src={images}
            className="w-16 h-16 rounded-full border-2 border-yellow-400 object-cover"
            alt={user.name}
          />
          <div className="text-sm font-semibold mt-1 text-center text-white">
            {user.name}
          </div>
          <div className="text-xs text-gray-400">
            {Intl.NumberFormat().format(user.totalPoints)}
          </div>
        </div>
      ))}
    </div>
  );
}
