import { createFileRoute, Outlet, redirect, useLocation, useRouter } from "@tanstack/react-router";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { Navbar } from "@/components/Navbar";
import { LoadingScreen } from "@/components/LoadingScreen";
import { PageTransition } from "@/components/PageTransition";

export const Route = createFileRoute("/_app")({
  beforeLoad: async () => {
    if (typeof window === "undefined") return;
    try {
      const res = await fetch('/api/auth/session', { credentials: 'same-origin' });
      const data = await res.json();
      if (!data?.user) {
        throw redirect({ to: "/login" });
      }
    } catch (e) {
      throw redirect({ to: "/login" });
    }
  },
  component: AppLayout,
});

function AppLayout() {
  const { loading, user } = useAuth();
  const location = useLocation();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.navigate({ to: '/login' });
    }
  }, [loading, user, router]);

  if (loading) return <LoadingScreen />;
  if (!user) return null;

  return (
    <div className="min-h-screen">
      <Navbar />
      <AnimatePresence mode="wait">
        <PageTransition key={location.pathname}>
          <Outlet />
        </PageTransition>
      </AnimatePresence>
    </div>
  );
}
