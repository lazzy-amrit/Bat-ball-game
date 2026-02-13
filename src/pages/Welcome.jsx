import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import NeonBackground from "../components/NeonBackground";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen text-white relative">
      <NeonBackground />

      <div className="text-center space-y-8">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text"
        >
          HI, I am Codex
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 2 }}
          className="text-xl md:text-2xl text-cyan-300"
        >
          I am developing this game
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/login")}
          className="px-10 py-4 rounded-xl bg-blue-500 text-white font-semibold shadow-lg shadow-blue-500/50 hover:bg-blue-400 transition"
        >
          Login
        </motion.button>
      </div>
    </div>
  );
}

