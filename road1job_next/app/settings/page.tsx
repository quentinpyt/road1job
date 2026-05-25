import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SkillsSelector } from "@/components/SkillsSelector";

export default async function SettingsPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/Login");
  }

  return (
    <div className="min-h-screen bg-[#1D152F] text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Paramètres</h1>

        <div className="card bg-base-100 shadow-md p-8">
          <SkillsSelector />
        </div>
      </div>
    </div>
  );
}
