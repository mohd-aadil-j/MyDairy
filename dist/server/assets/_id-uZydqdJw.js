import { jsx, jsxs } from "react/jsx-runtime";
import { useRouter, Link } from "@tanstack/react-router";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { R as Route, a as useAuth } from "./router-DkXFKk_H.js";
import { Loader2, ArrowLeft, Trash2 } from "lucide-react";
function EntryDetail() {
  const {
    id
  } = Route.useParams();
  const router = useRouter();
  const qc = useQueryClient();
  const {
    user
  } = useAuth();
  const [deleting, setDeleting] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const {
    data,
    isLoading,
    error
  } = useQuery({
    queryKey: ["entry", id],
    queryFn: async () => {
      const response = await fetch(`/api/entries/${id}`, {
        credentials: "same-origin"
      });
      if (!response.ok) {
        const json = await response.json().catch(() => null);
        throw new Error(json?.error || "Failed to load memory");
      }
      return response.json();
    }
  });
  const onDelete = async () => {
    setDeleting(true);
    const response = await fetch(`/api/entries/${id}`, {
      method: "DELETE",
      credentials: "same-origin"
    });
    setDeleting(false);
    if (!response.ok) return;
    qc.invalidateQueries({
      queryKey: ["entries", user?.id]
    });
    router.navigate({
      to: "/dashboard"
    });
  };
  if (isLoading) {
    return /* @__PURE__ */ jsx("main", { className: "max-w-3xl mx-auto px-6 py-20 text-center", children: /* @__PURE__ */ jsx(Loader2, { className: "animate-spin mx-auto text-primary" }) });
  }
  if (error || !data) {
    return /* @__PURE__ */ jsx("main", { className: "max-w-3xl mx-auto px-6 py-20 text-center", children: /* @__PURE__ */ jsxs("div", { className: "glass rounded-3xl p-10", children: [
      /* @__PURE__ */ jsx("h1", { className: "font-display text-2xl mb-2", children: "Memory not found" }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-6", children: "It may have been deleted." }),
      /* @__PURE__ */ jsx(Link, { to: "/dashboard", className: "inline-block px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-medium", children: "Back to memories" })
    ] }) });
  }
  const date = new Date(data.created_at);
  return /* @__PURE__ */ jsxs("main", { className: "max-w-3xl mx-auto px-6 py-10", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/dashboard", className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors", children: [
        /* @__PURE__ */ jsx(ArrowLeft, { size: 16 }),
        " All memories"
      ] }),
      !confirm ? /* @__PURE__ */ jsxs("button", { onClick: () => setConfirm(true), className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-destructive transition-colors px-3 py-1.5 rounded-full glass", children: [
        /* @__PURE__ */ jsx(Trash2, { size: 14 }),
        " Delete"
      ] }) : /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("button", { onClick: () => setConfirm(false), className: "text-sm px-3 py-1.5 rounded-full glass", children: "Cancel" }),
        /* @__PURE__ */ jsxs("button", { onClick: onDelete, disabled: deleting, className: "inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-destructive text-destructive-foreground", children: [
          deleting ? /* @__PURE__ */ jsx(Loader2, { size: 14, className: "animate-spin" }) : /* @__PURE__ */ jsx(Trash2, { size: 14 }),
          "Confirm delete"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("article", { className: "glass rounded-3xl p-8 sm:p-12 shadow-card divine-glow animate-fade-up", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4", children: [
        date.toLocaleDateString(void 0, {
          dateStyle: "full"
        }),
        " ·",
        " ",
        date.toLocaleTimeString(void 0, {
          hour: "2-digit",
          minute: "2-digit"
        })
      ] }),
      /* @__PURE__ */ jsx("h1", { className: "font-display text-4xl sm:text-5xl mb-8 leading-tight text-gradient", children: data.title }),
      /* @__PURE__ */ jsx("div", { className: "prose prose-invert max-w-none text-lg leading-[1.85] whitespace-pre-wrap font-body text-foreground/90", children: data.content || /* @__PURE__ */ jsx("span", { className: "text-muted-foreground italic", children: "No words this time." }) })
    ] })
  ] });
}
export {
  EntryDetail as component
};
