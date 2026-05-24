"use client";

import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppSidebar } from "@/components/Dashboard_Component/app-sidebar";
import { SearchBar } from "@/components/Dashboard_Component/SearchBar";
import { FilterTabs } from "@/components/Dashboard_Component/FilterTabs";
import { JobList } from "@/components/Dashboard_Component/JobListColumn";
import { JobDetail } from "@/components/Dashboard_Component/JobDetail";
import BtnNight from "@/components/ui/btnNight";
import useJobs, { type DashboardJob } from "@/hooks/useJobs";

export default function DashboardClient() {
  const jobs = useJobs();
  const [selectedJob, setSelectedJob] = useState<DashboardJob | null>(null);
  const [activeTab, setActiveTab] = useState("Nouveau");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<DashboardJob[] | null>(null);

  const visibleJobs = searchResults !== null
    ? searchResults
    : jobs.filter((job) => {
        const query = searchQuery.trim().toLowerCase();

        if (!query) {
          return true;
        }

        return [job.title, job.company, job.location, job.description, job.type, job.level, ...job.skills]
          .join(" ")
          .toLowerCase()
          .includes(query);
      });

  return (
    <TooltipProvider>
        
      <SidebarProvider>
        <div className="flex h-screen w-full overflow-hidden relative">
          <AppSidebar />
          <main className="flex-1 flex gap-0 min-w-0 overflow-hidden bg-[var(--app-bg)] relative z-20">
            {/* Column 1: Search, Filters, Job List */}
            
            <div className="w-2/5 flex flex-col min-w-0 bg-[var(--app-bg)] border-r border-gray-700 p-6 overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <BtnNight />
              </div>
              <SearchBar
                onSearch={(q) => {
                  setSearchQuery(q)
                  if (!q.trim()) setSearchResults(null)
                }}
                onResults={(jobs) => setSearchResults(jobs)}
                placeholder="Ex : Développeur web à paris"
              />

              <div className="mt-6">
                
                <FilterTabs activeTab={activeTab} onTabChange={setActiveTab} />
              </div>

              <div className="mt-4 flex-1 min-h-0">
                <JobList
                  jobs={visibleJobs}
                  selectedJob={selectedJob}
                  onSelectJob={setSelectedJob}
                />
              </div>
            </div>

            {/* Column 2: Job Detail */}
            <div className="w-3/5 flex flex-col bg-[var(--app-bg)] min-w-0 overflow-hidden">
              <JobDetail
                job={selectedJob}
                onClose={() => setSelectedJob(null)}
              />
            </div>
          </main>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  );
}
