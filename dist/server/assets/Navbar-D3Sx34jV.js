import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useRouter, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { u as useTheme, a as useAuth } from "./router-DkXFKk_H.js";
import { a as ThemeMark } from "./ornaments-FHn_0iDx.js";
import { Moon, Feather, LogOut } from "lucide-react";
function ThemeSwitcher() {
  const { theme, toggle } = useTheme();
  const isShiva = theme === "shiva";
  return /* @__PURE__ */ jsxs(
    motion.button,
    {
      onClick: toggle,
      "aria-label": `Switch to ${isShiva ? "Krishna" : "Shiva"} mode`,
      whileHover: { scale: 1.04 },
      whileTap: { scale: 0.95 },
      className: "relative inline-flex items-center h-9 w-[5.25rem] rounded-full glass border border-border overflow-hidden divine-glow",
      children: [
        /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsx(
          motion.span,
          {
            initial: { opacity: 0 },
            animate: { opacity: 0.35 },
            exit: { opacity: 0 },
            transition: { duration: 0.5 },
            className: "absolute inset-0 bg-gradient-hero"
          },
          theme
        ) }),
        /* @__PURE__ */ jsx(
          motion.span,
          {
            layout: true,
            transition: { type: "spring", stiffness: 500, damping: 32 },
            className: "absolute top-1 h-7 w-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-glow",
            style: { left: isShiva ? "calc(100% - 1.875rem)" : "0.25rem" },
            children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", initial: false, children: /* @__PURE__ */ jsx(
              motion.span,
              {
                initial: { rotate: -90, opacity: 0, scale: 0.6 },
                animate: { rotate: 0, opacity: 1, scale: 1 },
                exit: { rotate: 90, opacity: 0, scale: 0.6 },
                transition: { duration: 0.25 },
                children: isShiva ? /* @__PURE__ */ jsx(Moon, { size: 14 }) : /* @__PURE__ */ jsx(Feather, { size: 14 })
              },
              theme
            ) })
          }
        ),
        /* @__PURE__ */ jsx("span", { className: "relative z-[1] flex-1 text-[10px] uppercase tracking-[0.15em] font-semibold text-center pl-7", children: isShiva ? "Shiva" : "Krishna" })
      ]
    }
  );
}
function Navbar() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const handleSignOut = async () => {
    await signOut();
    router.navigate({ to: "/" });
  };
  return /* @__PURE__ */ jsx(
    motion.header,
    {
      initial: { y: -24, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      transition: { duration: 0.6, ease: [0.22, 0.8, 0.2, 1] },
      className: "sticky top-0 z-40 backdrop-blur-xl bg-background/40 border-b border-border/40",
      children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-2.5 group", children: [
          /* @__PURE__ */ jsx(motion.span, { whileHover: { rotate: 12, scale: 1.08 }, transition: { type: "spring", stiffness: 400 }, children: /* @__PURE__ */ jsx(ThemeMark, { size: 28 }) }),
          /* @__PURE__ */ jsxs("span", { className: "font-display text-xl tracking-wide", children: [
            "My ",
            /* @__PURE__ */ jsx("span", { className: "text-gradient font-semibold", children: "Diary" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 sm:gap-3", children: [
          /* @__PURE__ */ jsx(ThemeSwitcher, {}),
          user ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(
              Link,
              {
                to: "/dashboard",
                className: "hidden sm:inline-flex px-4 py-2 rounded-full text-sm font-medium hover:text-primary transition-colors",
                children: "Dashboard"
              }
            ),
            /* @__PURE__ */ jsxs(
              motion.button,
              {
                whileHover: { scale: 1.04 },
                whileTap: { scale: 0.95 },
                onClick: handleSignOut,
                className: "flex items-center gap-1.5 px-3 py-2 rounded-full glass hover:divine-glow transition-all text-sm",
                children: [
                  /* @__PURE__ */ jsx(LogOut, { size: 15 }),
                  /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: "Sign out" })
                ]
              }
            )
          ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(
              Link,
              {
                to: "/login",
                className: "px-4 py-2 rounded-full text-sm font-medium hover:text-primary transition-colors",
                children: "Login"
              }
            ),
            /* @__PURE__ */ jsx(Link, { to: "/signup", children: /* @__PURE__ */ jsx(
              motion.span,
              {
                whileHover: { scale: 1.04 },
                whileTap: { scale: 0.96 },
                className: "inline-block px-4 py-2 rounded-full text-sm font-semibold bg-primary text-primary-foreground shadow-glow",
                children: "Begin"
              }
            ) })
          ] })
        ] })
      ] })
    }
  );
}
export {
  Navbar as N
};
