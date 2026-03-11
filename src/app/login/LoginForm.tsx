"use client";

import { useState, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function LoginForm() {
  const { signIn, signInWithGoogle, loading: authLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault(); setError(""); setLoading(true);
    try { await signIn(email, password); router.push(redirect); router.refresh(); }
    catch (err: unknown) {
      const m = err instanceof Error ? err.message : "";
      if (m.includes("Invalid login")) setError("Invalid email or password.");
      else if (m.includes("Email not confirmed")) setError("Please confirm your email.");
      else setError("Sign in failed.");
    } finally { setLoading(false); }
  }

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <h1 className="text-lg font-medium mb-1">Sign in</h1>
        <p className="text-xs text-muted-foreground/40 mb-8">Welcome back</p>

        {error && <p className="text-xs text-destructive mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-3">
          <Input type="email" required autoComplete="email" value={email} onChange={e => setEmail(e.target.value)}
            placeholder="Email" className="h-10 text-sm rounded-xl bg-secondary/50 border-border/30 placeholder:text-muted-foreground/30" />
          <Input type="password" required autoComplete="current-password" minLength={8} value={password} onChange={e => setPassword(e.target.value)}
            placeholder="Password" className="h-10 text-sm rounded-xl bg-secondary/50 border-border/30 placeholder:text-muted-foreground/30" />
          <Button type="submit" disabled={loading || authLoading} className="w-full rounded-full h-10 text-xs">
            {loading ? "Signing in…" : "Continue"}
          </Button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <Separator className="flex-1 bg-border/30" /><span className="text-[11px] text-muted-foreground/20">or</span><Separator className="flex-1 bg-border/30" />
        </div>

        <Button variant="outline" className="w-full rounded-full h-10 text-xs border-border/30 text-muted-foreground" onClick={() => signInWithGoogle()} disabled={authLoading}>
          Continue with Google
        </Button>

        <p className="mt-8 text-center text-xs text-muted-foreground/30">
          No account? <Link href="/signup" className="text-muted-foreground hover:text-foreground transition-colors">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
