import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { useAuth } from "@/lib/auth";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Loader2, Save } from "lucide-react";

export const Route = createFileRoute("/_app/new")({
  head: () => ({ meta: [{ title: "New memory — My Diary" }] }),
  component: NewEntry,
});

function NewEntry() {
  const router = useRouter();
  const { user } = useAuth();
  const qc = useQueryClient();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  const onSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!title.trim() && !content.trim()) {
      setErr("Add a title or write something first.");
      return;
    }

    setSaving(true);
    setErr("");

    const response = await fetch('/api/entries', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify({ title: title.trim() || 'Untitled', content }),
    });

    setSaving(false);

    if (!response.ok) {
      const data = await response.json().catch(() => null);
      setErr(data?.error || 'Unable to save memory.');
      return;
    }

    const data = await response.json();
    qc.invalidateQueries({ queryKey: ['entries', user.id] });
    router.navigate({ to: '/entries/$id', params: { id: data.id } });
  };

  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <button
        onClick={() => router.history.back()}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft size={16} /> Back
      </button>

      <form onSubmit={onSave} className="glass rounded-3xl p-8 sm:p-12 shadow-card animate-fade-up">
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-3">
          {new Date().toLocaleString(undefined, { dateStyle: "long", timeStyle: "short" })}
        </p>

        <input
          autoFocus
          type="text"
          placeholder="A title for this memory…"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-transparent font-display text-3xl sm:text-4xl outline-none placeholder:text-muted-foreground/40 mb-6"
        />

        <textarea
          rows={14}
          placeholder="Let the words flow…"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full bg-transparent text-lg leading-relaxed outline-none resize-none placeholder:text-muted-foreground/40 font-body"
        />

        {err && <p className="text-sm text-destructive mt-3">{err}</p>}

        <div className="mt-8 flex items-center justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold shadow-glow hover:opacity-95 disabled:opacity-60 transition-all"
          >
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            Save memory
          </button>
        </div>
      </form>
    </main>
  );
}
