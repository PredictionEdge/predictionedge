"use client";
import { useAuth } from "@/lib/auth/AuthContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function SignOutButton() {
  const { signOut } = useAuth();
  const router = useRouter();
  return (
    <Button variant="ghost" size="sm" className="text-xs text-muted-foreground/90 hover:text-muted-foreground" onClick={async () => { await signOut(); router.push("/"); }}>
      Sign out
    </Button>
  );
}
