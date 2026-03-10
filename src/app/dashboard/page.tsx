import { getCurrentUser } from "@/lib/auth/get-user";
import { redirect } from "next/navigation";
import SignOutButton from "@/components/layout/SignOutButton";
import ManageSubscription from "@/components/dashboard/ManageSubscription";
import StatsBar from "@/components/dashboard/StatsBar";
import ArbTable from "@/components/dashboard/ArbTable";

export default async function Dashboard() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
        <div>
          <h1 className="font-serif text-2xl font-bold">
            Arb Desk
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">{user.email}</p>
        </div>
        <div className="flex items-center gap-2">
          <ManageSubscription />
          <SignOutButton />
        </div>
      </div>

      <StatsBar />
      <ArbTable />
    </div>
  );
}
