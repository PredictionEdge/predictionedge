"use client";

import { useState } from "react";
import { ArbWithSpread } from "@/lib/db/types";
import { Input } from "@/components/ui/input";

function formatCents(price: number): string {
  const cents = price * 100;
  if (cents === 0) return "0";
  return cents % 1 === 0 ? cents.toFixed(0) : cents.toFixed(1);
}

interface Props { arb: ArbWithSpread; onClose: () => void; }

export default function ArbCalculator({ arb }: Props) {
  const [stake, setStake] = useState(100);
  const [showCalc, setShowCalc] = useState(false);

  const totalCost = arb.kalshiPrice + arb.polymarketPrice;
  const netProfitPerContract = arb.spread / 100;
  const rawProfitPerContract = arb.rawSpread / 100;
  const feesPerContract = rawProfitPerContract - netProfitPerContract;
  const l1Contracts = Math.floor(arb.maxSize);
  const l1Profit = l1Contracts * netProfitPerContract;

  // Custom stake
  const contracts = totalCost > 0 ? Math.floor(stake / totalCost) : 0;
  const customProfit = contracts * netProfitPerContract;

  // Parse direction for display
  const isKalshiYes = arb.direction.includes("YES on Kalshi");
  const kalshiSide = isKalshiYes ? "YES" : "NO";
  const polySide = isKalshiYes ? "NO" : "YES";

  return (
    <div className="rounded-xl bg-secondary/50 p-4 space-y-3">

      {/* Market identifiers */}
      <div className="text-xs text-muted-foreground/90 space-y-0.5">
        <p>Kalshi: <span className="font-mono text-foreground/80">{arb.kalshiTicker}</span></p>
        <p>Polymarket: <span className="font-mono text-foreground/80">{arb.polymarketId}</span></p>
      </div>

      {/* Trade action buttons */}
      <div className="grid grid-cols-2 gap-3">
        <a href={arb.kalshiUrl} target="_blank" rel="noopener noreferrer"
          className="flex items-center justify-between rounded-lg border border-[var(--color-kalshi)]/30 bg-[var(--color-kalshi)]/5 px-4 py-3 hover:bg-[var(--color-kalshi)]/10 transition-colors">
          <div>
            <p className="text-xs text-muted-foreground/80 mb-0.5">Buy {kalshiSide} on Kalshi</p>
            <p className="font-mono text-lg text-[var(--color-kalshi)]">{formatCents(arb.kalshiPrice)}¢</p>
          </div>
          <span className="text-[var(--color-kalshi)]/60 text-lg">→</span>
        </a>
        <a href={arb.polymarketUrl} target="_blank" rel="noopener noreferrer"
          className="flex items-center justify-between rounded-lg border border-[var(--color-poly)]/30 bg-[var(--color-poly)]/5 px-4 py-3 hover:bg-[var(--color-poly)]/10 transition-colors">
          <div>
            <p className="text-xs text-muted-foreground/80 mb-0.5">Buy {polySide} on Polymarket</p>
            <p className="font-mono text-lg text-[var(--color-poly)]">{formatCents(arb.polymarketPrice)}¢</p>
          </div>
          <span className="text-[var(--color-poly)]/60 text-lg">→</span>
        </a>
      </div>

      {/* Key numbers - single row */}
      <div className="flex items-center justify-between text-xs px-1">
        <span className="text-muted-foreground/80">
          Cost: <span className="font-mono text-foreground/80">{formatCents(totalCost)}¢</span>
          {" · "}Fees: <span className="font-mono text-red-400/70">{(feesPerContract * 100).toFixed(1)}¢</span>
          {" · "}Net: <span className="font-mono text-[var(--color-spread-green)]">{(netProfitPerContract * 100).toFixed(1)}¢</span>
        </span>
        {l1Contracts > 0 && (
          <span className="text-muted-foreground/80">
            {l1Contracts} available · <span className="font-mono text-[var(--color-spread-green)]">${l1Profit.toFixed(2)}</span>
          </span>
        )}
      </div>

      {/* Expandable calculator */}
      <div>
        <button onClick={() => setShowCalc(!showCalc)}
          className="text-xs text-muted-foreground/70 hover:text-muted-foreground transition-colors">
          {showCalc ? "▾ Hide calculator" : "▸ Stake calculator"}
        </button>
        {showCalc && (
          <div className="mt-2 flex items-center gap-3 flex-wrap">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/80 text-xs">$</span>
              <Input type="number" value={stake} onChange={(e) => setStake(Math.max(0, Number(e.target.value)))}
                className="pl-6 h-7 w-24 text-xs font-mono bg-background/50 border-border/40 rounded-lg" min={0} step={100} />
            </div>
            <div className="flex gap-1">
              {[100, 500, 1000].map(v => (
                <button key={v} onClick={() => setStake(v)}
                  className={`rounded-md px-2 py-1 text-[10px] transition-colors ${
                    stake === v ? "bg-foreground text-background" : "text-muted-foreground/80 hover:text-muted-foreground"
                  }`}>${v >= 1000 ? `${v/1000}k` : v}</button>
              ))}
            </div>
            <span className="text-xs text-muted-foreground/80">
              → {contracts} contracts · <span className="font-mono text-[var(--color-spread-green)]">${customProfit.toFixed(2)} profit</span>
            </span>
            {contracts > l1Contracts && l1Contracts > 0 && (
              <span className="text-[10px] text-yellow-400/70">⚠️ Exceeds L1 depth</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
