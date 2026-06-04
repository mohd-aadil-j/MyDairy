import { createFileRoute, Link, useRouter, redirect } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Navbar } from "@/components/Navbar";
import { ThemeOrnament } from "@/components/ornaments";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — My Diary" },
      { name: "description", content: "Sign in to your private diary." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true); setErr("");
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) { setErr(data?.error || 'Login failed'); return; }
    router.navigate({ to: "/dashboard" });
  };

  return (
    <div className="min-h-screen shiva-page-bg shiva-login-bg">
      <Navbar />
      <div className="relative flex items-center justify-end pr-6 py-20 min-h-[calc(100vh-4rem)]">
        <ThemeOrnament className="absolute top-10 left-10 w-40 h-40 opacity-20 animate-slow-spin" />
        <ThemeOrnament className="absolute bottom-10 right-10 w-48 h-48 opacity-20 animate-slow-spin" />

        <div className="w-full max-w-md glass rounded-3xl p-8 sm:p-10 shadow-card divine-glow animate-fade-up">
          <h1 className="font-display text-3xl mb-2">Welcome back</h1>
          <p className="text-sm text-muted-foreground mb-8">Step quietly into your sanctuary.</p>

          <form onSubmit={onSubmit} className="space-y-4">
            <Field label="Email" type="email" value={email} onChange={setEmail} required />
            <Field label="Password" type="password" value={password} onChange={setPassword} required />

            {err && <p className="text-sm text-destructive">{err}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-foreground font-semibold shadow-glow hover:opacity-95 disabled:opacity-60 transition-all"
            >
              {loading && <Loader2 size={16} className="animate-spin" />}
              Sign in
            </button>
          </form>

          <p className="text-sm text-center text-muted-foreground mt-6">
            New here?{" "}
            <Link to="/signup" className="text-primary hover:underline">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function Field({ label, type, value, onChange, required }: { label: string; type: string; value: string; onChange: (v: string) => void; required?: boolean }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-widest text-muted-foreground">{label}</span>
      <input
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full px-4 py-3 rounded-xl bg-input/60 border border-border focus:border-primary focus:ring-2 focus:ring-ring outline-none transition-all"
      />
    </label>
  );
}

export { redirect };
