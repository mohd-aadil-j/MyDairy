import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import { N as Navbar } from "./Navbar-D3Sx34jV.js";
import { M as Mandala } from "./Mandala-5O4Yr9lK.js";
import { u as useTheme } from "./router-DkXFKk_H.js";
import { Sparkles, ArrowRight, Lock, Search } from "lucide-react";
import "./ornaments-FHn_0iDx.js";
import "@tanstack/react-query";
const fadeUp = {
  hidden: {
    opacity: 0,
    y: 28
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 0.8, 0.2, 1]
    }
  }
};
function Landing() {
  const {
    theme,
    setTheme
  } = useTheme();
  const heroRef = useRef(null);
  const {
    scrollYProgress
  } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const parallaxOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsxs("section", { ref: heroRef, className: "relative max-w-6xl mx-auto px-6 pt-20 pb-32 text-center", children: [
      /* @__PURE__ */ jsx(motion.div, { style: {
        y: parallaxY,
        opacity: parallaxOpacity
      }, className: "absolute inset-x-0 -top-10 flex justify-center pointer-events-none", children: /* @__PURE__ */ jsx(Mandala, { size: 520, className: "opacity-25" }) }),
      /* @__PURE__ */ jsxs(motion.div, { variants: {
        show: {
          transition: {
            staggerChildren: 0.12
          }
        }
      }, initial: "hidden", animate: "show", className: "relative", children: [
        /* @__PURE__ */ jsxs(motion.span, { variants: fadeUp, className: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs uppercase tracking-[0.2em] mb-8", children: [
          /* @__PURE__ */ jsx(Sparkles, { size: 13, className: "text-primary" }),
          " A sacred journal"
        ] }),
        /* @__PURE__ */ jsxs(motion.h1, { variants: fadeUp, className: "font-display text-5xl sm:text-6xl md:text-7xl leading-[1.05] mb-6", children: [
          "Memories,",
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("span", { className: "text-gradient", children: "held in stillness." })
        ] }),
        /* @__PURE__ */ jsx(motion.p, { variants: fadeUp, className: "text-lg text-muted-foreground max-w-xl mx-auto mb-10", children: "My Diary is a private digital sanctuary — write, search, and return to the moments that shape you. Choose your light: the devotion of Krishna or the calm of Shiva." }),
        /* @__PURE__ */ jsxs(motion.div, { variants: fadeUp, className: "flex flex-wrap items-center justify-center gap-3", children: [
          /* @__PURE__ */ jsx(Link, { to: "/signup", children: /* @__PURE__ */ jsxs(motion.span, { whileHover: {
            scale: 1.04,
            boxShadow: "0 0 60px var(--glow)"
          }, whileTap: {
            scale: 0.97
          }, className: "group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold shadow-glow", children: [
            "Begin your diary",
            /* @__PURE__ */ jsx(ArrowRight, { size: 18, className: "transition-transform group-hover:translate-x-1" })
          ] }) }),
          /* @__PURE__ */ jsx(Link, { to: "/login", children: /* @__PURE__ */ jsx(motion.span, { whileHover: {
            scale: 1.04
          }, whileTap: {
            scale: 0.97
          }, className: "inline-flex items-center gap-2 px-7 py-3.5 rounded-full glass font-medium", children: "I already have one" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsx(motion.div, { initial: {
        opacity: 0,
        y: 40,
        rotateX: 8
      }, animate: {
        opacity: 1,
        y: 0,
        rotateX: 0
      }, transition: {
        delay: 0.4,
        duration: 0.9,
        ease: [0.22, 0.8, 0.2, 1]
      }, whileHover: {
        y: -6
      }, className: "mt-24 max-w-2xl mx-auto", style: {
        perspective: 1e3
      }, children: /* @__PURE__ */ jsxs("div", { className: "glass rounded-3xl p-8 sm:p-10 shadow-card divine-glow text-left animate-pulse-glow", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4 text-xs uppercase tracking-widest text-muted-foreground", children: [
          /* @__PURE__ */ jsx("span", { children: "Today · Evening" }),
          /* @__PURE__ */ jsx("span", { className: "text-primary", children: theme === "krishna" ? "Krishna Mode" : "Shiva Mode" })
        ] }),
        /* @__PURE__ */ jsx("h3", { className: "font-display text-3xl mb-3", children: "The flute by the river" }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed", children: "I sat where the water meets the stones, and for a moment the world was only sound — wind, water, breath. Some memories deserve a soft place to rest." })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "max-w-6xl mx-auto px-6 pb-24", children: [
      /* @__PURE__ */ jsxs(motion.div, { initial: {
        opacity: 0,
        y: 20
      }, whileInView: {
        opacity: 1,
        y: 0
      }, viewport: {
        once: true,
        margin: "-80px"
      }, transition: {
        duration: 0.6
      }, className: "text-center mb-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-display text-4xl sm:text-5xl mb-3", children: "Two paths. One stillness." }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Switch anytime. Your memories carry across." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 gap-6", children: [{
        id: "krishna",
        title: "Krishna Mode",
        body: "Peacock greens, deep blues, gold and soft violet. Flute-soft and devotional.",
        tag: "Peace · Devotion · Memory",
        grad: "linear-gradient(135deg, oklch(0.55 0.15 175), oklch(0.82 0.16 85), oklch(0.65 0.18 300))"
      }, {
        id: "shiva",
        title: "Shiva Mode",
        body: "Cosmic indigos, moon white and cyan glow. Meditative and quietly powerful.",
        tag: "Cosmos · Calm · Power",
        grad: "linear-gradient(135deg, oklch(0.10 0.03 270), oklch(0.40 0.15 270), oklch(0.78 0.16 200))"
      }].map((opt, i) => /* @__PURE__ */ jsxs(motion.button, { onClick: () => setTheme(opt.id), initial: {
        opacity: 0,
        y: 30
      }, whileInView: {
        opacity: 1,
        y: 0
      }, viewport: {
        once: true,
        margin: "-50px"
      }, transition: {
        duration: 0.6,
        delay: i * 0.1
      }, whileHover: {
        y: -6
      }, className: `group text-left p-8 rounded-3xl glass transition-all ${theme === opt.id ? "divine-glow ring-1 ring-primary/40" : ""}`, children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-5", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-display text-2xl", children: opt.title }),
          /* @__PURE__ */ jsx(motion.div, { whileHover: {
            rotate: 180,
            scale: 1.1
          }, transition: {
            duration: 1.2
          }, className: "w-16 h-16 rounded-full", style: {
            background: opt.grad
          } })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mb-4", children: opt.body }),
        /* @__PURE__ */ jsx("span", { className: "text-xs text-primary uppercase tracking-widest", children: opt.tag })
      ] }, opt.id)) }),
      /* @__PURE__ */ jsx("div", { className: "mt-16 grid sm:grid-cols-3 gap-4", children: [{
        icon: Lock,
        title: "Private by design",
        body: "Only you can read your entries. Every memory stays yours."
      }, {
        icon: Sparkles,
        title: "Elegant to write in",
        body: "A spacious, distraction-free canvas."
      }, {
        icon: Search,
        title: "Find any moment",
        body: "Search by title, content, or date in an instant."
      }].map((f, i) => /* @__PURE__ */ jsxs(motion.div, { initial: {
        opacity: 0,
        y: 20
      }, whileInView: {
        opacity: 1,
        y: 0
      }, viewport: {
        once: true
      }, transition: {
        duration: 0.5,
        delay: i * 0.08
      }, whileHover: {
        y: -4,
        transition: {
          duration: 0.2
        }
      }, className: "glass rounded-2xl p-6", children: [
        /* @__PURE__ */ jsx(f.icon, { size: 22, className: "text-primary mb-3" }),
        /* @__PURE__ */ jsx("h4", { className: "font-display text-lg mb-1", children: f.title }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: f.body })
      ] }, f.title)) })
    ] }),
    /* @__PURE__ */ jsx("footer", { className: "border-t border-border/40 py-8 text-center text-sm text-muted-foreground", children: /* @__PURE__ */ jsx("p", { children: "Made with stillness · My Diary" }) })
  ] });
}
export {
  Landing as component
};
