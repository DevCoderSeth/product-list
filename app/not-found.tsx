import { Frown } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-2">
      <Frown className="w-12 h-12 text-gray-400" />
      <h2 className="text-xl font-semibold">404 Error</h2>
      <p>The requested page does not exist.</p>
      <Link
        href="/auth/sign-in"
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
      >
        Go Back
      </Link>
    </main>
  );
}
