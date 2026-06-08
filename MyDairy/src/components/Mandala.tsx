import { motion } from "framer-motion";
import { useTheme } from "@/lib/theme";

export function Mandala({ className = "", size = 320 }: { className?: string; size?: number }) {
  const { theme } = useTheme();
  const stroke = theme === "krishna" ? "oklch(0.82 0.16 85 / 0.55)" : "oklch(0.78 0.16 200 / 0.55)";
  const accent = theme === "krishna" ? "oklch(0.55 0.15 175 / 0.45)" : "oklch(0.40 0.15 270 / 0.6)";

  const petals = Array.from({ length: 12 });
  return (
    <div className={className} style={{ width: size, height: size }}>
      <motion.svg
        viewBox="0 0 200 200"
        className="w-full h-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
      >
        <defs>
          <radialGradient id="mandala-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={accent} />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        <circle cx="100" cy="100" r="90" fill="none" stroke={stroke} strokeWidth="0.4" />
        <circle cx="100" cy="100" r="70" fill="none" stroke={stroke} strokeWidth="0.4" strokeDasharray="2 4" />
        <circle cx="100" cy="100" r="48" fill="url(#mandala-core)" />
        <circle cx="100" cy="100" r="30" fill="none" stroke={stroke} strokeWidth="0.5" />

        {petals.map((_, i) => {
          const angle = (i / petals.length) * 360;
          return (
            <g key={i} transform={`rotate(${angle} 100 100)`}>
              <path
                d="M100 20 C108 50 108 70 100 100 C92 70 92 50 100 20 Z"
                fill="none"
                stroke={stroke}
                strokeWidth="0.6"
              />
              <circle cx="100" cy="22" r="1.6" fill={stroke} />
            </g>
          );
        })}
      </motion.svg>
    </div>
  );
}
