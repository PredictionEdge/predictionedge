import { AlertTriangle } from "lucide-react";

export default function RiskBanner() {
  return (
    <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 px-4 py-3 mb-6">
      <div className="flex items-start gap-3">
        <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5 shrink-0" />
        <div className="text-xs text-yellow-200/80 leading-relaxed">
          <p className="font-medium text-yellow-200 mb-1">Risk Warning</p>
          <p>
            Prediction market trading involves substantial risk of loss. Arbitrage opportunities may
            contain edge cases, pricing delays, or execution risks that can result in losses.
            Past performance does not guarantee future results. You should carefully read the terms
            and conditions of each contract on the underlying platforms before trading.
            Only trade with funds you can afford to lose.
          </p>
          <p className="mt-2">
            By using PredictionEdge you agree to our{" "}
            <a href="/terms" className="text-yellow-400 hover:text-yellow-300 underline underline-offset-2">
              Terms &amp; Conditions
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
}
