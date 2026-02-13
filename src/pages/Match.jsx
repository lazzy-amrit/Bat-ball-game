import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NeonBackground from "../components/NeonBackground";

export default function Match() {
  const nav = useNavigate();

  const [innings, setInnings] = useState(1);
  const [runs1, setRuns1] = useState(0);
  const [runs2, setRuns2] = useState(0);
  const [target, setTarget] = useState(null);
  const [matchOver, setMatchOver] = useState(false);
  const [superRound, setSuperRound] = useState(false);

  const [p1Choice, setP1Choice] = useState(null);
  const [history, setHistory] = useState([]);

  const [activePlayer, setActivePlayer] = useState(1);

  const emojis = ["1️⃣","2️⃣","3️⃣","4️⃣","5️⃣","6️⃣"];

  function chooseP1(num) {
    if (matchOver) return;
    setP1Choice(num);
  }

  function chooseP2(num) {
    if (matchOver || p1Choice === null) return;

    const p1 = p1Choice;
    const p2 = num;

    setHistory(prev => [`P1 = ${p1} : P2 = ${p2}`, ...prev]);

    if (innings === 1) {
      if (p1 === p2) {
        // OUT → switch innings
        setTarget(runs1 + 1);
        setInnings(2);
      } else {
        setRuns1(r => r + p1);
      }
    } else {
      if (p1 === p2) {
        // OUT in 2nd innings
        if (runs2 === target - 1) {
          startSuperRound();
        } else if (runs2 >= target) {
          endMatch("p2");
        } else {
          endMatch("p1");
        }
      } else {
        const newRuns = runs2 + p1;
        setRuns2(newRuns);

        if (newRuns >= target) {
          endMatch("p2");
        }
      }
    }

    setP1Choice(null);
  }

  function startSuperRound() {
    if (!superRound) {
      setSuperRound(true);
      setInnings(1);
      setRuns1(0);
      setRuns2(0);
      setTarget(null);
      setHistory([]);
    } else {
      endMatch("tie");
    }
  }

  function endMatch(winner) {
    setMatchOver(true);

    if (winner === "p1") nav("/result?win=1");
    else if (winner === "p2") nav("/result?win=0");
    else nav("/result?win=tie");
  }

  function switchPlayer() {
    setActivePlayer(prev => (prev === 1 ? 2 : 1));
  }

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

      {superRound && (
        <div className="text-2xl text-yellow-400 mb-3 animate-pulse">
          ⚡ SUPER ROUND ⚡
        </div>
      )}

      <h1 className="text-3xl mb-4">
        {innings === 1 ? "Innings 1" : "Innings 2"}
      </h1>

      <div className="flex gap-16 text-lg mb-4">
        <div className="text-purple-400">P1: {runs1}</div>
        <div className="text-red-400">P2: {runs2}</div>
      </div>

      {target && (
        <div className="mb-4 text-green-400 text-lg">
          Target: {target}
        </div>
      )}

      {/* Shift Player */}
      <button
        onClick={switchPlayer}
        className="mb-4 px-4 py-2 text-sm 
                   border border-pink-400 
                   rounded-lg 
                   shadow-md shadow-pink-400/40
                   hover:bg-pink-400/20 transition"
      >
        Switch Player (Active: {activePlayer})
      </button>

      {/* Player 1 */}
      <div className="mb-4">
        <h3 className="mb-2 text-purple-300">Player 1 Choose</h3>
        <div className="flex gap-3">
          {emojis.map((e, i) => (
            <button
              key={i}
              onClick={() => chooseP1(i + 1)}
              className="text-2xl px-3 py-2 border border-purple-500 rounded-lg hover:bg-purple-500/20"
            >
              {e}
            </button>
          ))}
        </div>
      </div>

      {/* Player 2 */}
      <div className="mb-6">
        <h3 className="mb-2 text-red-300">Player 2 Choose</h3>
        <div className="flex gap-3">
          {emojis.map((e, i) => (
            <button
              key={i}
              onClick={() => chooseP2(i + 1)}
              className="text-2xl px-3 py-2 border border-red-500 rounded-lg hover:bg-red-500/20"
            >
              {e}
            </button>
          ))}
        </div>
      </div>

      {/* History */}
      <div className="h-32 overflow-y-auto text-sm w-72 border border-cyan-500/30 p-3 rounded-lg bg-black/50">
        {history.map((h, i) => (
          <div key={i}>{h}</div>
        ))}
      </div>

    </div>
  );
}

