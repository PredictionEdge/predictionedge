import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border/30">
      <div className="mx-auto max-w-7xl px-6 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-5">
            <Link href="/" className="text-xs text-muted-foreground hover:text-foreground transition-colors">PredictionEdge</Link>
            <Link href="/login" className="text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors">Sign In</Link>
            <Link href="/signup" className="text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors">Sign Up</Link>
          </div>
          <p className="text-[10px] text-muted-foreground/30">
            © {new Date().getFullYear()} PredictionEdge. Informational only. Not financial advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
