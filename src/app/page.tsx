import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      {/* Hero — Anthropic-inspired warm elegance */}
      <section className="relative overflow-hidden">
        {/* Subtle gradient orbs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-[var(--color-kalshi)]/5 rounded-full blur-3xl" />
        <div className="absolute top-40 right-1/4 w-96 h-96 bg-[var(--color-poly)]/5 rounded-full blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-6 py-24 sm:py-32 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-card/50 px-4 py-1.5 text-xs text-muted-foreground mb-8 backdrop-blur-sm">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-spread-green)] opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--color-spread-green)]" />
            </span>
            Scanning markets live
          </div>

          <h1 className="font-serif text-5xl sm:text-7xl font-bold tracking-tight leading-[1.1]">
            Find the gaps
            <br />
            <span className="text-[var(--color-warm)]">between markets.</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Real-time arbitrage across Polymarket and Kalshi.
            See both sides. Spot the spread. Trade with math.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-[var(--color-warm)] text-[var(--color-background)] hover:bg-[var(--color-warm)]/90 rounded-full px-8 h-12 text-sm font-medium">
              <Link href="/signup">Start finding arbitrage →</Link>
            </Button>
            <Button asChild variant="ghost" size="lg" className="text-muted-foreground rounded-full h-12 px-8">
              <Link href="/login">Sign in</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Split platform preview */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm overflow-hidden">
          {/* Mock arb row */}
          <div className="p-6 border-b border-border/50">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif text-xl font-semibold">Live Opportunities</h2>
              <span className="text-xs text-muted-foreground">Updated just now</span>
            </div>
          </div>

          {/* Split view demo */}
          <div className="grid md:grid-cols-[1fr,auto,1fr]">
            {/* Kalshi side */}
            <div className="p-6 bg-[var(--color-kalshi)]/[0.03]">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-5 w-5 rounded bg-[var(--color-kalshi)]/20 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-[var(--color-kalshi)]">K</span>
                </div>
                <span className="text-xs font-medium text-[var(--color-kalshi)]">Kalshi</span>
              </div>
              <DemoKalshiCard title="Will BTC hit $150k by Dec 2025?" yesPrice={42} noPrice={58} />
              <DemoKalshiCard title="Next Fed rate decision — hold?" yesPrice={71} noPrice={29} />
              <DemoKalshiCard title="US recession by end of 2026?" yesPrice={28} noPrice={72} />
            </div>

            {/* Center spread column */}
            <div className="hidden md:flex flex-col items-center justify-center px-4 border-x border-border/30 bg-[var(--color-spread-green)]/[0.02]">
              <SpreadBadge spread={4.2} />
              <div className="w-px h-8 bg-border/30 my-2" />
              <SpreadBadge spread={3.1} />
              <div className="w-px h-8 bg-border/30 my-2" />
              <SpreadBadge spread={2.8} />
            </div>

            {/* Polymarket side */}
            <div className="p-6 bg-[var(--color-poly)]/[0.03]">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-5 w-5 rounded bg-[var(--color-poly)]/20 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-[var(--color-poly)]">P</span>
                </div>
                <span className="text-xs font-medium text-[var(--color-poly)]">Polymarket</span>
              </div>
              <DemoPolyCard question="Will Bitcoin hit $150k by Dec 2025?" yesPrice={46} volume="$12.4M" />
              <DemoPolyCard question="Next Fed rate decision — hold?" yesPrice={68} volume="$8.2M" />
              <DemoPolyCard question="US recession by end of 2026?" yesPrice={25} volume="$5.1M" />
            </div>
          </div>
        </div>
      </section>

      {/* Features — Anthropic style */}
      <section className="mx-auto max-w-4xl px-6 py-24 border-t border-border/30">
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-center mb-16">
          Built for <span className="text-[var(--color-warm)]">precision</span>
        </h2>
        <div className="grid sm:grid-cols-3 gap-8">
          <Feature
            title="Split View"
            description="See the same market rendered in each platform's native format. Instantly compare prices side-by-side."
          />
          <Feature
            title="Arb Calculator"
            description="Input your stake, see exact allocation across platforms, contracts, and guaranteed profit — accounting for fees."
          />
          <Feature
            title="Real-Time"
            description="Markets scanned continuously. Auto-refresh every 30 seconds. Never miss a spread before it closes."
          />
        </div>
      </section>

      {/* Pricing — Clean */}
      <section className="mx-auto max-w-md px-6 py-24 border-t border-border/30 text-center">
        <h2 className="font-serif text-3xl font-bold mb-2">Simple pricing</h2>
        <p className="text-muted-foreground mb-10">One plan. Full access. Cancel anytime.</p>

        <div className="rounded-2xl border border-[var(--color-warm)]/20 bg-card p-8">
          <p className="text-xs font-medium text-[var(--color-warm)] uppercase tracking-widest mb-4">Pro</p>
          <div className="flex items-baseline justify-center gap-1 mb-1">
            <span className="font-serif text-5xl font-bold">$39</span>
            <span className="text-muted-foreground">/mo</span>
          </div>
          <p className="text-xs text-muted-foreground mb-8">Cancel anytime</p>

          <ul className="space-y-3 text-left mb-8">
            {["200+ daily opportunities", "Kalshi ↔ Polymarket split view", "Built-in arb calculator", "Auto-refresh every 30s", "Category filtering"].map((f) => (
              <li key={f} className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="text-[var(--color-spread-green)] text-xs">✓</span>{f}
              </li>
            ))}
          </ul>

          <Button asChild size="lg" className="w-full bg-[var(--color-warm)] text-[var(--color-background)] hover:bg-[var(--color-warm)]/90 rounded-full h-11">
            <Link href="/signup">Get started free</Link>
          </Button>
          <p className="text-[10px] text-muted-foreground/60 mt-3">3 free previews. No card required.</p>
        </div>
      </section>
    </div>
  );
}

