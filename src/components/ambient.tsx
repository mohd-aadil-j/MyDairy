import { useTheme } from "@/lib/theme";
import { useEffect, useState } from "react";

interface Particle {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
}

export function ParticleField({ count = 24 }: { count?: number }) {
  const { theme } = useTheme();
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: Math.random() * 6 + 2,
        duration: Math.random() * 18 + 14,
        delay: Math.random() * 20,
      })),
    );
  }, [count]);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full animate-float"
          style={{
            left: `${p.left}%`,
            bottom: `-${p.size}px`,
            width: p.size,
            height: p.size,
            background:
              theme === "krishna"
                ? "radial-gradient(circle, oklch(0.85 0.17 85 / 0.9), oklch(0.85 0.17 85 / 0))"
                : "radial-gradient(circle, oklch(0.88 0.10 220 / 0.9), oklch(0.78 0.16 200 / 0))",
            boxShadow:
              theme === "krishna"
                ? "0 0 12px oklch(0.85 0.17 85 / 0.8)"
                : "0 0 14px oklch(0.78 0.16 200 / 0.8)",
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

export function ThemeAura() {
  const { theme } = useTheme();
  return (
    <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      {theme === "krishna" ? (
        <>
          <div className="absolute -top-40 -left-40 w-[40rem] h-[40rem] rounded-full opacity-30 blur-3xl animate-drift"
               style={{ background: "radial-gradient(circle, oklch(0.55 0.15 175 / 0.6), transparent 60%)" }} />
          <div className="absolute top-1/3 -right-32 w-[36rem] h-[36rem] rounded-full opacity-30 blur-3xl animate-drift"
               style={{ background: "radial-gradient(circle, oklch(0.82 0.16 85 / 0.5), transparent 60%)", animationDelay: "4s" }} />
          <div className="absolute -bottom-32 left-1/3 w-[32rem] h-[32rem] rounded-full opacity-25 blur-3xl animate-drift"
               style={{ background: "radial-gradient(circle, oklch(0.65 0.18 300 / 0.5), transparent 60%)", animationDelay: "8s" }} />
        </>
      ) : (
        <>
          <div className="absolute top-10 right-10 w-32 h-32 rounded-full opacity-90"
               style={{
                 background: "radial-gradient(circle at 35% 35%, oklch(0.96 0.02 230), oklch(0.78 0.08 230) 60%, transparent 72%)",
                 boxShadow: "0 0 80px oklch(0.88 0.10 220 / 0.5), 0 0 160px oklch(0.78 0.16 200 / 0.3)",
               }} />
          <div className="absolute -top-32 -left-32 w-[44rem] h-[44rem] rounded-full opacity-40 blur-3xl animate-drift"
               style={{ background: "radial-gradient(circle, oklch(0.40 0.15 270 / 0.7), transparent 60%)" }} />
          <div className="absolute bottom-0 right-0 w-[40rem] h-[40rem] rounded-full opacity-30 blur-3xl animate-drift"
               style={{ background: "radial-gradient(circle, oklch(0.78 0.16 200 / 0.4), transparent 60%)", animationDelay: "6s" }} />
        </>
      )}
    </div>
  );
}
