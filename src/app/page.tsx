import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-6">
      {/* Hero */}
      <section className="py-28 sm:py-36">
        <p className="text-sm text-muted-foreground mb-4">Prediction market arbitrage</p>
        <h1 className="text-4xl sm:text-5xl font-medium tracking-tight leading-[1.15] max-w-xl">
          See the spread between markets.
        </h1>
        <p className="mt-4 text-base text-muted-foreground max-w-lg leading-relaxed">
          Compare Polymarket and Kalshi side-by-side. Find price gaps. Calculate guaranteed profit.
        </p>
        <div className="mt-8 flex items-center gap-3">
          <Button asChild size="sm" className="rounded-full h-9 px-5 text-xs">
            <Link href="/signup">Get started</Link>
          </Button>
          <Button asChild variant="ghost" size="sm" className="text-xs text-muted-foreground">
            <Link href="/login">Sign in →</Link>
          </Button>
        </div>
      </section>

      {/* Preview */}
      <section className="pb-24">
        <div className="rounded-2xl border border-border/60 bg-card/40 overflow-hidden">
          <div className="px-5 py-4 border-b border-border/40 flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Live opportunities</p>
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-spread-green)] opacity-60" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--color-spread-green)]" />
              </span>
              <span className="text-[10px] text-muted-foreground/60">Live</span>
            </div>
          </div>
          <div className="divide-y divide-border/30">
            <DemoRow market="Will BTC hit $150k by Dec 2025?" kalshi={42} poly={46} spread={4.2} />
            <DemoRow market="Next Fed rate decision — hold?" kalshi={71} poly={68} spread={3.1} />
            <DemoRow market="US recession by end of 2026?" kalshi={28} poly={25} spread={2.8} />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="pb-24 grid sm:grid-cols-3 gap-8">
        <Feature title="Split view" text="Same market, two platforms. Kalshi on the left, Polymarket on the right. Compare instantly." />
        <Feature title="Calculator" text="Enter your stake. See allocation, contracts, and guaranteed profit — before you trade." />
        <Feature title="Real-time" text="Auto-refresh every 30 seconds. Never miss a spread." />
      </section>

      {/* Pricing */}
      <section className="pb-28 max-w-xs mx-auto text-center">
        <p className="text-xs text-muted-foreground mb-6">Simple pricing</p>
        <div className="rounded-2xl border border-border/60 bg-card/40 p-6">
          <div className="flex items-baseline justify-center gap-1 mb-1">
            <span className="text-3xl font-medium">$39</span>
            <span className="text-sm text-muted-foreground">/mo</span>
          </div>
          <p className="text-xs text-muted-foreground mb-6">Cancel anytime</p>
          <ul className="space-y-2 text-left mb-6">
            {["All opportunities", "Split view", "Arb calculator", "Auto-refresh", "Category filters"].map((f) => (
              <li key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="text-[var(--color-spread-green)]">✓</span>{f}
              </li>
            ))}
          </ul>
          <Button asChild size="sm" className="w-full rounded-full h-9 text-xs">
            <Link href="/signup">Get started</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

function DemoRow({ market, kalshi, poly, spread }: { market: string; kalshi: number; poly: number; spread: number }) {
  return (
    <div className="px-5 py-4 flex items-center gap-4">
      <div className="flex-1 min-w-0">
        <p className="text-sm truncate">{market}</p>
      </div>
      <div className="flex items-center gap-6 shrink-0">
        <div className="text-right">
          <p className="text-[10px] text-[var(--color-kalshi)]/60 mb-0.5">Kalshi</p>
          <p className="text-sm font-mono">{kalshi}¢</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-[var(--color-poly)]/60 mb-0.5">Poly</p>
          <p className="text-sm font-mono">{poly}¢</p>
        </div>
        <div className="w-14 text-right">
          <span className="text-sm font-mono text-[var(--color-spread-green)]">+{spread}%</span>
        </div>
      </div>
    </div>
  );
}

function Feature({ title, text }: { title: string; text: string }) {
  return (
    <div>
      <h3 className="text-sm font-medium mb-1.5">{title}</h3>
      <p className="text-xs text-muted-foreground leading-relaxed">{text}</p>
    </div>
  );
}
