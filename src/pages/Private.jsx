import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NeonBackground from "../components/NeonBackground";

export default function Private() {
  const nav = useNavigate();
  const [roomCode, setRoomCode] = useState("");

  function generateRoom() {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    nav(`/room/${code}`);
  }

  function joinRoom() {
    if (roomCode.length === 6) {
      nav(`/room/${roomCode.toUpperCase()}`);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative text-white bg-black">
      <NeonBackground />

      {/* Back Button */}
      <button
        onClick={() => nav("/mode")}
        className="absolute top-6 left-6 w-12 h-12 rounded-full 
                   border border-cyan-400 
                   shadow-lg shadow-cyan-400/50
                   hover:bg-cyan-400/20 transition"
      >
        ⬅
      </button>

      <h1 className="text-4xl mb-10 text-pink-400">
        🔐 Private Room
      </h1>

      <div className="flex flex-col gap-6 w-72">

        {/* Create Room */}
        <button
          onClick={generateRoom}
          className="py-4 text-xl font-semibold 
                     border border-purple-500 
                     rounded-xl 
                     shadow-lg shadow-purple-500/40
                     hover:bg-purple-500/20 transition"
        >
          Create Room
        </button>

        {/* Join Room */}
        <div className="flex flex-col gap-3">
          <input
            type="text"
            maxLength={6}
            placeholder="Enter Room Code"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
            className="px-4 py-3 bg-black border border-cyan-500 
                       rounded-lg text-center tracking-widest 
                       focus:outline-none focus:border-pink-400"
          />

          <button
            onClick={joinRoom}
            className="py-3 text-lg font-semibold 
                       border border-cyan-500 
                       rounded-lg 
                       shadow-md shadow-cyan-500/40
                       hover:bg-cyan-500/20 transition"
          >
            Join Room
          </button>
        </div>

      </div>
    </div>
  );
}

