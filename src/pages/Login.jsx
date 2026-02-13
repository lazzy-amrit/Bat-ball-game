import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("loggedIn") === "true") {
      nav("/home");
    }
  }, []);

  function handleLogin() {
    if (!username) return;

    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("username", username);

    nav("/home");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-96 p-8 rounded-2xl 
                      bg-white/5 backdrop-blur-md
                      border border-purple-500/40
                      shadow-xl shadow-purple-500/20">

        <h1 className="text-3xl text-center text-purple-400 mb-6">
          LOGIN
        </h1>

        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 rounded-lg mb-4 
                     bg-black border border-purple-500/40 
                     focus:outline-none focus:border-purple-400"
        />

        <button
          onClick={handleLogin}
          className="w-full py-3 rounded-xl
                     bg-purple-500/20 border border-purple-400
                     shadow-lg shadow-purple-400/30
                     hover:bg-purple-500/30 transition"
        >
          ENTER
        </button>
      </div>
    </div>
  );
}

