import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-2xl font-semibold mb-2">Privacy Policy</h1>
      <p className="text-xs text-muted-foreground/60 mb-10">Last updated: March 15, 2026</p>

      <div className="prose prose-invert prose-sm max-w-none space-y-6 text-sm text-muted-foreground leading-relaxed [&_h2]:text-foreground [&_h2]:text-base [&_h2]:font-medium [&_h2]:mt-8 [&_h2]:mb-3 [&_strong]:text-foreground/90">

        <h2>1. Introduction</h2>
        <p>
          PredictionEdge (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) respects your privacy.
          This Privacy Policy explains how we collect, use, disclose, and safeguard your information when
          you use our service at predictionedge.win.
        </p>

        <h2>2. Information We Collect</h2>
        <p><strong>Account information:</strong> When you create an account, we collect your email address
        and, if you use Google sign-in, your name and profile picture as provided by Google.</p>
        <p><strong>Payment information:</strong> Payments are processed by Stripe. We do not store your
        credit card number. Stripe provides us with a token, your billing email, and subscription status.
        See <a href="https://stripe.com/privacy" className="text-foreground underline underline-offset-2" target="_blank" rel="noopener noreferrer">Stripe&apos;s Privacy Policy</a>.</p>
        <p><strong>Usage data:</strong> We collect standard server logs including IP address, browser type,
        pages visited, and timestamps. This data is used for security, debugging, and analytics.</p>
        <p><strong>Cookies:</strong> We use essential cookies for authentication (session tokens). We do not
        use third-party tracking cookies.</p>

        <h2>3. How We Use Your Information</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>To provide, maintain, and improve the Service</li>
          <li>To process your subscription and payments</li>
          <li>To authenticate your identity and manage your account</li>
          <li>To send transactional emails (account confirmation, password reset, billing receipts)</li>
          <li>To detect and prevent fraud, abuse, or security incidents</li>
          <li>To comply with legal obligations</li>
        </ul>
        <p>We do <strong>not</strong> sell your personal information to third parties. We do <strong>not</strong> use
        your data for advertising or profiling.</p>

        <h2>4. Data Sharing</h2>
        <p>We share your information only with:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Supabase</strong> — authentication and database hosting</li>
          <li><strong>Stripe</strong> — payment processing</li>
          <li><strong>Vercel</strong> — application hosting</li>
        </ul>
        <p>These providers process data on our behalf under their respective privacy policies and data
        processing agreements.</p>

        <h2>5. Data Retention</h2>
        <p>We retain your account data for as long as your account is active. If you delete your account,
        we will remove your personal data within 30 days, except where retention is required by law
        (e.g., billing records).</p>

        <h2>6. Your Rights</h2>
        <p>Depending on your jurisdiction, you may have the right to:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Access the personal data we hold about you</li>
          <li>Request correction of inaccurate data</li>
          <li>Request deletion of your data</li>
          <li>Export your data in a portable format</li>
          <li>Withdraw consent for data processing</li>
        </ul>
        <p>To exercise these rights, contact us at{" "}
          <a href="mailto:support@predictionedge.win" className="text-foreground underline underline-offset-2">
            support@predictionedge.win
          </a>.
        </p>

        <h2>7. Security</h2>
        <p>We use industry-standard security measures including encrypted connections (TLS), secure
        authentication tokens, and access controls. However, no method of transmission over the internet
        is 100% secure, and we cannot guarantee absolute security.</p>

        <h2>8. Children</h2>
        <p>The Service is not intended for users under 18 years of age. We do not knowingly collect
        personal information from minors.</p>

        <h2>9. International Transfers</h2>
        <p>Your data may be processed in countries other than your own. By using the Service, you consent
        to the transfer of your information to countries that may have different data protection laws.</p>

        <h2>10. Changes</h2>
        <p>We may update this Privacy Policy from time to time. We will notify you of material changes
        by updating the date at the top and, where appropriate, via email.</p>

        <h2>11. Contact</h2>
        <p>
          For privacy-related inquiries, contact us at{" "}
          <a href="mailto:support@predictionedge.win" className="text-foreground underline underline-offset-2">
            support@predictionedge.win
          </a>.
        </p>
      </div>
    </div>
  );
}
