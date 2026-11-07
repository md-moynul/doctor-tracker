import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Retrieves the current session on the server (Server Components, Route Handlers, Server Actions).
 * Returns { session, user } if logged in, or null if not authenticated.
 */
export async function getServerSession() {
  try {
    return await auth.api.getSession({
      headers: await headers(),
    });
  } catch (error) {
    console.error("Failed to retrieve server session:", error);
    return null;
  }
}

/**
 * Returns true if the current user is authenticated, false otherwise.
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await getServerSession();
  return !!session;
}

/**
 * Ensures the user is authenticated before accessing a page or server action.
 * If not authenticated, redirects the user to the login page.
 * If authenticated, returns the session data (including user profile).
 */
export async function requireAuth(redirectTo: string = "/login") {
  const session = await getServerSession();

  if (!session) {
    redirect(redirectTo);
  }

  return session;
}

