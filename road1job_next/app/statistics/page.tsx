import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import StatisticsPageClient from "@/components/Dashboard_Component/StatisticsPageClient";

export default async function StatisticsPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/Login");
  }

  return <StatisticsPageClient />;
}
