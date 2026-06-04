import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/lib/auth";
import { ThemeOrnament } from "@/components/ornaments";
import { Mandala } from "@/components/Mandala";
import { Plus, Search, Feather } from "lucide-react";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({ meta: [{ title: "Your memories — My Diary" }] }),
  component: Dashboard,
});

interface Entry {
  id: string;
  title: string;
  content: string;
  created_at: string;
}

function Dashboard() {
  const { user } = useAuth();
  const [q, setQ] = useState("");

  const { data: entries = [], isLoading } = useQuery({
    queryKey: ["entries", user?.id],
    queryFn: async () => {
      const res = await fetch('/api/entries', { credentials: 'same-origin' });
      if (!res.ok) throw new Error('Failed to load entries');
      const data = await res.json();
      return data as Entry[];
    },
    enabled: !!user,
  });

  const filtered = useMemo(() => {
    if (!q.trim()) return entries;
    const needle = q.toLowerCase();
    return entries.filter((e) => {
      const dateStr = new Date(e.created_at).toLocaleDateString(undefined, { dateStyle: "long" }).toLowerCase();
      return (
        e.title.toLowerCase().includes(needle) ||
        e.content.toLowerCase().includes(needle) ||
        dateStr.includes(needle)
      );
    });
  }, [entries, q]);

  return (
    <div className="min-h-screen shiva-page-bg shiva-dashboard-bg">
      <main className="relative max-w-5xl mx-auto px-6 py-12">
        <div className="absolute top-[-40px] right-[-40px] pointer-events-none opacity-30">
          <Mandala size={260} />
        </div>
      <ThemeOrnament className="absolute top-0 left-0 w-32 h-32 opacity-10 animate-slow-spin pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 relative"
      >
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-2">Your sanctuary</p>
          <h1 className="font-display text-4xl sm:text-5xl">
            <span className="text-gradient">Memories</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            {entries.length} {entries.length === 1 ? "entry" : "entries"} · {new Date().toLocaleDateString(undefined, { dateStyle: "long" })}
          </p>
        </div>
        <Link to="/new">
          <motion.span
            whileHover={{ scale: 1.05, boxShadow: "0 0 50px var(--glow)" }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-primary text-primary-foreground font-semibold shadow-glow"
          >
            <Plus size={18} /> Create memory
          </motion.span>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative mb-8"
      >
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by title, content, or date…"
          className="w-full pl-11 pr-4 py-3.5 rounded-2xl glass border border-border focus:border-primary focus:ring-2 focus:ring-ring outline-none transition-all"
        />
      </motion.div>

      <AnimatePresence mode="wait">
        {isLoading ? (
          <SkeletonGrid key="skeleton" />
        ) : filtered.length === 0 ? (
          <EmptyState key="empty" hasEntries={entries.length > 0} />
        ) : (
          <motion.div
            key="grid"
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.06 } } }}
            className="grid sm:grid-cols-2 gap-5"
          >
            {filtered.map((entry) => (
              <motion.div
                key={entry.id}
                variants={{
                  hidden: { opacity: 0, y: 20, scale: 0.97 },
                  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } },
                }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
              >
                <Link
                  to="/entries/$id"
                  params={{ id: entry.id }}
                  className="group block glass rounded-2xl p-6 transition-shadow hover:divine-glow h-full"
                >
                  <div className="flex items-center justify-between mb-3 text-xs uppercase tracking-widest text-muted-foreground">
                    <span>{new Date(entry.created_at).toLocaleDateString(undefined, { dateStyle: "long" })}</span>
                    <span>{new Date(entry.created_at).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}</span>
                  </div>
                  <h3 className="font-display text-2xl mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {entry.title || "Untitled"}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                    {entry.content || "—"}
                  </p>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  </div>
  );
}

function SkeletonGrid() {
  return (
    <div className="grid sm:grid-cols-2 gap-5">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="glass rounded-2xl p-6 animate-pulse">
          <div className="h-3 w-32 bg-muted/40 rounded mb-4" />
          <div className="h-6 w-3/4 bg-muted/40 rounded mb-3" />
          <div className="h-3 w-full bg-muted/30 rounded mb-2" />
          <div className="h-3 w-5/6 bg-muted/30 rounded" />
        </div>
      ))}
    </div>
  );
}

function EmptyState({ hasEntries }: { hasEntries: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="glass rounded-3xl p-12 text-center"
    >
      <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-5 animate-pulse-glow">
        <Feather size={26} className="text-primary" />
      </div>
      <h3 className="font-display text-2xl mb-2">
        {hasEntries ? "No memories match your search" : "Your diary awaits its first breath"}
      </h3>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        {hasEntries
          ? "Try another word, or a date."
          : "Write your first entry and begin a quiet record of your days."}
      </p>
      {!hasEntries && (
        <Link
          to="/new"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold shadow-glow hover-lift"
        >
          <Plus size={18} /> Write the first entry
        </Link>
      )}
    </motion.div>
  );
}
