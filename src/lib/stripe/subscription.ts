import { getPool } from "@/lib/db/index";

export interface UserSubscription {
  status: "active" | "trialing" | "past_due" | "canceled" | "none";
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  stripePriceId?: string;
  currentPeriodEnd?: number;
}

/**
 * Get subscription status for a user by Supabase UID.
 */
export async function getUserSubscription(
  uid: string
): Promise<UserSubscription> {
  const pool = getPool();
  const result = await pool.query(
    `SELECT subscription_status, stripe_customer_id, stripe_subscription_id,
            stripe_price_id, current_period_end
     FROM pe_users WHERE uid = $1`,
    [uid]
  );

  if (result.rows.length === 0) {
    return { status: "none" };
  }

  const row = result.rows[0];
  return {
    status: row.subscription_status || "none",
    stripeCustomerId: row.stripe_customer_id || undefined,
    stripeSubscriptionId: row.stripe_subscription_id || undefined,
    stripePriceId: row.stripe_price_id || undefined,
    currentPeriodEnd: row.current_period_end
      ? Number(row.current_period_end)
      : undefined,
  };
}

/**
 * Ensure a pe_users row exists for this uid. If the row already exists, this is a no-op.
 */
export async function ensureUser(uid: string, email?: string): Promise<void> {
  const pool = getPool();
  await pool.query(
    `INSERT INTO pe_users (uid, email)
     VALUES ($1, $2)
     ON CONFLICT (uid) DO NOTHING`,
    [uid, email || null]
  );
}

/**
 * Update subscription-related fields on an existing pe_users row.
 * Only non-undefined fields are updated. The row must already exist (call ensureUser first).
 */
export async function updateUserSubscription(
  uid: string,
  data: Partial<{
    email: string;
    subscriptionStatus: string;
    stripeCustomerId: string;
    stripeSubscriptionId: string;
    stripePriceId: string;
    currentPeriodEnd: number;
  }>
): Promise<void> {
  const pool = getPool();

  const setClauses: string[] = ["updated_at = NOW()"];
  const values: unknown[] = [];
  let paramIndex = 1;

  const fieldMap: Record<string, string> = {
    email: "email",
    subscriptionStatus: "subscription_status",
    stripeCustomerId: "stripe_customer_id",
    stripeSubscriptionId: "stripe_subscription_id",
    stripePriceId: "stripe_price_id",
    currentPeriodEnd: "current_period_end",
  };

  for (const [key, column] of Object.entries(fieldMap)) {
    const value = data[key as keyof typeof data];
    if (value !== undefined) {
      setClauses.push(`${column} = $${paramIndex}`);
      values.push(value);
      paramIndex++;
    }
  }

  if (values.length === 0) return;

  values.push(uid);
  await pool.query(
    `UPDATE pe_users SET ${setClauses.join(", ")} WHERE uid = $${paramIndex}`,
    values
  );
}

/**
 * Find a user UID by their Stripe customer ID.
 */
export async function findUserByCustomerId(
  customerId: string
): Promise<string | null> {
  const pool = getPool();
  const result = await pool.query(
    `SELECT uid FROM pe_users WHERE stripe_customer_id = $1 LIMIT 1`,
    [customerId]
  );
  return result.rows.length > 0 ? result.rows[0].uid : null;
}

/**
 * Check if a user has an active paid subscription.
 */
export function isSubscriptionActive(sub: UserSubscription): boolean {
  return sub.status === "active" || sub.status === "trialing";
}
