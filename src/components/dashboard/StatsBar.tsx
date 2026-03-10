"use client";

import { useState, useEffect } from "react";

interface Stats { total: number; avgSpread: number; maxSpread: number; categories: number; }

export default function StatsBar() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    async function fetch_() {
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
          categories: new Set(data.arbs.map((a: { category: string }) => a.category).filter(Boolean)).size,
        });
      } catch {}
    }
    fetch_();
  }, []);

  if (!stats) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
      <StatCard value={stats.total.toString()} label="Opportunities" accent="var(--color-warm)" />
      <StatCard value={`${stats.avgSpread.toFixed(1)}%`} label="Avg Spread" accent="var(--color-kalshi)" />
      <StatCard value={`${stats.maxSpread.toFixed(1)}%`} label="Best Spread" accent="var(--color-spread-green)" />
      <StatCard value={stats.categories.toString()} label="Categories" accent="var(--color-poly)" />
    </div>
  );
}

function StatCard({ value, label, accent }: { value: string; label: string; accent: string }) {
  return (
    <div className="rounded-xl border border-border/40 bg-card/30 p-4">
      <p className="text-2xl font-mono font-bold" style={{ color: accent }}>{value}</p>
      <p className="text-[10px] text-muted-foreground mt-0.5 uppercase tracking-wider">{label}</p>
    </div>
  );
}
