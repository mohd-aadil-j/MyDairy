import { jsx, jsxs } from "react/jsx-runtime";
import { useLocation, useRouter, Outlet } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { u as useTheme, a as useAuth } from "./router-DkXFKk_H.js";
import { N as Navbar } from "./Navbar-D3Sx34jV.js";
import "@tanstack/react-query";
import "./ornaments-FHn_0iDx.js";
import "lucide-react";
function LoadingScreen({ label = "Opening your diary…" }) {
  const { theme } = useTheme();
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-[60] flex items-center justify-center bg-background/80 backdrop-blur-xl", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "relative w-24 h-24", children: [
      /* @__PURE__ */ jsx(
        motion.div,
        {
          className: "absolute inset-0 rounded-full border-2 border-primary/30",
          animate: { rotate: 360 },
          transition: { duration: 8, repeat: Infinity, ease: "linear" }
        }
      ),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          className: "absolute inset-2 rounded-full border border-secondary/40 border-dashed",
          animate: { rotate: -360 },
          transition: { duration: 12, repeat: Infinity, ease: "linear" }
        }
      ),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          className: "absolute inset-5 rounded-full",
          style: { background: "var(--gradient-hero)" },
          animate: { scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] },
          transition: { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      motion.p,
      {
        initial: { opacity: 0, y: 6 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.15 },
        className: "font-display text-lg tracking-wide text-foreground/90",
        children: label
      }
    ),
    /* @__PURE__ */ jsx("span", { className: "text-[10px] uppercase tracking-[0.3em] text-muted-foreground", children: theme === "krishna" ? "Krishna · Devotion" : "Shiva · Stillness" })
  ] }) });
}
function PageTransition({ children }) {
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -8 },
      transition: { duration: 0.5, ease: [0.22, 0.8, 0.2, 1] },
      children
    }
  );
}
function AppLayout() {
  const {
    loading,
    user
  } = useAuth();
  const location = useLocation();
  const router = useRouter();
  useEffect(() => {
    if (!loading && !user) {
      router.navigate({
        to: "/login"
      });
    }
  }, [loading, user, router]);
  if (loading) return /* @__PURE__ */ jsx(LoadingScreen, {});
  if (!user) return null;
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsx(PageTransition, { children: /* @__PURE__ */ jsx(Outlet, {}) }, location.pathname) })
  ] });
}
export {
  AppLayout as component
};
