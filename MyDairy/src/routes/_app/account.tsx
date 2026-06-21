import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { Mail, Lock, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/_app/account")({
  head: () => ({ meta: [{ title: "Account — My Diary" }] }),
  component: AccountPage,
});

function AccountPage() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="min-h-screen shiva-page-bg shiva-dashboard-bg krishna-page-bg krishna-dashboard-bg">
      <main className="relative max-w-3xl mx-auto px-6 py-12">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-2">Settings</p>
          <h1 className="font-display text-4xl">Account</h1>
          <p className="text-sm text-muted-foreground mt-3">
            Manage your account details and security settings.
          </p>
        </div>

        <div className="space-y-6">
          {/* Account Info Section */}
          <div className="rounded-3xl glass p-8 shadow-xl">
            <h2 className="font-display text-2xl mb-6">Account information</h2>
            
            <div className="space-y-4">
              {/* Email Display */}
              <div className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-muted/30">
                <div className="flex items-center gap-3">
                  <Mail size={20} className="text-muted-foreground" />
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Email</p>
                    <p className="font-medium text-foreground">{user.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Security Section */}
          <div className="rounded-3xl glass p-8 shadow-xl">
            <h2 className="font-display text-2xl mb-6">Security</h2>
            
            <div className="space-y-3">
              {/* Change Password Link */}
              <Link to="/change-password">
                <button className="w-full flex items-center justify-between p-4 rounded-xl border border-border/50 bg-muted/30 hover:bg-muted/50 transition-colors group">
                  <div className="flex items-center gap-3 text-left">
                    <Lock size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Change password</p>
                      <p className="text-xs text-muted-foreground">Update your password regularly</p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
                </button>
              </Link>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Back to dashboard
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
