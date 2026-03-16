"use client";

import { useState } from "react";
import { ArbWithSpread } from "@/lib/db/types";
import { useArbs } from "@/lib/hooks/useArbs";
import ArbCalculator from "./ArbCalculator";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

type SortField = "spread" | "value" | "market";
type SortDir = "asc" | "desc";

export default function ArbTable() {
  const { data, loading, error, lastRefresh, refetch } = useArbs();
  const [sortField, setSortField] = useState<SortField>("spread");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [selectedArb, setSelectedArb] = useState<ArbWithSpread | null>(null);

  if (loading) return <LoadingSkeleton />;
  if (error) return (
    <div className="rounded-2xl border border-border/40 p-8 text-center">
      <p className="text-sm text-muted-foreground">{error}</p>
      <Button variant="ghost" size="sm" onClick={refetch} className="mt-2 text-xs">Retry</Button>
    </div>
  );
  if (!data?.arbs.length) return (
    <div className="rounded-2xl border border-border/40 p-16 text-center">
      {data?.message ? (
        <>
          <p className="text-sm text-muted-foreground">🔒 Early access</p>
          <p className="text-xs text-muted-foreground/90 mt-2 max-w-xs mx-auto">{data.message}</p>
          <p className="text-xs text-muted-foreground/70 mt-4">
            Questions? <a href="mailto:support@predictionedge.win" className="text-foreground hover:underline">support@predictionedge.win</a>
          </p>
        </>
      ) : (
        <>
          <p className="text-sm text-muted-foreground">No opportunities right now</p>
          <p className="text-xs text-muted-foreground/90 mt-1">Check back soon</p>
        </>
      )}
    </div>
  );

  let filtered = [...data.arbs].sort((a, b) => {
    const m = sortDir === "asc" ? 1 : -1;
    if (sortField === "spread") return m * (a.spread - b.spread);
    if (sortField === "value") return m * ((a.totalArbValue || 0) - (b.totalArbValue || 0));
    return m * a.market.localeCompare(b.market);
  });

  function toggleSort(f: SortField) {
    if (sortField === f) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortField(f); setSortDir(f === "market" ? "asc" : "desc"); }
  }

  return (
    <div>
      {/* Controls */}
      <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-spread-green)] opacity-60" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--color-spread-green)]" />
          </span>
          <span className="text-xs text-muted-foreground/90">{lastRefresh.toLocaleTimeString()}</span>
        </div>
        <div className="flex items-center gap-0.5">
          {(["spread", "value", "market"] as SortField[]).map(f => (
            <button key={f} onClick={() => toggleSort(f)}
              className={`px-2 py-1 text-xs rounded-md capitalize transition-colors ${
                sortField === f ? "text-foreground bg-secondary" : "text-muted-foreground/90 hover:text-muted-foreground"
              }`}>
              {f === "value" ? "$" : f}{sortField === f && (sortDir === "desc" ? " ↓" : " ↑")}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="rounded-2xl border border-border/40 overflow-visible divide-y divide-border/50">
        {filtered.map(arb => (
          <div key={arb.id}
            className={`transition-colors ${arb.stale ? "opacity-50" : ""} ${selectedArb?.id === arb.id ? "bg-secondary/50" : "hover:bg-secondary/30"}`}>
            <button
              onClick={() => setSelectedArb(selectedArb?.id === arb.id ? null : arb)}
              className="w-full text-left px-5 py-4 flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm truncate">
                  {arb.market}
                  {arb.stale && <span className="ml-2 text-xs text-amber-500/80">⚠ Stale</span>}
                </p>
                <p className="text-xs text-muted-foreground/90 mt-0.5 hidden sm:block">{arb.direction}</p>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <div className="text-right hidden sm:block">
                  <span className="text-sm font-mono text-[var(--color-kalshi)]">
                    {(arb.kalshiPrice * 100).toFixed(0)}¢
                  </span>
                  <span className="text-muted-foreground/70 mx-1">+</span>
                  <span className="text-sm font-mono text-[var(--color-poly)]">
                    {(arb.polymarketPrice * 100).toFixed(0)}¢
                  </span>
                </div>
                <div className="text-right min-w-[4.5rem]">
                  <p className="text-sm font-mono text-[var(--color-spread-green)]">
                    +{arb.spread.toFixed(1)}%
                  </p>
                  {arb.totalArbValue > 0 && (
                    <p className="text-xs font-mono text-[var(--color-spread-green)]/80">
                      ${arb.totalArbValue.toFixed(2)}
                    </p>
                  )}
                </div>
                <span className={`text-xs transition-colors ${
                  selectedArb?.id === arb.id ? "text-foreground" : "text-muted-foreground/70"
                }`}>
                  {selectedArb?.id === arb.id ? "▾" : "▸"}
                </span>
              </div>
            </button>

            {selectedArb?.id === arb.id && (
              <div className="px-5 pb-4">
                {/* Depth visualization */}
                {arb.depthLevels.length > 0 && (
                  <DepthBar arb={arb} />
                )}
                <ArbCalculator arb={arb} onClose={() => setSelectedArb(null)} />
              </div>
            )}
          </div>
        ))}
      </div>

      {data.limited && (
        <div className="mt-4 text-center space-y-1">
          {(data.totalArbValue || 0) > 0 && (
            <p className="text-sm font-mono text-[var(--color-spread-green)]">
              ${data.totalArbValue.toFixed(2)} in arbitrage available right now
            </p>
          )}
          <p className="text-xs text-muted-foreground">
            Showing {data.arbs.length} of {data.total} opportunities ·{" "}
            <button onClick={async () => {
              const res = await fetch("/api/stripe/checkout", { method: "POST" });
              const d = await res.json();
              if (d.url) window.location.href = d.url;
            }} className="text-foreground hover:underline">Unlock all →</button>
          </p>
        </div>
      )}
    </div>
  );
}

function DepthBar({ arb }: { arb: ArbWithSpread }) {
  const levels = arb.depthLevels;
  if (!levels.length) return null;

  const total = arb.totalArbValue || levels.reduce((s, l) => s + l.value, 0);
  if (total <= 0) return null;

  // Split into best price (L1) vs deeper levels
  const l1Value = levels[0]?.value || 0;
  const deeperValue = total - l1Value;
  const l1Pct = (l1Value / total) * 100;
  const deeperPct = (deeperValue / total) * 100;

  return (
    <div className="mb-3 rounded-lg bg-secondary/30 p-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-muted-foreground">
          <span className="font-mono text-[var(--color-spread-green)]">${total.toFixed(2)}</span> available
        </span>
        <span className="text-[10px] text-muted-foreground/70">
          {arb.updatedAt && (() => {
            const ago = Math.floor((Date.now() - new Date(arb.updatedAt).getTime()) / 60000);
            return ago < 1 ? "just now" : `${ago}m ago`;
          })()}
        </span>
      </div>
      {/* Bar */}
      <div className="h-2 rounded-full bg-background/50 overflow-hidden flex">
        {l1Pct > 0 && (
          <div
            className="h-full bg-[var(--color-spread-green)] rounded-l-full"
            style={{ width: `${Math.max(l1Pct, 4)}%` }}
          />
        )}
        {deeperPct > 0 && (
          <div
            className="h-full bg-[var(--color-spread-green)]/30"
            style={{ width: `${Math.max(deeperPct, 4)}%` }}
          />
        )}
      </div>
      {/* Legend */}
      <div className="flex items-center gap-4 mt-1.5 text-[10px] text-muted-foreground/90">
        <span>
          <span className="inline-block w-2 h-2 rounded-sm bg-[var(--color-spread-green)] mr-1 align-middle" />
          ${l1Value.toFixed(2)} at best price ({levels[0]?.spread_pct.toFixed(1)}%)
        </span>
        {deeperValue > 0.01 && (
          <span>
            <span className="inline-block w-2 h-2 rounded-sm bg-[var(--color-spread-green)]/30 mr-1 align-middle" />
            ${deeperValue.toFixed(2)} at deeper prices
          </span>
        )}
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="rounded-2xl border border-border/40 overflow-visible divide-y divide-border/50">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="px-5 py-4 flex items-center gap-4">
          <div className="flex-1"><Skeleton className="h-4 w-3/4" /></div>
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-14" />
        </div>
      ))}
    </div>
  );
}
