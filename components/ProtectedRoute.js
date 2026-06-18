"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function ProtectedRoute({ children, requiredRole }) {
  const { loading, isAuthenticated, user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push(`/login?redirect=${pathname}`);
    }
  }, [loading, isAuthenticated, router, pathname]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-12">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
          <h1 className="text-2xl font-bold text-red-700">Access Denied</h1>
          <p className="mt-2 text-red-600">
            You do not have permission to view this page.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
