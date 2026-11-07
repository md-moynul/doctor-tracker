"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useIsAuthenticated } from "@/lib/auth-client";

const PUBLIC_PATHS = ["/login", "/signup", "/signin"];

export default function AuthGuard() {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, isLoading } = useIsAuthenticated();

  const isPublicPage = PUBLIC_PATHS.some(
    (path) => pathname === path || pathname?.startsWith(`${path}/`)
  );

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated && !isPublicPage) {
      router.replace("/login");
    } else if (isAuthenticated && isPublicPage) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, isLoading, isPublicPage, router]);

  return null;
}
