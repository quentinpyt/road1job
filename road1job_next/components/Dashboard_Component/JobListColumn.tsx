"use client"

import { Heart } from "lucide-react"

interface Job {
  id: string
  title: string
  company: string
  location: string
  salary: { min: number; max: number; currency: string }
  description: string
  skills: string[]
  level: string | null
  type: string
}

interface JobListProps {
  jobs: Job[]
  selectedJob: Job | null
  onSelectJob: (job: Job) => void
}

export function JobList({ jobs, selectedJob, onSelectJob }: JobListProps) {
  if (!jobs.length) {
    return (
      <div className="space-y-4 bg-[var(--app-bg)] overflow-y-auto pr-2">
        <div className="offer-card border-l-4 border-l-gray-700 bg-[var(--app-bg)] p-4 rounded">
          <p className="text-sm text-[var(--app-fg)] opacity-70">Aucune offre trouvée pour le moment.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4 overflow-y-auto pr-2">
      {jobs.map((job) => (
        <div
          key={job.id}
          onClick={() => onSelectJob(job)}
          className={`offer-card cursor-pointer transition-all border-l-4 bg-[var(--app-bg)] p-4 rounded ${
            selectedJob?.id === job.id
              ? "border-l-indigo-500 shadow-lg"
              : "border-l-gray-300 hover:shadow-md"
          }`}
        >
          <div className="flex justify-between items-start gap-3">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-black text-lg">{job.title}</h3>
              <p className="text-sm text-black opacity-80 mt-1">{job.company}</p>
              <p className="text-xs text-black opacity-70">{job.location}</p>

              <div className="flex gap-3 mt-3 text-sm">
                <span className="text-black opacity-80">
                  <strong>Contrat:</strong> {job.type}
                </span>
                <span className="text-black opacity-80">
                  <strong>Niveau:</strong> {job.level}
                </span>
              </div>

              <p className="font-bold text-black mt-3 text-base">
                {job.salary.currency}{job.salary.min} - {job.salary.currency}{job.salary.max}
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {job.skills?.slice(0, 3).map((skill) => (
                  <span key={skill} className="text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <button className="text-black opacity-60 hover:text-red-500 flex-shrink-0 mt-1">
              <Heart className="h-5 w-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
