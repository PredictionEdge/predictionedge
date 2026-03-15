import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms & Conditions" };

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-2xl font-semibold mb-2">Terms &amp; Conditions</h1>
      <p className="text-xs text-muted-foreground/60 mb-10">Last updated: March 15, 2026</p>

      <div className="prose prose-invert prose-sm max-w-none space-y-6 text-sm text-muted-foreground leading-relaxed [&_h2]:text-foreground [&_h2]:text-base [&_h2]:font-medium [&_h2]:mt-8 [&_h2]:mb-3 [&_strong]:text-foreground/90">

        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing or using PredictionEdge (&ldquo;the Service&rdquo;), operated by PredictionEdge
          (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), you agree to be bound by these
          Terms &amp; Conditions. If you do not agree, do not use the Service.
        </p>

        <h2>2. Description of Service</h2>
        <p>
          PredictionEdge provides informational tools that identify potential arbitrage opportunities
          across prediction market platforms including, but not limited to, Polymarket and Kalshi.
          The Service displays data, analysis, and calculated spreads for informational purposes only.
        </p>

        <h2>3. No Financial Advice</h2>
        <p>
          <strong>The Service does not constitute financial advice, investment advice, trading advice,
          or any other form of professional advice.</strong> All information provided is for
          informational and educational purposes only. You should consult a qualified financial
          advisor before making any trading decisions.
        </p>

        <h2>4. Risk Disclosure</h2>
        <p>
          <strong>Trading on prediction markets involves substantial risk of loss and is not suitable
          for all individuals.</strong> You acknowledge and agree that:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Arbitrage opportunities displayed may contain errors, pricing delays, stale data, or
          edge cases that can result in partial or total loss of funds.</li>
          <li>Market conditions can change rapidly between the time an opportunity is displayed and
          the time you attempt to execute a trade.</li>
          <li>Execution risk, slippage, liquidity constraints, and platform-specific rules may
          prevent profitable execution of displayed opportunities.</li>
          <li>Each prediction market platform has its own terms, conditions, rules, and fee
          structures that you are solely responsible for understanding.</li>
          <li>Regulatory changes may affect the legality or availability of prediction market
          trading in your jurisdiction.</li>
          <li>Past performance of any displayed opportunity or strategy does not guarantee future
          results.</li>
          <li>You should never trade with funds you cannot afford to lose entirely.</li>
        </ul>

        <h2>5. No Guarantee of Accuracy</h2>
        <p>
          While we strive to provide accurate and timely data, we make no representations or
          warranties regarding the accuracy, completeness, reliability, or timeliness of any
          information displayed on the Service. Data is sourced from third-party platforms and may
          be delayed, incomplete, or incorrect.
        </p>

        <h2>6. User Responsibilities</h2>
        <p>You are solely responsible for:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Your own trading decisions and their outcomes.</li>
          <li>Conducting your own due diligence on any opportunity before trading.</li>
          <li>Reading and understanding the terms and conditions of each underlying prediction
          market platform.</li>
          <li>Compliance with all applicable laws and regulations in your jurisdiction, including
          tax obligations.</li>
          <li>Maintaining the security of your account credentials.</li>
          <li>Determining whether prediction market trading is legal in your jurisdiction.</li>
        </ul>

        <h2>7. Limitation of Liability</h2>
        <p>
          <strong>To the maximum extent permitted by applicable law, PredictionEdge and its
          officers, directors, employees, agents, and affiliates shall not be liable for any
          direct, indirect, incidental, special, consequential, or punitive damages</strong>,
          including but not limited to loss of profits, data, or funds, arising out of or in
          connection with your use of the Service, whether based on warranty, contract, tort,
          or any other legal theory, even if we have been advised of the possibility of such
          damages.
        </p>
        <p>
          In no event shall our total liability to you exceed the amount you paid us in the
          twelve (12) months preceding the claim.
        </p>

        <h2>8. Indemnification</h2>
        <p>
          You agree to indemnify, defend, and hold harmless PredictionEdge and its affiliates
          from any claims, damages, losses, liabilities, costs, and expenses (including
          reasonable legal fees) arising from your use of the Service, your trading activities,
          or your violation of these Terms.
        </p>

        <h2>9. Third-Party Platforms</h2>
        <p>
          The Service references and displays data from third-party prediction market platforms.
          We have no control over, and assume no responsibility for, the content, privacy policies,
          or practices of any third-party platforms. Your use of those platforms is governed by
          their respective terms of service.
        </p>

        <h2>10. Subscription &amp; Payments</h2>
        <p>
          Certain features of the Service require a paid subscription. Subscription fees are
          non-refundable except as required by applicable law. We reserve the right to modify
          pricing with reasonable notice. Continued use after a price change constitutes
          acceptance of the new pricing.
        </p>

        <h2>11. Account Termination</h2>
        <p>
          We reserve the right to suspend or terminate your account at our sole discretion,
          without notice, for conduct that we determine violates these Terms or is harmful to
          other users, us, or third parties.
        </p>

        <h2>12. Intellectual Property</h2>
        <p>
          All content, features, and functionality of the Service are owned by PredictionEdge
          and are protected by applicable intellectual property laws. You may not reproduce,
          distribute, or create derivative works without our prior written consent.
        </p>

        <h2>13. Disclaimer of Warranties</h2>
        <p>
          <strong>The Service is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;
          without warranties of any kind, either express or implied</strong>, including but not
          limited to implied warranties of merchantability, fitness for a particular purpose,
          and non-infringement.
        </p>

        <h2>14. Governing Law</h2>
        <p>
          These Terms shall be governed by and construed in accordance with the laws of the
          jurisdiction in which PredictionEdge is incorporated, without regard to conflict of
          law provisions.
        </p>

        <h2>15. Dispute Resolution</h2>
        <p>
          Any dispute arising from these Terms or the Service shall first be attempted to be
          resolved through good-faith negotiation. If unresolved within thirty (30) days,
          either party may pursue binding arbitration in accordance with applicable arbitration
          rules.
        </p>

        <h2>16. Modifications</h2>
        <p>
          We reserve the right to modify these Terms at any time. Material changes will be
          communicated via the Service or email. Continued use after changes constitutes
          acceptance of the modified Terms.
        </p>

        <h2>17. Severability</h2>
        <p>
          If any provision of these Terms is found to be unenforceable, the remaining provisions
          shall continue in full force and effect.
        </p>

        <h2>18. Contact</h2>
        <p>
          For questions about these Terms, contact us at{" "}
          <a href="mailto:support@predictionedge.win" className="text-foreground underline underline-offset-2 hover:text-foreground/80">
            support@predictionedge.win
          </a>.
        </p>
      </div>
    </div>
  );
}
