import { jsx, jsxs } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { a as useAuth } from "./router-DkXFKk_H.js";
import { T as ThemeOrnament } from "./ornaments-FHn_0iDx.js";
import { M as Mandala } from "./Mandala-5O4Yr9lK.js";
import { Plus, Search, Feather } from "lucide-react";
function Dashboard() {
  const {
    user
  } = useAuth();
  const [q, setQ] = useState("");
  const {
    data: entries = [],
    isLoading
  } = useQuery({
    queryKey: ["entries", user?.id],
    queryFn: async () => {
      const res = await fetch("/api/entries", {
        credentials: "same-origin"
      });
      if (!res.ok) throw new Error("Failed to load entries");
      const data = await res.json();
      return data;
    },
    enabled: !!user
  });
  const filtered = useMemo(() => {
    if (!q.trim()) return entries;
    const needle = q.toLowerCase();
    return entries.filter((e) => {
      const dateStr = new Date(e.created_at).toLocaleDateString(void 0, {
        dateStyle: "long"
      }).toLowerCase();
      return e.title.toLowerCase().includes(needle) || e.content.toLowerCase().includes(needle) || dateStr.includes(needle);
    });
  }, [entries, q]);
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen shiva-page-bg shiva-dashboard-bg", children: /* @__PURE__ */ jsxs("main", { className: "relative max-w-5xl mx-auto px-6 py-12", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-[-40px] right-[-40px] pointer-events-none opacity-30", children: /* @__PURE__ */ jsx(Mandala, { size: 260 }) }),
    /* @__PURE__ */ jsx(ThemeOrnament, { className: "absolute top-0 left-0 w-32 h-32 opacity-10 animate-slow-spin pointer-events-none" }),
    /* @__PURE__ */ jsxs(motion.div, { initial: {
      opacity: 0,
      y: 20
    }, animate: {
      opacity: 1,
      y: 0
    }, transition: {
      duration: 0.6
    }, className: "flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 relative", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-[0.25em] text-muted-foreground mb-2", children: "Your sanctuary" }),
        /* @__PURE__ */ jsx("h1", { className: "font-display text-4xl sm:text-5xl", children: /* @__PURE__ */ jsx("span", { className: "text-gradient", children: "Memories" }) }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground mt-2", children: [
          entries.length,
          " ",
          entries.length === 1 ? "entry" : "entries",
          " · ",
          (/* @__PURE__ */ new Date()).toLocaleDateString(void 0, {
            dateStyle: "long"
          })
        ] })
      ] }),
      /* @__PURE__ */ jsx(Link, { to: "/new", children: /* @__PURE__ */ jsxs(motion.span, { whileHover: {
        scale: 1.05,
        boxShadow: "0 0 50px var(--glow)"
      }, whileTap: {
        scale: 0.96
      }, className: "inline-flex items-center gap-2 px-5 py-3 rounded-full bg-primary text-primary-foreground font-semibold shadow-glow", children: [
        /* @__PURE__ */ jsx(Plus, { size: 18 }),
        " Create memory"
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs(motion.div, { initial: {
      opacity: 0,
      y: 12
    }, animate: {
      opacity: 1,
      y: 0
    }, transition: {
      duration: 0.5,
      delay: 0.1
    }, className: "relative mb-8", children: [
      /* @__PURE__ */ jsx(Search, { size: 18, className: "absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" }),
      /* @__PURE__ */ jsx("input", { value: q, onChange: (e) => setQ(e.target.value), placeholder: "Search by title, content, or date…", className: "w-full pl-11 pr-4 py-3.5 rounded-2xl glass border border-border focus:border-primary focus:ring-2 focus:ring-ring outline-none transition-all" })
    ] }),
    /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: isLoading ? /* @__PURE__ */ jsx(SkeletonGrid, {}, "skeleton") : filtered.length === 0 ? /* @__PURE__ */ jsx(EmptyState, { hasEntries: entries.length > 0 }, "empty") : /* @__PURE__ */ jsx(motion.div, { initial: "hidden", animate: "show", variants: {
      show: {
        transition: {
          staggerChildren: 0.06
        }
      }
    }, className: "grid sm:grid-cols-2 gap-5", children: filtered.map((entry) => /* @__PURE__ */ jsx(motion.div, { variants: {
      hidden: {
        opacity: 0,
        y: 20,
        scale: 0.97
      },
      show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: 0.5
        }
      }
    }, whileHover: {
      y: -6,
      transition: {
        duration: 0.2
      }
    }, children: /* @__PURE__ */ jsxs(Link, { to: "/entries/$id", params: {
      id: entry.id
    }, className: "group block glass rounded-2xl p-6 transition-shadow hover:divine-glow h-full", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-3 text-xs uppercase tracking-widest text-muted-foreground", children: [
        /* @__PURE__ */ jsx("span", { children: new Date(entry.created_at).toLocaleDateString(void 0, {
          dateStyle: "long"
        }) }),
        /* @__PURE__ */ jsx("span", { children: new Date(entry.created_at).toLocaleTimeString(void 0, {
          hour: "2-digit",
          minute: "2-digit"
        }) })
      ] }),
      /* @__PURE__ */ jsx("h3", { className: "font-display text-2xl mb-2 group-hover:text-primary transition-colors line-clamp-2", children: entry.title || "Untitled" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground line-clamp-3 leading-relaxed", children: entry.content || "—" })
    ] }) }, entry.id)) }, "grid") })
  ] }) });
}
function SkeletonGrid() {
  return /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 gap-5", children: Array.from({
    length: 4
  }).map((_, i) => /* @__PURE__ */ jsxs("div", { className: "glass rounded-2xl p-6 animate-pulse", children: [
    /* @__PURE__ */ jsx("div", { className: "h-3 w-32 bg-muted/40 rounded mb-4" }),
    /* @__PURE__ */ jsx("div", { className: "h-6 w-3/4 bg-muted/40 rounded mb-3" }),
    /* @__PURE__ */ jsx("div", { className: "h-3 w-full bg-muted/30 rounded mb-2" }),
    /* @__PURE__ */ jsx("div", { className: "h-3 w-5/6 bg-muted/30 rounded" })
  ] }, i)) });
}
function EmptyState({
  hasEntries
}) {
  return /* @__PURE__ */ jsxs(motion.div, { initial: {
    opacity: 0,
    scale: 0.96
  }, animate: {
    opacity: 1,
    scale: 1
  }, transition: {
    duration: 0.5
  }, className: "glass rounded-3xl p-12 text-center", children: [
    /* @__PURE__ */ jsx("div", { className: "mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-5 animate-pulse-glow", children: /* @__PURE__ */ jsx(Feather, { size: 26, className: "text-primary" }) }),
    /* @__PURE__ */ jsx("h3", { className: "font-display text-2xl mb-2", children: hasEntries ? "No memories match your search" : "Your diary awaits its first breath" }),
    /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-6 max-w-md mx-auto", children: hasEntries ? "Try another word, or a date." : "Write your first entry and begin a quiet record of your days." }),
    !hasEntries && /* @__PURE__ */ jsxs(Link, { to: "/new", className: "inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold shadow-glow hover-lift", children: [
      /* @__PURE__ */ jsx(Plus, { size: 18 }),
      " Write the first entry"
    ] })
  ] });
}
export {
  Dashboard as component
};
