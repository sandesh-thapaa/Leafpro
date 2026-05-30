import Link from "next/link";
import { SearchX } from "lucide-react";

export default function TenantNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-6">
          <SearchX className="h-8 w-8 text-gray-400" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Page not found
        </h1>
        <p className="text-gray-500 mb-8">
          This business doesn&apos;t have a page yet, or the link might be
          incorrect.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 rounded-full bg-accent text-white font-medium hover:bg-accent-dark transition-all"
          >
            Create Your Page
          </Link>
          <Link
            href="/dashboard/login"
            className="inline-flex items-center px-6 py-3 rounded-full border border-gray-200 text-gray-700 font-medium hover:border-gray-300 hover:bg-gray-50 transition-all"
          >
            Dashboard Login
          </Link>
        </div>
      </div>
    </div>
  );
}
