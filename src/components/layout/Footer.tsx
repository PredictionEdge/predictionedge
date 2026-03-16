import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto">
      <div className="mx-auto max-w-5xl px-6 py-8">
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground/80">PredictionEdge</p>
          <div className="flex gap-4">
            <Link href="/login" className="text-xs text-muted-foreground/80 hover:text-muted-foreground transition-colors">Sign in</Link>
            <Link href="/signup" className="text-xs text-muted-foreground/80 hover:text-muted-foreground transition-colors">Sign up</Link>
            <Link href="/terms" className="text-xs text-muted-foreground/80 hover:text-muted-foreground transition-colors">Terms</Link>
            <Link href="/privacy" className="text-xs text-muted-foreground/80 hover:text-muted-foreground transition-colors">Privacy</Link>
            <Link href="/contact" className="text-xs text-muted-foreground/80 hover:text-muted-foreground transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
