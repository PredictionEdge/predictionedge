"use client";

import { useState, useEffect } from "react";

interface Stats { total: number; avgSpread: number; maxSpread: number; }

export default function StatsBar() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/arbs");
        if (!res.ok) return;
        const data = await res.json();
        if (!data.arbs?.length) return;
        const spreads = data.arbs.map((a: { spread: number }) => a.spread);
        setStats({
          total: data.total,
          avgSpread: spreads.reduce((a: number, b: number) => a + b, 0) / spreads.length,
          maxSpread: Math.max(...spreads),
        });
      } catch {}
    })();
  }, []);

  if (!stats) return null;

  return (
    <div className="flex items-center gap-6 mb-6 text-xs text-muted-foreground/40">
      <span><span className="text-foreground font-mono">{stats.total}</span> opportunities</span>
      <span><span className="text-foreground font-mono">{stats.avgSpread.toFixed(1)}%</span> avg spread</span>
      <span><span className="text-[var(--color-spread-green)] font-mono">{stats.maxSpread.toFixed(1)}%</span> best</span>
    </div>
  );
}
