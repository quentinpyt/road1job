"use client"

import { useState } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { AppSidebar } from "@/compenent/Dashboard_Component/app-sidebar"
import { SearchBar } from "@/compenent/Dashboard_Component/SearchBar"
import { FilterTabs } from "@/compenent/Dashboard_Component/FilterTabs"
import { JobList } from "@/compenent/Dashboard_Component/JobListColumn"
import { JobDetail } from "@/compenent/Dashboard_Component/JobDetail"
import mockJobs from "@/data/mock-jobs.json"

export default function DashboardPage() {
  const [selectedJob, setSelectedJob] = useState(null)
  const [activeTab, setActiveTab] = useState("Nouveau")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <TooltipProvider>
      <SidebarProvider>
        <div className="flex h-screen w-full overflow-hidden relative">
          <AppSidebar />
          <main className="flex-1 flex gap-0 min-w-0 overflow-hidden bg-white relative z-20">
            {/* Column 1: Search, Filters, Job List */}
            <div className="w-2/5 flex flex-col min-w-0 bg-white border-r border-gray-200 p-6 overflow-hidden">
              <SearchBar onSearch={setSearchQuery} placeholder="Ex : Développeur web à paris" />

              <div className="mt-6">
                <FilterTabs activeTab={activeTab} onTabChange={setActiveTab} />
              </div>

              <div className="mt-6 flex-1 min-h-0">
                <JobList
                  jobs={mockJobs}
                  selectedJob={selectedJob}
                  onSelectJob={setSelectedJob}
                />
              </div>
            </div>

            {/* Column 2: Job Detail */}
            <div className="w-3/5 flex flex-col bg-[#1a1433] min-w-0 overflow-hidden">
              <JobDetail job={selectedJob} onClose={() => setSelectedJob(null)} />
            </div>
          </main>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  )
}