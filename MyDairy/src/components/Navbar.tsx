import { Link, useRouter } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth";
import { ThemeMark } from "./ornaments";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { LogOut } from "lucide-react";

export function Navbar() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.navigate({ to: "/" });
  };

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 0.8, 0.2, 1] }}
      className="sticky top-0 z-40 backdrop-blur-xl bg-background/40 border-b border-border/40"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <motion.span whileHover={{ rotate: 12, scale: 1.08 }} transition={{ type: "spring", stiffness: 400 }}>
            <ThemeMark size={28} />
          </motion.span>
          <span className="font-display text-xl tracking-wide">
            My <span className="text-gradient font-semibold">Diary</span>
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeSwitcher />

          {user ? (
            <>
              <Link
                to="/dashboard"
                className="hidden sm:inline-flex px-4 py-2 rounded-full text-sm font-medium hover:text-primary transition-colors"
              >
                Dashboard
              </Link>
              <Link
                to="/change-password"
                className="hidden sm:inline-flex px-4 py-2 rounded-full text-sm font-medium hover:text-primary transition-colors"
              >
                Change password
              </Link>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSignOut}
                className="flex items-center gap-1.5 px-3 py-2 rounded-full glass hover:divine-glow transition-all text-sm"
              >
                <LogOut size={15} />
                <span className="hidden sm:inline">Sign out</span>
              </motion.button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-full text-sm font-medium hover:text-primary transition-colors"
              >
                Login
              </Link>
              <Link to="/signup">
                <motion.span
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="inline-block px-4 py-2 rounded-full text-sm font-semibold bg-primary text-primary-foreground shadow-glow"
                >
                  Begin
                </motion.span>
              </Link>
            </>
          )}
        </div>
      </div>
    </motion.header>
  );
}
