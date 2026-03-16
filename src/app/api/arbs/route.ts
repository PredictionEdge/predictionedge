import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/get-user";
import { getUserSubscription, isSubscriptionActive } from "@/lib/stripe/subscription";
import { getActiveArbs } from "@/lib/db/arbs";
import { applyRateLimit } from "@/lib/api-utils";

const FREE_LIMIT = 3;

export async function GET(request: NextRequest) {
  // Rate limit: 30 requests per minute (auto-refresh is every 30s)
  const rateLimited = applyRateLimit(request, 30, 60_000);
  if (rateLimited) return rateLimited;

  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }



    const arbs = await getActiveArbs();

    const sub = await getUserSubscription(user.uid);
    const isPaid = isSubscriptionActive(sub);

    // Total arb value across all opportunities
    const totalArbValue = arbs.reduce((sum, a) => sum + a.totalArbValue, 0);

    // Free users see 3 worst arbs (sorted ascending by spread)
    const freeArbs = [...arbs].sort((a, b) => a.spread - b.spread).slice(0, FREE_LIMIT);

    return NextResponse.json({
      arbs: isPaid ? arbs : freeArbs,
      total: arbs.length,
      totalArbValue: Math.round(totalArbValue * 100) / 100,
      isPaid,
      limited: !isPaid && arbs.length > FREE_LIMIT,
    });
  } catch (error) {
    console.error("Arbs API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch opportunities" },
      { status: 500 }
    );
  }
}
