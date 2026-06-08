import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { Mandala } from "@/components/Mandala";
import { useTheme } from "@/lib/theme";
import { ArrowRight, Sparkles, Lock, Search } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "My Diary — A sacred space for your memories" },
      { name: "description", content: "A private digital diary with two spiritual themes — Krishna and Shiva. Store, search, and revisit your memories." },
    ],
  }),
  component: Landing,
});

import type { Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 0.8, 0.2, 1] as [number, number, number, number] } },
};

function Landing() {
  const { theme, setTheme } = useTheme();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const parallaxOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="min-h-screen shiva-page-bg shiva-landing-bg krishna-page-bg krishna-landing-bg">
      <Navbar />

      {/* Hero */}
      <section ref={heroRef} className="relative max-w-6xl mx-auto px-6 pt-20 pb-32 text-center">
        <motion.div style={{ y: parallaxY, opacity: parallaxOpacity }} className="absolute inset-x-0 -top-10 flex justify-center pointer-events-none">
          <Mandala size={520} className="opacity-25" />
        </motion.div>

        <motion.div
          variants={{ show: { transition: { staggerChildren: 0.12 } } }}
          initial="hidden"
          animate="show"
          className="relative"
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs uppercase tracking-[0.2em] mb-8"
          >
            <Sparkles size={13} className="text-primary" /> A sacred journal
          </motion.span>

          <motion.h1 variants={fadeUp} className="font-display text-5xl sm:text-6xl md:text-7xl leading-[1.05] uppercase mb-6">
            Memories,<br />
            <span className="text-gradient">held in stillness.</span>
          </motion.h1>  

          <motion.p variants={fadeUp} className="text-lg text-muted-foreground max-w-xl mx-auto mb-10">
            My Diary is a private digital sanctuary — write, search, and return to the moments that shape you.
            Choose your light: the devotion of Krishna or the calm of Shiva.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-3">
            <Link to="/signup">
              <motion.span
                whileHover={{ scale: 1.04, boxShadow: "0 0 60px var(--glow)" }}
                whileTap={{ scale: 0.97 }}
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold shadow-glow"
              >
                Begin your diary
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </motion.span>
            </Link>
            <Link to="/login">
              <motion.span
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full glass font-medium"
              >
                I already have one
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Floating preview card */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: 8 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 0.8, 0.2, 1] }}
          whileHover={{ y: -6 }}
          className="mt-24 max-w-2xl mx-auto"
          style={{ perspective: 1000 }}
        >
          <div className="glass rounded-3xl p-8 sm:p-10 shadow-card divine-glow text-left animate-pulse-glow">
            <div className="flex items-center justify-between mb-4 text-xs uppercase tracking-widest text-muted-foreground">
              <span>Today · Evening</span>
              <span className="text-primary">{theme === "krishna" ? "Krishna Mode" : "Shiva Mode"}</span>
            </div>
            <h3 className="font-display text-3xl mb-3">The flute by the river</h3>
            <p className="text-muted-foreground leading-relaxed">
              I sat where the water meets the stones, and for a moment the world was only sound — wind, water, breath.
              Some memories deserve a soft place to rest.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Theme preview */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl sm:text-5xl mb-3">Two paths. One stillness.</h2>
          <p className="text-muted-foreground">Switch anytime. Your memories carry across.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {([
            { id: "krishna", title: "Krishna Mode", body: "Peacock greens, deep blues, gold and soft violet. Flute-soft and devotional.", tag: "Peace · Devotion · Memory", grad: "linear-gradient(135deg, oklch(0.55 0.15 175), oklch(0.82 0.16 85), oklch(0.65 0.18 300))" },
            { id: "shiva", title: "Shiva Mode", body: "Cosmic indigos, moon white and cyan glow. Meditative and quietly powerful.", tag: "Cosmos · Calm · Power", grad: "linear-gradient(135deg, oklch(0.10 0.03 270), oklch(0.40 0.15 270), oklch(0.78 0.16 200))" },
          ] as Array<{
            id: "krishna" | "shiva";
            title: string;
            body: string;
            tag: string;
            grad: string;
            image?: string;
          }>).map((opt, i) => (
            <motion.button
              key={opt.id}
              onClick={() => setTheme(opt.id)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className={`group text-left p-8 rounded-3xl glass transition-all ${
                theme === opt.id ? "divine-glow ring-1 ring-primary/40" : ""
              }`}
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-display text-2xl">{opt.title}</h3>
                <motion.div
                  whileHover={{ rotate: 180, scale: 1.1 }}
                  transition={{ duration: 1.2 }}
                  className="w-16 h-16 rounded-full"
                  style={{ background: opt.grad }}
                />
              </div>
              <p className="text-sm text-muted-foreground mb-4">{opt.body}</p>
              <span className="text-xs text-primary uppercase tracking-widest">{opt.tag}</span>
            </motion.button>
          ))}
        </div>

        {/* Features */}
        <div className="mt-16 grid sm:grid-cols-3 gap-4">
          {[
            { icon: Lock, title: "Private by design", body: "Only you can read your entries. Every memory stays yours." },
            { icon: Sparkles, title: "Elegant to write in", body: "A spacious, distraction-free canvas." },
            { icon: Search, title: "Find any moment", body: "Search by title, content, or date in an instant." },
          ].map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="glass rounded-2xl p-6"
            >
              <f.icon size={22} className="text-primary mb-3" />
              <h4 className="font-display text-lg mb-1">{f.title}</h4>
              <p className="text-sm text-muted-foreground">{f.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <footer className="border-t border-border/40 py-8 text-center text-sm text-muted-foreground">
        <p>Made with stillness · My Diary</p>
      </footer>
    </div>
  );
}
