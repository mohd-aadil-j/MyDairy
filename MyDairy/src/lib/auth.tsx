import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

interface User { id: string; email: string }

interface AuthCtx {
  user: User | null;
  session: any | null;
  loading: boolean;
  refreshSession: () => Promise<void>;
  signOut: () => Promise<void>;
}

const Ctx = createContext<AuthCtx | null>(null);

async function fetchSession() {
  const res = await fetch('/api/auth/session', { credentials: 'same-origin' });
  if (!res.ok) return null;
  const data = await res.json();
  return data;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetchSession()
      .then((data) => {
        if (!mounted) return;
        setSession(data);
        setLoading(false);
      })
      .catch(() => {
        if (!mounted) return;
        setSession(null);
        setLoading(false);
      });
    return () => { mounted = false; };
  }, []);

  const refreshSession = async () => {
    setLoading(true);
    try {
      const data = await fetchSession();
      setSession(data);
    } catch {
      setSession(null);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    await fetch('/api/auth/logout', { method: 'POST', credentials: 'same-origin' });
    setSession(null);
  };

  return (
    <Ctx.Provider value={{ user: session?.user ?? null, session, loading, refreshSession, signOut }}>
      {children}
    </Ctx.Provider>
  );
}

export function useAuth() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useAuth must be used within AuthProvider");
  return c;
}
