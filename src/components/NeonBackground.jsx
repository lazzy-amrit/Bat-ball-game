export default function NeonBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-black overflow-hidden">
      <div className="absolute w-[600px] h-[600px] bg-blue-500/20 blur-3xl rounded-full top-[-100px] left-[-100px] animate-pulse"></div>
      <div className="absolute w-[500px] h-[500px] bg-cyan-400/20 blur-3xl rounded-full bottom-[-100px] right-[-100px] animate-pulse"></div>
    </div>

  );
}

