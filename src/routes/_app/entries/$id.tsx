import { createFileRoute, useRouter, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { ArrowLeft, Loader2, Trash2 } from "lucide-react";

export const Route = createFileRoute("/_app/entries/$id")({
  head: () => ({ meta: [{ title: "Memory — My Diary" }] }),
  component: EntryDetail,
});

function EntryDetail() {
  const { id } = Route.useParams();
  const router = useRouter();
  const qc = useQueryClient();
  const { user } = useAuth();
  const [deleting, setDeleting] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["entry", id],
    queryFn: async () => {
      const response = await fetch(`/api/entries/${id}`, {
        credentials: 'same-origin',
      });
      if (!response.ok) {
        const json = await response.json().catch(() => null);
        throw new Error(json?.error || 'Failed to load memory');
      }
      return response.json();
    },
  });

  const onDelete = async () => {
    setDeleting(true);
    const response = await fetch(`/api/entries/${id}`, {
      method: 'DELETE',
      credentials: 'same-origin',
    });
    setDeleting(false);
    if (!response.ok) return;
    qc.invalidateQueries({ queryKey: ['entries', user?.id] });
    router.navigate({ to: "/dashboard" });
  };

  if (isLoading) {
    return (
      <main className="max-w-3xl mx-auto px-6 py-20 text-center">
        <Loader2 className="animate-spin mx-auto text-primary" />
      </main>
    );
  }

  if (error || !data) {
    return (
      <main className="max-w-3xl mx-auto px-6 py-20 text-center">
        <div className="glass rounded-3xl p-10">
          <h1 className="font-display text-2xl mb-2">Memory not found</h1>
          <p className="text-muted-foreground mb-6">It may have been deleted.</p>
          <Link to="/dashboard" className="inline-block px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-medium">
            Back to memories
          </Link>
        </div>
      </main>
    );
  }

  const date = new Date(data.created_at);

  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-6">
        <Link to="/dashboard" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft size={16} /> All memories
        </Link>
        {!confirm ? (
          <button
            onClick={() => setConfirm(true)}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-destructive transition-colors px-3 py-1.5 rounded-full glass"
          >
            <Trash2 size={14} /> Delete
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button onClick={() => setConfirm(false)} className="text-sm px-3 py-1.5 rounded-full glass">Cancel</button>
            <button
              onClick={onDelete}
              disabled={deleting}
              className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-destructive text-destructive-foreground"
            >
              {deleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
              Confirm delete
            </button>
          </div>
        )}
      </div>

      <article className="glass rounded-3xl p-8 sm:p-12 shadow-card divine-glow animate-fade-up">
        <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">
          {date.toLocaleDateString(undefined, { dateStyle: "full" })} ·{" "}
          {date.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}
        </div>
        <h1 className="font-display text-4xl sm:text-5xl mb-8 leading-tight text-gradient">
          {data.title}
        </h1>
        <div className="prose prose-invert max-w-none text-lg leading-[1.85] whitespace-pre-wrap font-body text-foreground/90">
          {data.content || <span className="text-muted-foreground italic">No words this time.</span>}
        </div>
      </article>
    </main>
  );
}
