"use client";

import { useArbs } from "@/lib/hooks/useArbs";
import InfoTooltip from "@/components/ui/info-tooltip";

export default function StatsBar() {
  const { data } = useArbs();

  if (!data?.arbs?.length) return null;

  const spreads = data.arbs.map((a) => a.spread);
  const avg = spreads.reduce((a, b) => a + b, 0) / spreads.length;
  const max = Math.max(...spreads);

  return (
    <div className="flex items-center gap-6 mb-6 text-xs text-muted-foreground/90">
      <span>
        <span className="text-foreground font-mono">{data.total}</span> opportunities
      </span>
      <span>
        <span className="text-foreground font-mono">{avg.toFixed(1)}%</span> avg spread <InfoTooltip text="Average net spread across all current opportunities, after platform fees on both sides." />
      </span>
      <span>
        <span className="text-[var(--color-spread-green)] font-mono">{max.toFixed(1)}%</span> best <InfoTooltip text="Highest net spread currently available. Spreads are verified against live orderbooks — not just indicative prices." />
      </span>
    </div>
  );
}
