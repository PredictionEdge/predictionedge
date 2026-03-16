"use client";
import { useState } from "react";
import { useSubscription } from "@/lib/stripe/useSubscription";
import { Button } from "@/components/ui/button";

export default function ManageSubscription() {
  const { status, loading } = useSubscription();
  const [portalLoading, setPortalLoading] = useState(false);
  if (loading || (status !== "active" && status !== "trialing")) return null;

  return (
    <Button variant="ghost" size="sm" className="text-xs text-muted-foreground/90 hover:text-muted-foreground"
      disabled={portalLoading} onClick={async () => {
        setPortalLoading(true);
        try { const res = await fetch("/api/stripe/portal", { method: "POST" }); const d = await res.json(); if (d.url) window.location.href = d.url; }
        catch {} finally { setPortalLoading(false); }
      }}>
      {portalLoading ? "…" : "Billing"}
    </Button>
  );
}
