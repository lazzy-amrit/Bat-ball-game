import { useNavigate } from "react-router-dom";
import NeonBackground from "../components/NeonBackground";

export default function Mode() {
  const nav = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative text-white bg-black">

      <NeonBackground />

      {/* Back Button */}
      <button
        onClick={() => nav("/home")}
        className="absolute top-6 left-6 w-12 h-12 rounded-full 
                   border border-cyan-400 
                   shadow-lg shadow-cyan-400/50
                   hover:bg-cyan-400/20 transition"
      >
        ⬅
      </button>

      <h1 className="text-4xl mb-10 text-cyan-400">
        🎮 Select Mode
      </h1>

      <div className="flex flex-col gap-6 w-64">

        {/* Public Match */}
        <button
          onClick={() => nav("/matchmaking")}
          className="py-4 text-xl font-semibold 
                     border border-purple-500 
                     rounded-xl 
                     shadow-lg shadow-purple-500/40
                     hover:bg-purple-500/20 transition"
        >
          Public Match
        </button>

        {/* Private Room */}
        <button
          onClick={() => nav("/private")}
          className="py-4 text-xl font-semibold 
                     border border-pink-500 
                     rounded-xl 
                     shadow-lg shadow-pink-500/40
                     hover:bg-pink-500/20 transition"
        >
          Private Room
        </button>

      </div>

    </div>
  );
}

