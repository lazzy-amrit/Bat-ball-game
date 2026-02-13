import { useNavigate } from "react-router-dom";
import NeonBackground from "../components/NeonBackground";

export default function Chat() {
  const nav = useNavigate();
  
  return (
    <div className="relative min-h-screen text-white">
      <NeonBackground />
      
      <button
        onClick={() => nav(-1)}
        className="absolute top-5 left-5 text-xl px-3 py-2 bg-blue-500 hover:bg-blue-400 rounded"
      >
        Back
      </button>

      <div className="mt-20 text-center text-3xl">
        Chat UI Here (Coming Soon)
      </div>
    </div>
  );
}

