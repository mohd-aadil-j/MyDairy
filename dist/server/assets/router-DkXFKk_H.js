import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Link, Outlet, HeadContent, Scripts, createFileRoute, lazyRouteComponent, redirect, createRouter } from "@tanstack/react-router";
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useState, useEffect, createContext, useContext } from "react";
const appCss = "/assets/styles-CcWgjfvm.css";
const ThemeContext = createContext(null);
const STORAGE_KEY = "my-diary-theme";
function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState("krishna");
  useEffect(() => {
    const stored = typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY);
    if (stored === "krishna" || stored === "shiva") setThemeState(stored);
  }, []);
  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    root.classList.remove("krishna", "shiva");
    root.classList.add(theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);
  const setTheme = (t) => setThemeState(t);
  const toggle = () => setThemeState((t) => t === "krishna" ? "shiva" : "krishna");
  return /* @__PURE__ */ jsx(ThemeContext.Provider, { value: { theme, setTheme, toggle }, children });
}
function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
const Ctx = createContext(null);
function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let mounted = true;
    fetch("/api/auth/session", { credentials: "same-origin" }).then((r) => r.json()).then((data) => {
      if (!mounted) return;
      setSession(data);
      setLoading(false);
    }).catch(() => {
      if (!mounted) return;
      setSession(null);
      setLoading(false);
    });
    return () => {
      mounted = false;
    };
  }, []);
  const signOut = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setSession(null);
  };
  return /* @__PURE__ */ jsx(Ctx.Provider, { value: { user: session?.user ?? null, session, loading, signOut }, children });
}
function useAuth() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useAuth must be used within AuthProvider");
  return c;
}
function ParticleField({ count = 24 }) {
  const { theme } = useTheme();
  const [particles, setParticles] = useState([]);
  useEffect(() => {
    setParticles(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: Math.random() * 6 + 2,
        duration: Math.random() * 18 + 14,
        delay: Math.random() * 20
      }))
    );
  }, [count]);
  return /* @__PURE__ */ jsx("div", { className: "pointer-events-none fixed inset-0 overflow-hidden -z-10", children: particles.map((p) => /* @__PURE__ */ jsx(
    "span",
    {
      className: "absolute rounded-full animate-float",
      style: {
        left: `${p.left}%`,
        bottom: `-${p.size}px`,
        width: p.size,
        height: p.size,
        background: theme === "krishna" ? "radial-gradient(circle, oklch(0.85 0.17 85 / 0.9), oklch(0.85 0.17 85 / 0))" : "radial-gradient(circle, oklch(0.88 0.10 220 / 0.9), oklch(0.78 0.16 200 / 0))",
        boxShadow: theme === "krishna" ? "0 0 12px oklch(0.85 0.17 85 / 0.8)" : "0 0 14px oklch(0.78 0.16 200 / 0.8)",
        animationDuration: `${p.duration}s`,
        animationDelay: `${p.delay}s`
      }
    },
    p.id
  )) });
}
function ThemeAura() {
  const { theme } = useTheme();
  return /* @__PURE__ */ jsx("div", { className: "pointer-events-none fixed inset-0 -z-20 overflow-hidden", children: theme === "krishna" ? /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute -top-40 -left-40 w-[40rem] h-[40rem] rounded-full opacity-30 blur-3xl animate-drift",
        style: { background: "radial-gradient(circle, oklch(0.55 0.15 175 / 0.6), transparent 60%)" }
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute top-1/3 -right-32 w-[36rem] h-[36rem] rounded-full opacity-30 blur-3xl animate-drift",
        style: { background: "radial-gradient(circle, oklch(0.82 0.16 85 / 0.5), transparent 60%)", animationDelay: "4s" }
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute -bottom-32 left-1/3 w-[32rem] h-[32rem] rounded-full opacity-25 blur-3xl animate-drift",
        style: { background: "radial-gradient(circle, oklch(0.65 0.18 300 / 0.5), transparent 60%)", animationDelay: "8s" }
      }
    )
  ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute top-10 right-10 w-32 h-32 rounded-full opacity-90",
        style: {
          background: "radial-gradient(circle at 35% 35%, oklch(0.96 0.02 230), oklch(0.78 0.08 230) 60%, transparent 72%)",
          boxShadow: "0 0 80px oklch(0.88 0.10 220 / 0.5), 0 0 160px oklch(0.78 0.16 200 / 0.3)"
        }
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute -top-32 -left-32 w-[44rem] h-[44rem] rounded-full opacity-40 blur-3xl animate-drift",
        style: { background: "radial-gradient(circle, oklch(0.40 0.15 270 / 0.7), transparent 60%)" }
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute bottom-0 right-0 w-[40rem] h-[40rem] rounded-full opacity-30 blur-3xl animate-drift",
        style: { background: "radial-gradient(circle, oklch(0.78 0.16 200 / 0.4), transparent 60%)", animationDelay: "6s" }
      }
    )
  ] }) });
}
function NotFound() {
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center px-4", children: /* @__PURE__ */ jsxs("div", { className: "text-center glass rounded-3xl p-12 max-w-md", children: [
    /* @__PURE__ */ jsx("h1", { className: "font-display text-6xl text-gradient mb-2", children: "404" }),
    /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-6", children: "This page drifted into the cosmos." }),
    /* @__PURE__ */ jsx(Link, { to: "/", className: "inline-block px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-medium shadow-glow", children: "Return Home" })
  ] }) });
}
function ErrorView({ error }) {
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center px-4", children: /* @__PURE__ */ jsxs("div", { className: "glass rounded-3xl p-10 max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "font-display text-2xl mb-2", children: "Something went still." }),
    /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: error.message })
  ] }) });
}
const Route$7 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "My Diary — A sacred space for your memories" },
      { name: "description", content: "A private digital diary to store, search, and revisit your memories — wrapped in two spiritual themes." },
      { property: "og:title", content: "My Diary" },
      { property: "og:description", content: "A sacred space for your memories." },
      { property: "og:type", content: "website" }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Cinzel:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap"
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFound,
  errorComponent: ErrorView
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", className: "krishna", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$7.useRouteContext();
  return /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsx(ThemeProvider, { children: /* @__PURE__ */ jsxs(AuthProvider, { children: [
    /* @__PURE__ */ jsx(ThemeAura, {}),
    /* @__PURE__ */ jsx(ParticleField, {}),
    /* @__PURE__ */ jsx(Outlet, {})
  ] }) }) });
}
const $$splitComponentImporter$6 = () => import("./signup-7uLyF0A9.js");
const Route$6 = createFileRoute("/signup")({
  head: () => ({
    meta: [{
      title: "Begin your diary — My Diary"
    }, {
      name: "description",
      content: "Create a private digital diary."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./login-rvn7YXJi.js");
const Route$5 = createFileRoute("/login")({
  head: () => ({
    meta: [{
      title: "Sign in — My Diary"
    }, {
      name: "description",
      content: "Sign in to your private diary."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./_app-CyW4mnsR.js");
const Route$4 = createFileRoute("/_app")({
  beforeLoad: async () => {
    if (typeof window === "undefined") return;
    try {
      const res = await fetch("/api/auth/session", {
        credentials: "same-origin"
      });
      const data = await res.json();
      if (!data?.user) {
        throw redirect({
          to: "/login"
        });
      }
    } catch (e) {
      throw redirect({
        to: "/login"
      });
    }
  },
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./index-CFab3WHy.js");
const Route$3 = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "My Diary — A sacred space for your memories"
    }, {
      name: "description",
      content: "A private digital diary with two spiritual themes — Krishna and Shiva. Store, search, and revisit your memories."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./new-C4ryzXMZ.js");
const Route$2 = createFileRoute("/_app/new")({
  head: () => ({
    meta: [{
      title: "New memory — My Diary"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./dashboard-C7q46jQF.js");
const Route$1 = createFileRoute("/_app/dashboard")({
  head: () => ({
    meta: [{
      title: "Your memories — My Diary"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./_id-uZydqdJw.js");
const Route = createFileRoute("/_app/entries/$id")({
  head: () => ({
    meta: [{
      title: "Memory — My Diary"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const SignupRoute = Route$6.update({
  id: "/signup",
  path: "/signup",
  getParentRoute: () => Route$7
});
const LoginRoute = Route$5.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$7
});
const AppRoute = Route$4.update({
  id: "/_app",
  getParentRoute: () => Route$7
});
const IndexRoute = Route$3.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$7
});
const AppNewRoute = Route$2.update({
  id: "/new",
  path: "/new",
  getParentRoute: () => AppRoute
});
const AppDashboardRoute = Route$1.update({
  id: "/dashboard",
  path: "/dashboard",
  getParentRoute: () => AppRoute
});
const AppEntriesIdRoute = Route.update({
  id: "/entries/$id",
  path: "/entries/$id",
  getParentRoute: () => AppRoute
});
const AppRouteChildren = {
  AppDashboardRoute,
  AppNewRoute,
  AppEntriesIdRoute
};
const AppRouteWithChildren = AppRoute._addFileChildren(AppRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  AppRoute: AppRouteWithChildren,
  LoginRoute,
  SignupRoute
};
const routeTree = Route$7._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route as R,
  useAuth as a,
  router as r,
  useTheme as u
};
