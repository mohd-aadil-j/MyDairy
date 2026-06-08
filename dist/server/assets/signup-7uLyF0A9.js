import { jsxs, jsx } from "react/jsx-runtime";
import { useRouter, Link } from "@tanstack/react-router";
import { useState } from "react";
import { N as Navbar } from "./Navbar-D3Sx34jV.js";
import { T as ThemeOrnament } from "./ornaments-FHn_0iDx.js";
import { Loader2 } from "lucide-react";
import "framer-motion";
import "./router-DkXFKk_H.js";
import "@tanstack/react-query";
function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr("");
    setMsg("");
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      credentials: "same-origin",
      body: JSON.stringify({
        email,
        password
      })
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setErr(data?.error || "Signup failed");
      return;
    }
    router.navigate({
      to: "/dashboard"
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen shiva-page-bg shiva-signup-bg", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsxs("div", { className: "relative flex items-center justify-start pl-6 py-20 min-h-[calc(100vh-4rem)]", children: [
      /* @__PURE__ */ jsx(ThemeOrnament, { className: "absolute top-16 right-12 w-44 h-44 opacity-20 animate-slow-spin" }),
      /* @__PURE__ */ jsx(ThemeOrnament, { className: "absolute bottom-12 left-12 w-36 h-36 opacity-20 animate-slow-spin" }),
      /* @__PURE__ */ jsxs("div", { className: "w-full max-w-md glass rounded-3xl p-8 sm:p-10 shadow-card divine-glow animate-fade-up", children: [
        /* @__PURE__ */ jsx("h1", { className: "font-display text-3xl mb-2", children: "Begin your diary" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mb-8", children: "A quiet space, just for you." }),
        /* @__PURE__ */ jsxs("form", { onSubmit, className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("label", { className: "block", children: [
            /* @__PURE__ */ jsx("span", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Email" }),
            /* @__PURE__ */ jsx("input", { type: "email", required: true, value: email, onChange: (e) => setEmail(e.target.value), className: "mt-1.5 w-full px-4 py-3 rounded-xl bg-input/60 border border-border focus:border-primary focus:ring-2 focus:ring-ring outline-none transition-all" })
          ] }),
          /* @__PURE__ */ jsxs("label", { className: "block", children: [
            /* @__PURE__ */ jsx("span", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Password" }),
            /* @__PURE__ */ jsx("input", { type: "password", required: true, minLength: 6, value: password, onChange: (e) => setPassword(e.target.value), className: "mt-1.5 w-full px-4 py-3 rounded-xl bg-input/60 border border-border focus:border-primary focus:ring-2 focus:ring-ring outline-none transition-all" }),
            /* @__PURE__ */ jsx("span", { className: "block mt-1 text-xs text-muted-foreground", children: "At least 6 characters." })
          ] }),
          err && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: err }),
          msg && /* @__PURE__ */ jsx("p", { className: "text-sm text-primary", children: msg }),
          /* @__PURE__ */ jsxs("button", { type: "submit", disabled: loading, className: "w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-foreground font-semibold shadow-glow hover:opacity-95 disabled:opacity-60 transition-all", children: [
            loading && /* @__PURE__ */ jsx(Loader2, { size: 16, className: "animate-spin" }),
            "Create my diary"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-center text-muted-foreground mt-6", children: [
          "Already have one?",
          " ",
          /* @__PURE__ */ jsx(Link, { to: "/login", className: "text-primary hover:underline", children: "Sign in" })
        ] })
      ] })
    ] })
  ] });
}
export {
  SignupPage as component
};
