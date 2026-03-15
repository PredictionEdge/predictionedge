"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function SignupPage() {
  const { signUp, signInWithGoogle, loading: authLoading } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmSent, setConfirmSent] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault(); setError("");
    if (password.length < 8) { setError("At least 8 characters."); return; }
    setLoading(true);
    try { await signUp(email, password); setConfirmSent(true); }
    catch (err: unknown) {
      const m = err instanceof Error ? err.message : "";
      if (m.includes("already registered")) setError("Account exists.");
      else setError("Sign up failed.");
    } finally { setLoading(false); }
  }

  if (confirmSent) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-6 text-center">
        <div>
          <h1 className="text-lg font-medium mb-1">Check your email</h1>
          <p className="text-xs text-muted-foreground/70">Confirmation link sent to {email}</p>
          <Button variant="ghost" size="sm" className="mt-6 text-xs text-muted-foreground" onClick={() => router.push("/login")}>
            Back to sign in
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <h1 className="text-lg font-medium mb-1">Create account</h1>
        <p className="text-xs text-muted-foreground/70 mb-8">Start finding opportunities</p>

        {error && <p className="text-xs text-destructive mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-3">
          <Input type="email" required autoComplete="email" value={email} onChange={e => setEmail(e.target.value)}
            placeholder="Email" className="h-10 text-sm rounded-xl bg-secondary/50 border-border/40 placeholder:text-muted-foreground/50" />
          <Input type="password" required autoComplete="new-password" minLength={8} value={password} onChange={e => setPassword(e.target.value)}
            placeholder="Password" className="h-10 text-sm rounded-xl bg-secondary/50 border-border/40 placeholder:text-muted-foreground/50" />
          <p className="text-[10px] text-muted-foreground/50 text-center leading-relaxed">
            By creating an account you agree to our{" "}
            <a href="/terms" className="underline hover:text-foreground transition-colors">Terms &amp; Conditions</a>{" "}
            and acknowledge the risks of prediction market trading.
          </p>
          <Button type="submit" disabled={loading || authLoading} className="w-full rounded-full h-10 text-sm">
            {loading ? "Creating…" : "Continue"}
          </Button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <Separator className="flex-1 bg-border/50" /><span className="text-xs text-muted-foreground/50">or</span><Separator className="flex-1 bg-border/50" />
        </div>

        <Button variant="outline" className="w-full rounded-full h-10 text-sm border-border/40 text-muted-foreground" onClick={() => signInWithGoogle()} disabled={authLoading}>
          <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
          Continue with Google
        </Button>

        <p className="mt-8 text-center text-xs text-muted-foreground/60">
          Have an account? <Link href="/login" className="text-muted-foreground hover:text-foreground transition-colors">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
