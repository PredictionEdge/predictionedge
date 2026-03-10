import { verifySession } from "./session";

export interface SessionUser {
  uid: string;
  email: string | undefined;
}

/**
 * Get the current authenticated user from the session cookie.
 * Use in Server Components and API routes.
 * Returns null if not authenticated.
 */
export async function getCurrentUser(): Promise<SessionUser | null> {
  const decoded = await verifySession();
  if (!decoded) return null;

  return {
    uid: decoded.uid,
    email: decoded.email,
  };
}
