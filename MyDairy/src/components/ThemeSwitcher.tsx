import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/lib/theme";
import { Feather, Moon } from "lucide-react";

export function ThemeSwitcher() {
  const { theme, toggle } = useTheme();
  const isShiva = theme === "shiva";

  return (
    <motion.button
      onClick={toggle}
      aria-label={`Switch to ${isShiva ? "Krishna" : "Shiva"} mode`}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.95 }}
      className="relative inline-flex items-center h-9 w-[5.25rem] rounded-full glass border border-border overflow-hidden divine-glow"
    >
      {/* Track gradient swap */}
      <AnimatePresence mode="wait">
        <motion.span
          key={theme}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.35 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 bg-gradient-hero"
        />
      </AnimatePresence>

      {/* Sliding knob */}
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 32 }}
        className="absolute top-1 h-7 w-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-glow"
        style={{ left: isShiva ? "calc(100% - 1.875rem)" : "0.25rem" }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={theme}
            initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.25 }}
          >
            {isShiva ? <Moon size={14} /> : <Feather size={14} />}
          </motion.span>
        </AnimatePresence>
      </motion.span>

      {/* Side labels */}
      <span className="relative z-[1] flex-1 text-[10px] uppercase tracking-[0.15em] font-semibold text-center pl-7">
        {isShiva ? "Shiva" : "Krishna"}
      </span>
    </motion.button>
  );
}