function DemoKalshiCard({ title, yesPrice, noPrice }: { title: string; yesPrice: number; noPrice: number }) {
  return (
    <div className="rounded-xl border border-[var(--color-kalshi)]/10 bg-[var(--color-kalshi)]/[0.03] p-4 mb-3">
      <p className="text-sm font-medium mb-3 leading-snug">{title}</p>
      <div className="flex items-center gap-2">
        <div className="flex-1 h-2 rounded-full bg-border/30 overflow-hidden">
          <div className="h-full rounded-full bg-[var(--color-kalshi)]/60" style={{ width: `${yesPrice}%` }} />
        </div>
        <span className="text-xs font-mono text-[var(--color-kalshi)]">{yesPrice}¢</span>
      </div>
      <div className="flex justify-between mt-2">
        <span className="text-[10px] text-muted-foreground">Yes {yesPrice}¢</span>
        <span className="text-[10px] text-muted-foreground">No {noPrice}¢</span>
      </div>
    </div>
  );
}

function DemoPolyCard({ question, yesPrice, volume }: { question: string; yesPrice: number; volume: string }) {
  return (
    <div className="rounded-xl border border-[var(--color-poly)]/10 bg-[var(--color-poly)]/[0.03] p-4 mb-3">
      <p className="text-sm font-medium mb-3 leading-snug">{question}</p>
      <div className="flex items-center gap-2 mb-2">
        <span className="inline-flex items-center rounded-full bg-[var(--color-spread-green)]/10 border border-[var(--color-spread-green)]/20 px-2.5 py-0.5 text-xs font-medium text-[var(--color-spread-green)]">
          Yes {yesPrice}¢
        </span>
        <span className="inline-flex items-center rounded-full bg-red-500/10 border border-red-500/20 px-2.5 py-0.5 text-xs font-medium text-red-400">
          No {100 - yesPrice}¢
        </span>
      </div>
      <span className="text-[10px] text-muted-foreground">{volume} Vol</span>
    </div>
  );
}

function SpreadBadge({ spread }: { spread: number }) {
  return (
    <div className="flex flex-col items-center">
      <div className="rounded-full bg-[var(--color-spread-green)]/10 border border-[var(--color-spread-green)]/20 px-3 py-1">
        <span className="text-xs font-mono font-semibold text-[var(--color-spread-green)]">{spread}%</span>
      </div>
    </div>
  );
}

function Feature({ title, description }: { title: string; description: string }) {
  return (
    <div>
      <h3 className="font-medium mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}
