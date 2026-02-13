import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NeonBackground from "../components/NeonBackground";

export default function Matchmaking() {
  const nav = useNavigate();

  const [seconds, setSeconds] = useState(0);
  const [status, setStatus] = useState("searching");
  const [dots, setDots] = useState("");

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots(d => (d.length >= 3 ? "" : d + "."));
    }, 500);

    const timer = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);

    return () => {
      clearInterval(dotInterval);
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (seconds === 6) {
      setStatus("found");

      setTimeout(() => {
        nav("/match");
      }, 2000);
    }
  }, [seconds, nav]);

  return (
    <div className="min-h-screen flex items-center justify-center text-white relative">
      <NeonBackground />

      <div className="text-center">

        {status === "searching" && (
          <>
            <h1 className="text-3xl mb-4 text-cyan-400">
              Searching for Player{dots}
            </h1>
            <p className="text-gray-400">
              Time: {seconds}s
            </p>
          </>
        )}

        {status === "found" && (
          <>
            <h1 className="text-3xl mb-4 text-green-400">
              Player Found!
            </h1>
            <p className="text-gray-400">
              Starting Match...
            </p>
          </>
        )}

      </div>
    </div>
  );
}


