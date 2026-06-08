import { jsxs, jsx } from "react/jsx-runtime";
import { useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { a as useAuth } from "./router-DkXFKk_H.js";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Loader2, Save } from "lucide-react";
function NewEntry() {
  const router = useRouter();
  const {
    user
  } = useAuth();
  const qc = useQueryClient();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");
  const onSave = async (e) => {
    e.preventDefault();
    if (!user) return;
    if (!title.trim() && !content.trim()) {
      setErr("Add a title or write something first.");
      return;
    }
    setSaving(true);
    setErr("");
    const response = await fetch("/api/entries", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      credentials: "same-origin",
      body: JSON.stringify({
        title: title.trim() || "Untitled",
        content
      })
    });
    setSaving(false);
    if (!response.ok) {
      const data2 = await response.json().catch(() => null);
      setErr(data2?.error || "Unable to save memory.");
      return;
    }
    const data = await response.json();
    qc.invalidateQueries({
      queryKey: ["entries", user.id]
    });
    router.navigate({
      to: "/entries/$id",
      params: {
        id: data.id
      }
    });
  };
  return /* @__PURE__ */ jsxs("main", { className: "max-w-3xl mx-auto px-6 py-10", children: [
    /* @__PURE__ */ jsxs("button", { onClick: () => router.history.back(), className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6", children: [
      /* @__PURE__ */ jsx(ArrowLeft, { size: 16 }),
      " Back"
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: onSave, className: "glass rounded-3xl p-8 sm:p-12 shadow-card animate-fade-up", children: [
      /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-[0.25em] text-muted-foreground mb-3", children: (/* @__PURE__ */ new Date()).toLocaleString(void 0, {
        dateStyle: "long",
        timeStyle: "short"
      }) }),
      /* @__PURE__ */ jsx("input", { autoFocus: true, type: "text", placeholder: "A title for this memory…", value: title, onChange: (e) => setTitle(e.target.value), className: "w-full bg-transparent font-display text-3xl sm:text-4xl outline-none placeholder:text-muted-foreground/40 mb-6" }),
      /* @__PURE__ */ jsx("textarea", { rows: 14, placeholder: "Let the words flow…", value: content, onChange: (e) => setContent(e.target.value), className: "w-full bg-transparent text-lg leading-relaxed outline-none resize-none placeholder:text-muted-foreground/40 font-body" }),
      err && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive mt-3", children: err }),
      /* @__PURE__ */ jsx("div", { className: "mt-8 flex items-center justify-end", children: /* @__PURE__ */ jsxs("button", { type: "submit", disabled: saving, className: "inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold shadow-glow hover:opacity-95 disabled:opacity-60 transition-all", children: [
        saving ? /* @__PURE__ */ jsx(Loader2, { size: 16, className: "animate-spin" }) : /* @__PURE__ */ jsx(Save, { size: 16 }),
        "Save memory"
      ] }) })
    ] })
  ] });
}
export {
  NewEntry as component
};
