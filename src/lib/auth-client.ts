import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
});

export const { signIn, signUp, useSession, signOut } = authClient;

/**
 * Client-side React hook to check if user is authenticated.
 * Usage:
 * const { isAuthenticated, user, isLoading } = useIsAuthenticated();
 */
export function useIsAuthenticated() {
  const { data: session, isPending, error } = useSession();
  return {
    isAuthenticated: !!session?.user,
    user: session?.user ?? null,
    session,
    isLoading: isPending,
    error,
  };
}
