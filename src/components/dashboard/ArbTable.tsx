"use client";

import { useState, useEffect, useCallback } from "react";
import { ArbWithSpread } from "@/lib/db/types";
import ArbCalculator from "./ArbCalculator";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

type SortField = "spread" | "market" | "category";
type SortDir = "asc" | "desc";

interface ArbsResponse {
  arbs: ArbWithSpread[];
  total: number;
  isPaid: boolean;
  limited: boolean;
}

export default function ArbTable() {
  const [data, setData] = useState<ArbsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortField, setSortField] = useState<SortField>("spread");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [selectedArb, setSelectedArb] = useState<ArbWithSpread | null>(null);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  const fetchArbs = useCallback(async () => {
    try {
      const res = await fetch("/api/arbs");
      if (!res.ok) throw new Error("Failed to fetch");
      const json = await res.json();
      setData(json);
      setLastRefresh(new Date());
      setError("");
    } catch { setError("Failed to load opportunities"); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => {
    fetchArbs();
    const interval = setInterval(fetchArbs, 30000);
    return () => clearInterval(interval);
  }, [fetchArbs]);

  if (loading) return <LoadingSkeleton />;

  if (error) {
    return (
      <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-8 text-center">
        <p className="text-destructive text-sm">{error}</p>
        <Button variant="ghost" size="sm" onClick={fetchArbs} className="mt-2 text-muted-foreground">Try again</Button>
      </div>
    );
  }

  if (!data || data.arbs.length === 0) {
    return (
      <div className="rounded-2xl border border-border/50 bg-card/30 p-16 text-center">
        <p className="text-4xl mb-3">🔍</p>
        <p className="text-muted-foreground">No opportunities right now.</p>
        <p className="text-xs text-muted-foreground/60 mt-1">Markets scanned continuously — check back soon.</p>
      </div>
    );
  }

  const categories = ["all", ...Array.from(new Set(data.arbs.map((a) => a.category).filter(Boolean)))];

  let filtered = categoryFilter === "all" ? data.arbs : data.arbs.filter((a) => a.category === categoryFilter);
  filtered = [...filtered].sort((a, b) => {
    const mul = sortDir === "asc" ? 1 : -1;
    if (sortField === "spread") return mul * (a.spread - b.spread);
    if (sortField === "market") return mul * a.market.localeCompare(b.market);
    if (sortField === "category") return mul * (a.category || "").localeCompare(b.category || "");
    return 0;
  });

  function toggleSort(field: SortField) {
    if (sortField === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortField(field); setSortDir(field === "spread" ? "desc" : "asc"); }
  }

  return (
    <div>
      {/* Filter bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategoryFilter(c)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium whitespace-nowrap transition-all ${
                categoryFilter === c
                  ? "bg-[var(--color-warm)] text-[var(--color-background)]"
                  : "bg-card border border-border/50 text-muted-foreground hover:text-foreground hover:border-border"
              }`}
            >
              {c === "all" ? "All" : c}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-spread-green)] opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--color-spread-green)]" />
            </span>
            <span className="text-[10px] text-muted-foreground">{lastRefresh.toLocaleTimeString()}</span>
          </div>
          <div className="flex items-center gap-1 border border-border/50 rounded-lg overflow-hidden">
            {(["spread", "market", "category"] as SortField[]).map((f) => (
              <button
                key={f}
                onClick={() => toggleSort(f)}
                className={`px-2.5 py-1 text-[10px] font-medium capitalize transition-colors ${
                  sortField === f ? "bg-card text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {f} {sortField === f && (sortDir === "desc" ? "↓" : "↑")}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Arb cards — split view */}
      <div className="space-y-3">
        {filtered.map((arb) => (
          <ArbCard
            key={arb.id}
            arb={arb}
            isSelected={selectedArb?.id === arb.id}
            onToggleCalc={() => setSelectedArb(selectedArb?.id === arb.id ? null : arb)}
          />
        ))}
      </div>

      {/* Calculator */}
      {selectedArb && (
        <div className="mt-4">
          <ArbCalculator arb={selectedArb} onClose={() => setSelectedArb(null)} />
        </div>
      )}

      {/* Upgrade banner */}
      {data.limited && (
        <div className="mt-6 rounded-2xl border border-[var(--color-warm)]/20 bg-[var(--color-warm)]/[0.03] p-6 text-center">
          <p className="text-sm">
            Showing {data.arbs.length} of <span className="font-semibold">{data.total}</span> opportunities.
          </p>
          <button
            onClick={async () => {
              const res = await fetch("/api/stripe/checkout", { method: "POST" });
              const d = await res.json();
              if (d.url) window.location.href = d.url;
            }}
            className="mt-2 text-sm font-medium text-[var(--color-warm)] hover:underline"
          >
            Unlock all →
          </button>
        </div>
      )}
    </div>
  );
}

function ArbCard({ arb, isSelected, onToggleCalc }: { arb: ArbWithSpread; isSelected: boolean; onToggleCalc: () => void }) {
  return (
    <div className={`rounded-2xl border transition-all ${isSelected ? "border-[var(--color-warm)]/30 bg-card/60" : "border-border/40 bg-card/30 hover:border-border/60"}`}>
      {/* Market title */}
      <div className="px-5 pt-4 pb-3 flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            {arb.category && (
              <span className="text-[10px] font-medium text-muted-foreground/60 uppercase tracking-wider">{arb.category}</span>
            )}
          </div>
          <h3 className="font-medium text-sm leading-snug truncate">{arb.market}</h3>
          <p className="text-[10px] text-muted-foreground/60 mt-0.5">{arb.direction}</p>
        </div>
        {/* Spread badge */}
        <div className="flex items-center gap-2">
          <div className={`rounded-full px-3 py-1.5 text-center ${
            arb.spread >= 5 ? "bg-[var(--color-spread-green)]/15 border border-[var(--color-spread-green)]/25" :
            arb.spread >= 3 ? "bg-[var(--color-spread-green)]/10 border border-[var(--color-spread-green)]/15" :
            "bg-card border border-border/50"
          }`}>
            <span className={`text-sm font-mono font-semibold ${arb.spread >= 3 ? "text-[var(--color-spread-green)]" : "text-foreground"}`}>
              {arb.spread.toFixed(1)}%
            </span>
          </div>
          <button
            onClick={onToggleCalc}
            className={`rounded-full h-8 w-8 flex items-center justify-center border transition-all text-xs ${
              isSelected ? "bg-[var(--color-warm)] text-[var(--color-background)] border-transparent" : "border-border/50 text-muted-foreground hover:border-border hover:text-foreground"
            }`}
          >
            {isSelected ? "✕" : "📊"}
          </button>
        </div>
      </div>

      {/* Split platform view */}
      <div className="grid md:grid-cols-[1fr,auto,1fr] border-t border-border/30">
        {/* Kalshi pane */}
        <div className="p-4 bg-[var(--color-kalshi)]/[0.02]">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-1.5">
              <div className="h-4 w-4 rounded bg-[var(--color-kalshi)]/15 flex items-center justify-center">
                <span className="text-[8px] font-bold text-[var(--color-kalshi)]">K</span>
              </div>
              <span className="text-[10px] font-medium text-[var(--color-kalshi)]/80">Kalshi</span>
            </div>
            <a href={arb.kalshiUrl} target="_blank" rel="noopener noreferrer" className="text-[10px] text-[var(--color-kalshi)]/50 hover:text-[var(--color-kalshi)] transition-colors">
              Open ↗
            </a>
          </div>
          {/* Kalshi-style progress bar */}
          <div className="rounded-lg border border-[var(--color-kalshi)]/10 bg-[var(--color-kalshi)]/[0.03] p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground">Price</span>
              <span className="text-sm font-mono font-semibold text-[var(--color-kalshi)]">{(arb.kalshiPrice * 100).toFixed(0)}¢</span>
            </div>
            <div className="h-1.5 rounded-full bg-border/20 overflow-hidden">
              <div
                className="h-full rounded-full bg-[var(--color-kalshi)]/50 transition-all"
                style={{ width: `${arb.kalshiPrice * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Center divider with spread */}
        <div className="hidden md:flex items-center justify-center px-3 border-x border-border/20">
          <div className="w-px h-full bg-gradient-to-b from-transparent via-[var(--color-spread-green)]/20 to-transparent" />
        </div>

        {/* Polymarket pane */}
        <div className="p-4 bg-[var(--color-poly)]/[0.02] border-t md:border-t-0">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-1.5">
              <div className="h-4 w-4 rounded bg-[var(--color-poly)]/15 flex items-center justify-center">
                <span className="text-[8px] font-bold text-[var(--color-poly)]">P</span>
              </div>
              <span className="text-[10px] font-medium text-[var(--color-poly)]/80">Polymarket</span>
            </div>
            <a href={arb.polymarketUrl} target="_blank" rel="noopener noreferrer" className="text-[10px] text-[var(--color-poly)]/50 hover:text-[var(--color-poly)] transition-colors">
              Open ↗
            </a>
          </div>
          {/* Polymarket-style outcome pills */}
          <div className="rounded-lg border border-[var(--color-poly)]/10 bg-[var(--color-poly)]/[0.03] p-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-[var(--color-spread-green)]/10 border border-[var(--color-spread-green)]/20 px-2.5 py-1 text-xs font-mono font-medium text-[var(--color-spread-green)]">
                Yes {(arb.polymarketPrice * 100).toFixed(0)}¢
              </span>
              <span className="inline-flex items-center rounded-full bg-red-500/10 border border-red-500/20 px-2.5 py-1 text-xs font-mono font-medium text-red-400">
                No {(100 - arb.polymarketPrice * 100).toFixed(0)}¢
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="rounded-2xl border border-border/40 bg-card/30 p-5">
          <Skeleton className="h-4 w-2/3 mb-3" />
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <Skeleton className="h-16 rounded-lg" />
            <Skeleton className="h-16 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}
