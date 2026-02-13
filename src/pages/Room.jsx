import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NeonBackground from "../components/NeonBackground";

export default function Room() {
  const { code } = useParams();
  const nav = useNavigate();
  const socketRef = useRef(null);

  const [players, setPlayers] = useState(1);
  const [readyCount, setReadyCount] = useState(0);

  useEffect(() => {
    socketRef.current = new WebSocket(
      "ws://192.168.1.5:8000/ws/" + code
    );

    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "room_update") {
        setPlayers(data.players);
      }

      if (data.type === "ready_update") {
        setReadyCount(data.ready_count);
      }

      if (data.type === "start_game") {
        nav("/match");
      }
    };

    return () => socketRef.current.close();
  }, []);

  function handleReady() {
    socketRef.current.send(
      JSON.stringify({ type: "ready" })
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white relative">
      <NeonBackground />

      <div className="w-96 p-8 rounded-2xl 
                      bg-white/5 backdrop-blur-md
                      border border-cyan-500/30
                      shadow-2xl shadow-cyan-500/20">

        <h1 className="text-2xl text-center text-cyan-400 mb-4">
          🔐 Room {code}
        </h1>

        <div className="mb-6 text-center text-gray-400">
          Players Joined: {players}/2
        </div>

        <div className="mb-6 text-center">
          Ready Players: {readyCount}/2
        </div>

        <button
          onClick={handleReady}
          className="w-full py-3 rounded-xl
                     bg-cyan-500/20 border border-cyan-400
                     shadow-lg shadow-cyan-400/30
                     hover:bg-cyan-500/30 transition"
        >
          READY
        </button>
      </div>
    </div>
  );
}


