import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Navbar } from "@/components/Navbar";
import { ThemeOrnament } from "@/components/ornaments";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Begin your diary — My Diary" },
      { name: "description", content: "Create a private digital diary." },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true); setErr(""); setMsg("");
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) { setErr(data?.error || 'Signup failed'); return; }
    router.navigate({ to: "/dashboard" });
  };

  return (
    <div className="min-h-screen shiva-page-bg shiva-signup-bg">
      <Navbar />
      <div className="relative flex items-center justify-start pl-6 py-20 min-h-[calc(100vh-4rem)]">
        <ThemeOrnament className="absolute top-16 right-12 w-44 h-44 opacity-20 animate-slow-spin" />
        <ThemeOrnament className="absolute bottom-12 left-12 w-36 h-36 opacity-20 animate-slow-spin" />

        <div className="w-full max-w-md glass rounded-3xl p-8 sm:p-10 shadow-card divine-glow animate-fade-up">
          <h1 className="font-display text-3xl mb-2">Begin your diary</h1>
          <p className="text-sm text-muted-foreground mb-8">A quiet space, just for you.</p>

          <form onSubmit={onSubmit} className="space-y-4">
            <label className="block">
              <span className="text-xs uppercase tracking-widest text-muted-foreground">Email</span>
              <input
                type="email" required value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1.5 w-full px-4 py-3 rounded-xl bg-input/60 border border-border focus:border-primary focus:ring-2 focus:ring-ring outline-none transition-all"
              />
            </label>
            <label className="block">
              <span className="text-xs uppercase tracking-widest text-muted-foreground">Password</span>
              <input
                type="password" required minLength={6} value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1.5 w-full px-4 py-3 rounded-xl bg-input/60 border border-border focus:border-primary focus:ring-2 focus:ring-ring outline-none transition-all"
              />
              <span className="block mt-1 text-xs text-muted-foreground">At least 6 characters.</span>
            </label>

            {err && <p className="text-sm text-destructive">{err}</p>}
            {msg && <p className="text-sm text-primary">{msg}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-foreground font-semibold shadow-glow hover:opacity-95 disabled:opacity-60 transition-all"
            >
              {loading && <Loader2 size={16} className="animate-spin" />}
              Create my diary
            </button>
          </form>

          <p className="text-sm text-center text-muted-foreground mt-6">
            Already have one?{" "}
            <Link to="/login" className="text-primary hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
