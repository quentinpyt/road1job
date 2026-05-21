"use client"

import { X } from "lucide-react"

interface Job {
  id: string
  title: string
  company: string
  location: string
  salary: { min: number; max: number; currency: string }
  description: string
  skills: string[]
  level: string
  type: string
}

interface JobDetailProps {
  job: Job | null
  onClose: () => void
}

export function JobDetail({ job, onClose }: JobDetailProps) {
  if (!job) {
    return (
      <div className="flex-1 bg-[#1a1433] border-l border-gray-200 p-8 flex items-center justify-center">
        <p className="text-white-500 text-center">Sélectionnez une offre d'emploi pour voir les détails</p>
      </div>
    )
  }

  return (
    <div className="flex-1 bg-white border-l border-gray-200 overflow-y-auto">
      <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">{job.title}</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 transition"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      <div className="p-8 space-y-8">
        {/* Entreprise */}
        <section>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Entreprise</h3>
          <p className="text-xl text-indigo-600 font-bold">{job.company}</p>
        </section>

        {/* Localisation */}
        <section>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Localisation</h3>
          <p className="text-gray-700">{job.location}</p>
        </section>

        {/* Type de contrat */}
        <section>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Type de contrat</h3>
          <div className="inline-block bg-blue-50 text-blue-700 px-4 py-2 rounded-lg font-medium">
            {job.type}
          </div>
        </section>

        {/* Niveau */}
        <section>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Niveau requis</h3>
          <div className="inline-block bg-purple-50 text-purple-700 px-4 py-2 rounded-lg font-medium">
            {job.level}
          </div>
        </section>

        {/* Salaire */}
        <section>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Salaire</h3>
          <p className="text-2xl font-bold text-gray-900">
            {job.salary.currency}{job.salary.min.toLocaleString()} - {job.salary.currency}{job.salary.max.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500 mt-1">Par an</p>
        </section>

        {/* Description */}
        <section>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
          <p className="text-gray-700 leading-relaxed">{job.description}</p>
        </section>

        {/* Compétences */}
        <section>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Compétences requises</h3>
          <div className="flex flex-wrap gap-3">
            {job.skills.map((skill) => (
              <div
                key={skill}
                className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-lg font-medium text-sm border border-indigo-200"
              >
                {skill}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
