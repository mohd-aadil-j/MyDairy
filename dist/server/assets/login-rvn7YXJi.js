import { jsxs, jsx } from "react/jsx-runtime";
import { useRouter, Link } from "@tanstack/react-router";
import { redirect } from "@tanstack/react-router";
import { useState } from "react";
import { N as Navbar } from "./Navbar-D3Sx34jV.js";
import { T as ThemeOrnament } from "./ornaments-FHn_0iDx.js";
import { Loader2 } from "lucide-react";
import "framer-motion";
import "./router-DkXFKk_H.js";
import "@tanstack/react-query";
function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr("");
    const res = await fetch("/api/auth/login", {
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
      setErr(data?.error || "Login failed");
      return;
    }
    router.navigate({
      to: "/dashboard"
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen shiva-page-bg shiva-login-bg", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsxs("div", { className: "relative flex items-center justify-end pr-6 py-20 min-h-[calc(100vh-4rem)]", children: [
      /* @__PURE__ */ jsx(ThemeOrnament, { className: "absolute top-10 left-10 w-40 h-40 opacity-20 animate-slow-spin" }),
      /* @__PURE__ */ jsx(ThemeOrnament, { className: "absolute bottom-10 right-10 w-48 h-48 opacity-20 animate-slow-spin" }),
      /* @__PURE__ */ jsxs("div", { className: "w-full max-w-md glass rounded-3xl p-8 sm:p-10 shadow-card divine-glow animate-fade-up", children: [
        /* @__PURE__ */ jsx("h1", { className: "font-display text-3xl mb-2", children: "Welcome back" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mb-8", children: "Step quietly into your sanctuary." }),
        /* @__PURE__ */ jsxs("form", { onSubmit, className: "space-y-4", children: [
          /* @__PURE__ */ jsx(Field, { label: "Email", type: "email", value: email, onChange: setEmail, required: true }),
          /* @__PURE__ */ jsx(Field, { label: "Password", type: "password", value: password, onChange: setPassword, required: true }),
          err && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: err }),
          /* @__PURE__ */ jsxs("button", { type: "submit", disabled: loading, className: "w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-foreground font-semibold shadow-glow hover:opacity-95 disabled:opacity-60 transition-all", children: [
            loading && /* @__PURE__ */ jsx(Loader2, { size: 16, className: "animate-spin" }),
            "Sign in"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-center text-muted-foreground mt-6", children: [
          "New here?",
          " ",
          /* @__PURE__ */ jsx(Link, { to: "/signup", className: "text-primary hover:underline", children: "Create an account" })
        ] })
      ] })
    ] })
  ] });
}
function Field({
  label,
  type,
  value,
  onChange,
  required
}) {
  return /* @__PURE__ */ jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsx("span", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: label }),
    /* @__PURE__ */ jsx("input", { type, value, required, onChange: (e) => onChange(e.target.value), className: "mt-1.5 w-full px-4 py-3 rounded-xl bg-input/60 border border-border focus:border-primary focus:ring-2 focus:ring-ring outline-none transition-all" })
  ] });
}
export {
  LoginPage as component,
  redirect
};
