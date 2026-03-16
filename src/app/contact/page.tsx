import type { Metadata } from "next";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-xl px-6 py-20 text-center">
      <h1 className="text-2xl font-semibold mb-2">Contact us</h1>
      <p className="text-sm text-muted-foreground/90 mb-8">
        Questions, feedback, or issues — we&apos;re here to help.
      </p>

      <div className="rounded-2xl border border-border/40 bg-card/40 p-8 space-y-6 text-left">
        <div>
          <h2 className="text-sm font-medium mb-1">General support</h2>
          <p className="text-xs text-muted-foreground/90 mb-2">Account issues, billing, feature requests</p>
          <a href="mailto:support@predictionedge.win"
            className="text-sm text-foreground hover:underline underline-offset-2">
            support@predictionedge.win
          </a>
        </div>

        <div className="border-t border-border/30 pt-6">
          <h2 className="text-sm font-medium mb-1">Response time</h2>
          <p className="text-xs text-muted-foreground/90">
            We typically respond within 24 hours on business days.
          </p>
        </div>

        <div className="border-t border-border/30 pt-6">
          <h2 className="text-sm font-medium mb-1">Legal</h2>
          <p className="text-xs text-muted-foreground/90">
            See our{" "}
            <a href="/terms" className="text-foreground underline underline-offset-2 hover:text-foreground/80">Terms &amp; Conditions</a>
            {" "}and{" "}
            <a href="/privacy" className="text-foreground underline underline-offset-2 hover:text-foreground/80">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
