"use client";

import { useArbs } from "@/lib/hooks/useArbs";

export default function StatsBar() {
  const { data } = useArbs();

  if (!data?.arbs?.length) return null;

  const spreads = data.arbs.map((a) => a.spread);
  const avg = spreads.reduce((a, b) => a + b, 0) / spreads.length;
  const max = Math.max(...spreads);
  const totalValue = data.totalArbValue || data.arbs.reduce((s, a) => s + (a.totalArbValue || 0), 0);

  return (
    <div className="flex items-center gap-6 mb-6 text-xs text-muted-foreground/90">
      <span>
        <span className="text-foreground font-mono">{data.total}</span> opportunities
      </span>
      {totalValue > 0 && (
        <span>
          <span className="text-[var(--color-spread-green)] font-mono">${totalValue.toFixed(2)}</span> available
        </span>
      )}
      <span>
        <span className="text-foreground font-mono">{avg.toFixed(1)}%</span> avg
      </span>
      <span>
        <span className="text-[var(--color-spread-green)] font-mono">{max.toFixed(1)}%</span> best
      </span>
    </div>
  );
}
