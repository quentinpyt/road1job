"use client"

import { Search } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import searchJob from "@/app/api/searchjob"
import type { DashboardJob } from "@/hooks/useJobs"

interface SearchBarProps {
  onSearch?: (query: string) => void
  onResults?: (jobs: DashboardJob[]) => void
  placeholder?: string
}

// Helper to map API job to DashboardJob (same logic as in useJobs)
function mapJob(apiJob: any): DashboardJob {
  const salary = apiJob.salary ?? {}
  const geolocation = apiJob.geolocation ?? {}

  return {
    id: String(apiJob.id),
    title: apiJob.name,
    company: apiJob.company,
    location: [geolocation.city, geolocation.country].filter(Boolean).join(", ") || "Non renseignée",
    salary: {
      min: salary.min ?? 0,
      max: salary.max ?? 0,
      currency: salary.currency ?? "€",
    },
    description: apiJob.description,
    skills: (apiJob.skills ?? [])
      .map((skill: any) => (typeof skill === "string" ? skill : skill?.name ?? ""))
      .filter(Boolean),
    level: apiJob.experience || null,
    type: apiJob.type,
  }
}

export function SearchBar({ onSearch, onResults, placeholder = "Rechercher des jobs..." }: SearchBarProps) {
  const [query, setQuery] = useState("")
  const timer = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (timer.current) {
        clearTimeout(timer.current)
      }
    }
  }, [])

  const doSearch = async (q: string) => {
    if (!q.trim()) {
      onResults?.([])
      return
    }

    try {
      const data = await searchJob(encodeURIComponent(q))
      if (Array.isArray(data)) {
        const normalized = data.map(mapJob)
        onResults?.(normalized)
      } else {
        onResults?.([])
      }
    } catch (err) {
      onResults?.([])
    }
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value
    setQuery(v)
    onSearch?.(v)

    if (timer.current) clearTimeout(timer.current)
    // debounce 350ms
    // @ts-ignore setTimeout typing
    timer.current = setTimeout(() => doSearch(v), 350) as unknown as number
  }

  return (
    <div className="w-full max-w-md mx-auto h-12">
      <div className="relative flex items-center gap-3 bg-[var(--app-bg)] rounded-lg px-4 py-3 shadow-sm border border-gray-700">
        <Search className="h-10 w-5 items-center text-[var(--app-fg)] opacity-70" />
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder={placeholder}
          className="flex-1 outline-none bg-transparent text-[var(--app-fg)] placeholder-gray-500"
        />
      </div>
    </div>
  )
}
