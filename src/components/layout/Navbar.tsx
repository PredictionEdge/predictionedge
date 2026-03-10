"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth/AuthContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  return (
    <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--color-warm)] text-xs font-bold text-[var(--color-background)] transition-transform group-hover:scale-105">
              PE
            </div>
            <span className="text-sm font-medium text-muted-foreground hidden sm:block group-hover:text-foreground transition-colors">
              PredictionEdge
            </span>
          </Link>
          <div className="flex items-center gap-2">
            {!loading && (
              <>
                {user ? (
                  <div className="flex items-center gap-2">
                    <Button asChild variant="ghost" size="sm" className="text-muted-foreground">
                      <Link href="/dashboard">Dashboard</Link>
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                          <Avatar className="h-7 w-7 border border-border">
                            <AvatarFallback className="text-[10px] bg-[var(--color-warm)]/10 text-[var(--color-warm)]">
                              {user.email?.charAt(0).toUpperCase() || "U"}
                            </AvatarFallback>
                          </Avatar>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56">
                        <div className="px-2 py-1.5">
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild><Link href="/dashboard">Dashboard</Link></DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={async () => { await signOut(); router.push("/"); }}>
                          Sign out
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ) : (
                  <>
                    <Button asChild variant="ghost" size="sm" className="text-muted-foreground">
                      <Link href="/login">Sign in</Link>
                    </Button>
                    <Button asChild size="sm" className="bg-[var(--color-warm)] text-[var(--color-background)] hover:bg-[var(--color-warm)]/90 rounded-full px-4">
                      <Link href="/signup">Get started</Link>
                    </Button>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
