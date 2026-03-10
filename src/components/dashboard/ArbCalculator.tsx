"use client";

import { useState } from "react";
import { ArbWithSpread } from "@/lib/db/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props { arb: ArbWithSpread; onClose: () => void; }

export default function ArbCalculator({ arb, onClose }: Props) {
  const [stake, setStake] = useState(1000);

  const totalCost = arb.kalshiPrice + arb.polymarketPrice;
  const profitPerDollar = 1 - totalCost;
  const roi = (profitPerDollar / totalCost) * 100;
  const kalshiAlloc = (arb.kalshiPrice / totalCost) * stake;
  const polyAlloc = (arb.polymarketPrice / totalCost) * stake;
  const contracts = Math.floor(stake / totalCost);
  const actualProfit = contracts * profitPerDollar;

  return (
    <div className="rounded-2xl border border-[var(--color-warm)]/20 bg-card/60 backdrop-blur-sm overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3 border-b border-border/30">
        <h3 className="text-sm font-medium">Arb Calculator</h3>
        <Button variant="ghost" size="sm" onClick={onClose} className="text-muted-foreground h-7 w-7 p-0">✕</Button>
      </div>

      <div className="p-5">
        <p className="text-xs text-muted-foreground truncate mb-4">{arb.market}</p>

        {/* Stake */}
        <div className="mb-5">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
            <Input type="number" value={stake} onChange={(e) => setStake(Math.max(0, Number(e.target.value)))}
              className="pl-7 font-mono bg-background/50 border-border/50 rounded-xl h-11" min={0} step={100} />
          </div>
          <div className="flex gap-1.5 mt-2">
            {[100, 500, 1000, 5000].map((v) => (
              <button key={v} onClick={() => setStake(v)}
                className={`rounded-full px-3 py-1 text-[10px] font-medium transition-all ${
                  stake === v ? "bg-[var(--color-warm)] text-[var(--color-background)]" : "bg-card border border-border/50 text-muted-foreground hover:text-foreground"
                }`}>
                ${v.toLocaleString()}
              </button>
            ))}
          </div>
        </div>

        {/* Results — split by platform */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="rounded-xl border border-[var(--color-kalshi)]/15 bg-[var(--color-kalshi)]/[0.03] p-3">
            <div className="flex items-center gap-1.5 mb-2">
              <div className="h-3.5 w-3.5 rounded bg-[var(--color-kalshi)]/15 flex items-center justify-center">
                <span className="text-[7px] font-bold text-[var(--color-kalshi)]">K</span>
              </div>
              <span className="text-[10px] text-[var(--color-kalshi)]/70">Kalshi</span>
            </div>
            <p className="text-lg font-mono font-semibold text-[var(--color-kalshi)]">${kalshiAlloc.toFixed(2)}</p>
            <p className="text-[10px] text-muted-foreground">@ {(arb.kalshiPrice * 100).toFixed(0)}¢/share</p>
          </div>

          <div className="rounded-xl border border-[var(--color-poly)]/15 bg-[var(--color-poly)]/[0.03] p-3">
            <div className="flex items-center gap-1.5 mb-2">
              <div className="h-3.5 w-3.5 rounded bg-[var(--color-poly)]/15 flex items-center justify-center">
                <span className="text-[7px] font-bold text-[var(--color-poly)]">P</span>
              </div>
              <span className="text-[10px] text-[var(--color-poly)]/70">Polymarket</span>
            </div>
            <p className="text-lg font-mono font-semibold text-[var(--color-poly)]">${polyAlloc.toFixed(2)}</p>
            <p className="text-[10px] text-muted-foreground">@ {(arb.polymarketPrice * 100).toFixed(0)}¢/share</p>
          </div>
        </div>

        {/* Profit highlight */}
        <div className="rounded-xl border border-[var(--color-spread-green)]/20 bg-[var(--color-spread-green)]/[0.05] p-4 text-center">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Guaranteed Profit</p>
          <p className="text-2xl font-mono font-bold text-[var(--color-spread-green)]">${actualProfit.toFixed(2)}</p>
          <p className="text-xs text-muted-foreground mt-1">{contracts.toLocaleString()} contracts · {roi.toFixed(1)}% ROI</p>
        </div>

        <p className="mt-3 text-[10px] text-muted-foreground/40 text-center">
          Excludes platform fees, slippage, and execution risk.
        </p>
      </div>
    </div>
  );
}
