import NeonBackground from "../components/NeonBackground";
import { useNavigate } from "react-router-dom";

export default function Result() {
  const nav = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white relative">
      <NeonBackground />

      <h1 className="text-5xl font-bold text-green-400 mb-6">
        YOU WON 🎉
      </h1>

      <button
        onClick={() => nav("/home")}
        className="px-8 py-3 text-xl bg-blue-500 hover:bg-blue-400 rounded"
      >
        Back to Home
      </button>
    </div>
  );
}

