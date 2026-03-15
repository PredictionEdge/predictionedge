import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe/client";
import { getCurrentUser } from "@/lib/auth/get-user";
import { ensureUser, getUserSubscription, updateUserSubscription } from "@/lib/stripe/subscription";

export async function POST(request: NextRequest) {
  // CSRF: verify request comes from our own origin (allow both apex and www)
  const origin = request.headers.get("origin");
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const allowedOrigin = new URL(appUrl).origin;
  const allowedWww = allowedOrigin.replace("://", "://www.");
  if (origin && origin !== allowedOrigin && origin !== allowedWww) {
    console.error(`CSRF blocked: origin=${origin} expected=${allowedOrigin}`);
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const priceId = process.env.STRIPE_PRICE_ID;
    if (!priceId) return NextResponse.json({ error: "Server configuration error" }, { status: 500 });

    const stripe = getStripe();

    // Ensure user row exists before any updates
    await ensureUser(user.uid, user.email);

    const existingSub = await getUserSubscription(user.uid);
    let customerId = existingSub.stripeCustomerId;

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: { supabaseUid: user.uid },
      });
      customerId = customer.id;
      await updateUserSubscription(user.uid, { stripeCustomerId: customerId });
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${appUrl}/dashboard?checkout=success`,
      cancel_url: `${appUrl}/dashboard?checkout=canceled`,
      subscription_data: { metadata: { supabaseUid: user.uid } },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}
