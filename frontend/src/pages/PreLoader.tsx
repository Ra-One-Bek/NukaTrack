import { useEffect, useState } from "react";
import { Truck } from "lucide-react";

export default function PreLoader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950">
      
      {/* animated gradient */}
      <div className="absolute inset-0 bg-[linear-gradient(120deg,#020617,#0f172a,#1e293b,#0f172a,#020617)] bg-[length:300%_300%] animate-[gradientMove_12s_ease_infinite]" />

      {/* soft glow */}
      <div className="absolute top-1/3 left-1/4 h-72 w-72 bg-blue-500/10 blur-3xl rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 h-72 w-72 bg-cyan-400/10 blur-3xl rounded-full" />

      <div className="relative z-10 w-full max-w-4xl px-6 text-center">

        {/* TITLE */}
        <h1 className="text-4xl md:text-5xl font-semibold tracking-wide text-white">
          UberTrack
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          Logistics platform loading...
        </p>

        {/* ROAD */}
        <div className="relative mt-12 h-28 w-full overflow-hidden rounded-2xl border border-white/5 bg-slate-900/60 backdrop-blur-md shadow-xl">
          
          {/* center line */}
          <div className="absolute top-1/2 left-0 w-full h-[2px] -translate-y-1/2 bg-white/20" />

          {/* moving dashed line */}
          <div className="absolute top-1/2 left-0 w-full h-[2px] overflow-hidden -translate-y-1/2">
            <div className="h-full w-[200%] animate-[roadMove_1.2s_linear_infinite] bg-[repeating-linear-gradient(to_right,transparent_0px,transparent_40px,white_40px,white_80px)] opacity-40" />
          </div>

          {/* TRUCK ICON */}
          <div
            className="absolute bottom-5 transition-all duration-100 ease-linear"
            style={{
              left: `calc(${progress}% - 24px)`,
            }}
          >
            <Truck
              size={40}
              className="text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]"
            />
          </div>
        </div>

        {/* PROGRESS BAR */}
        <div className="mt-8">
          <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="mt-3 text-sm text-slate-400">
            {progress}%
          </div>
        </div>
      </div>

      {/* animations */}
      <style>{`
        @keyframes gradientMove {
          0%,100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes roadMove {
          from { transform: translateX(0); }
          to { transform: translateX(-120px); }
        }
      `}</style>
    </div>
  );
}