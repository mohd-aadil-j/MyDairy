import { useTheme } from "@/lib/theme";

export function ThemeMark({ size = 28 }: { size?: number }) {
  const { theme } = useTheme();
  if (theme === "krishna") {
    // Peacock feather inspired
    return (
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className="drop-shadow-[0_0_10px_var(--glow)]">
        <defs>
          <radialGradient id="pf-eye" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(0.82 0.16 85)" />
            <stop offset="55%" stopColor="oklch(0.55 0.15 175)" />
            <stop offset="100%" stopColor="oklch(0.30 0.12 265)" />
          </radialGradient>
        </defs>
        <path d="M32 60 C32 60 14 44 14 28 C14 14 22 6 32 6 C42 6 50 14 50 28 C50 44 32 60 32 60 Z"
              fill="url(#pf-eye)" stroke="oklch(0.82 0.16 85 / 0.8)" strokeWidth="1.2" />
        <ellipse cx="32" cy="26" rx="6" ry="9" fill="oklch(0.22 0.08 270)" />
        <ellipse cx="32" cy="26" rx="3" ry="5" fill="oklch(0.82 0.16 85)" />
      </svg>
    );
  }
  // Shiva: crescent moon
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className="drop-shadow-[0_0_12px_var(--glow)]">
      <defs>
        <radialGradient id="moon-g" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="oklch(0.98 0.02 230)" />
          <stop offset="100%" stopColor="oklch(0.78 0.08 230)" />
        </radialGradient>
      </defs>
      <path d="M44 8 C28 8 18 20 18 34 C18 48 28 56 42 56 C30 52 24 42 24 32 C24 22 32 12 44 8 Z"
            fill="url(#moon-g)" />
    </svg>
  );
}

export function ThemeOrnament({ className = "" }: { className?: string }) {
  const { theme } = useTheme();
  if (theme === "krishna") {
    return (
      <svg viewBox="0 0 200 200" className={className} fill="none">
        {/* Flute */}
        <g stroke="oklch(0.82 0.16 85 / 0.7)" strokeWidth="2">
          <line x1="20" y1="180" x2="180" y2="40" />
          <circle cx="60" cy="140" r="3" fill="oklch(0.82 0.16 85)" />
          <circle cx="80" cy="120" r="3" fill="oklch(0.82 0.16 85)" />
          <circle cx="100" cy="100" r="3" fill="oklch(0.82 0.16 85)" />
          <circle cx="120" cy="80" r="3" fill="oklch(0.82 0.16 85)" />
        </g>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none">
      {/* Trishul */}
      <g stroke="oklch(0.88 0.10 220 / 0.8)" strokeWidth="2.5" strokeLinecap="round">
        <line x1="100" y1="40" x2="100" y2="180" />
        <path d="M70 70 C70 50 80 35 100 30 C120 35 130 50 130 70" />
        <line x1="70" y1="70" x2="70" y2="40" />
        <line x1="100" y1="30" x2="100" y2="10" />
        <line x1="130" y1="70" x2="130" y2="40" />
      </g>
    </svg>
  );
}
