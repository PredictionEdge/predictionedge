import { cookies } from "next/headers";
import { getAdminAuth } from "./firebase-admin";

const SESSION_COOKIE_NAME = "session";
const SESSION_EXPIRY_MS = 60 * 60 * 24 * 5 * 1000; // 5 days

/**
 * Create a secure session cookie from a Firebase ID token.
 * Called from the /api/auth/session route after client-side sign-in.
 */
export async function createSessionCookie(idToken: string): Promise<string> {
  const auth = getAdminAuth();
  return auth.createSessionCookie(idToken, {
    expiresIn: SESSION_EXPIRY_MS,
  });
}

/**
 * Verify the session cookie and return the decoded claims.
 * Returns null if invalid/expired — never throws to callers.
 */
export async function verifySession() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    if (!sessionCookie) return null;

    const auth = getAdminAuth();
    // checkRevoked: true ensures we catch revoked sessions
    const decoded = await auth.verifySessionCookie(sessionCookie, true);
    return decoded;
  } catch {
    return null;
  }
}

export { SESSION_COOKIE_NAME, SESSION_EXPIRY_MS };
