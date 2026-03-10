import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center px-6">
      <p className="font-serif text-6xl font-bold text-muted-foreground/20">404</p>
      <h1 className="mt-4 font-serif text-xl font-semibold">Page not found</h1>
      <p className="mt-2 text-sm text-muted-foreground">The page you&apos;re looking for doesn&apos;t exist.</p>
      <Button asChild className="mt-6 rounded-full bg-[var(--color-warm)] text-[var(--color-background)] hover:bg-[var(--color-warm)]/90">
        <Link href="/">Go home</Link>
      </Button>
    </div>
  );
}
