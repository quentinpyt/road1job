"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppSidebar } from "@/components/Dashboard_Component/app-sidebar";
import StatisticsClient from "@/components/Dashboard_Component/StatisticsClient";
import BtnNight from "@/components/ui/btnNight";

export default function StatisticsPageClient() {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <div className="flex h-screen w-full overflow-hidden relative">
          <AppSidebar />
          <main className="flex-1 flex gap-0 min-w-0 overflow-hidden bg-[var(--app-bg)] relative z-20">
            <div className="w-full flex flex-col min-w-0 bg-[var(--app-bg)] overflow-y-auto">
              <div className="flex justify-between items-center p-6 border-b border-gray-700">
                <BtnNight />
              </div>
              <StatisticsClient />
            </div>
          </main>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  );
}
