import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto">
      <div className="mx-auto max-w-5xl px-6 py-8">
        <div className="flex items-center justify-between">
          <p className="text-[11px] text-muted-foreground/20">PredictionEdge</p>
          <div className="flex gap-4">
            <Link href="/login" className="text-[11px] text-muted-foreground/20 hover:text-muted-foreground transition-colors">Sign in</Link>
            <Link href="/signup" className="text-[11px] text-muted-foreground/20 hover:text-muted-foreground transition-colors">Sign up</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
