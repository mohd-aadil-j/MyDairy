import { motion } from "framer-motion";
import { useTheme } from "@/lib/theme";

export function LoadingScreen({ label = "Opening your diary…" }: { label?: string }) {
  const { theme } = useTheme();
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-background/80 backdrop-blur-xl">
      <div className="flex flex-col items-center gap-6">
        <div className="relative w-24 h-24">
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary/30"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-2 rounded-full border border-secondary/40 border-dashed"
            animate={{ rotate: -360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-5 rounded-full"
            style={{ background: "var(--gradient-hero)" }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="font-display text-lg tracking-wide text-foreground/90"
        >
          {label}
        </motion.p>
        <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          {theme === "krishna" ? "Krishna · Devotion" : "Shiva · Stillness"}
        </span>
      </div>
    </div>
  );
}
