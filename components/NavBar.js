"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const { isAuthenticated, user, logout } = useAuth();
  const pathname = usePathname();

  return (
    <nav className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-bold text-indigo-600">
          PostHub
        </Link>

        <div className="flex items-center gap-4 text-sm">
          <Link
            href="/posts"
            className={`transition-colors hover:text-indigo-600 ${pathname === '/posts' ? 'font-semibold text-indigo-600' : 'text-slate-600'}`}
          >
            Posts
          </Link>
          <Link
            href="/admin"
            className={`transition-colors hover:text-indigo-600 ${pathname === '/admin' ? 'font-semibold text-indigo-600' : 'text-slate-600'}`}
          >
            Admin
          </Link>
          
          {!isAuthenticated ? (
            <Link
              href="/login"
              className="rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white
                         transition-colors hover:bg-indigo-700"
            >
              Login
            </Link>
          ) : (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="font-medium text-slate-700">{user?.name}</span>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500">
                  {user?.role}
                </span>
              </div>
              <button
                onClick={logout}
                className="rounded-lg border border-slate-200 px-4 py-2 font-medium text-slate-600 transition-colors hover:bg-slate-50"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
