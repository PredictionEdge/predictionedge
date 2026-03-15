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
          Continue with Google
        </Button>

        <p className="mt-8 text-center text-xs text-muted-foreground/60">
          Have an account? <Link href="/login" className="text-muted-foreground hover:text-foreground transition-colors">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
