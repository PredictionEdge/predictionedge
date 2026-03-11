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
    <nav className="sticky top-0 z-50 bg-background/60 backdrop-blur-2xl">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="text-sm font-medium tracking-tight text-foreground/80 hover:text-foreground transition-colors">
            PredictionEdge
          </Link>
          <div className="flex items-center gap-2">
            {!loading && (
              <>
                {user ? (
                  <div className="flex items-center gap-2">
                    <Button asChild variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-foreground">
                      <Link href="/dashboard">Dashboard</Link>
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs bg-secondary text-muted-foreground">
                              {user.email?.charAt(0).toUpperCase() || "U"}
                            </AvatarFallback>
                          </Avatar>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <div className="px-2 py-1.5">
                          <p className="text-xs text-muted-foreground truncate">{user.email}</p>
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
                    <Button asChild variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-foreground">
                      <Link href="/login">Sign in</Link>
                    </Button>
                    <Button asChild size="sm" className="text-xs rounded-full h-8 px-4">
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
