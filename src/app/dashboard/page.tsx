import { getCurrentUser } from "@/lib/auth/get-user";
import { redirect } from "next/navigation";
import SignOutButton from "@/components/layout/SignOutButton";

export default async function Dashboard() {
  const user = await getCurrentUser();

  // Double-check server-side (middleware handles redirect, but defense in depth)
  if (!user) {
    redirect("/login");
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Arbitrage Dashboard</h1>
          <p className="mt-1 text-sm text-gray-400">
            Signed in as {user.email}
          </p>
        </div>
        <SignOutButton />
      </div>
      <div className="mt-8 rounded-lg border border-gray-800 bg-gray-900 p-12 text-center text-gray-500">
        Coming in Phase 4 — arb table with real-time data from your prediction-market-arbitrage DB
      </div>
    </div>
  );
}
