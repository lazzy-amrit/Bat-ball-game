import { useNavigate } from "react-router-dom";
import NeonBackground from "../components/NeonBackground";
import { motion } from "framer-motion";

export default function Home() {
  const nav = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen relative text-white">
      <NeonBackground />

      <div className="flex flex-col items-center gap-5">

        {/* PLAY GAME - Primary */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => nav("/mode")}
          className="px-14 py-5 text-2xl font-bold
                     bg-black border border-purple-500
                     rounded-2xl
                     shadow-lg shadow-purple-500/40
                     hover:bg-purple-600/20
                     transition-all duration-300"
        >
          PLAY GAME
        </motion.button>

        {/* Open Chat - Secondary */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => nav("/chat")}
          className="px-6 py-2 text-sm font-medium
                     bg-black/60 border border-cyan-400/40
                     rounded-xl
                     shadow-md shadow-cyan-400/30
                     hover:bg-cyan-500/20
                     transition-all duration-300"
        >
          Open Chat
        </motion.button>

      </div>
    </div>
  );
}

