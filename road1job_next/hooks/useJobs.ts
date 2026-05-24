import { useEffect, useState } from "react";
import getAllJobs from "@/app/api/getalljobs";

export type DashboardJob = {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: { min: number; max: number; currency: string };
  description: string;
  skills: string[];
  level: string | null;
  type: string;

};

type ApiJob = {
  id: number;
  name: string;
  company: string;
  description: string;
  type: string;
  experience?: string | null;
  salary?: {
    min?: number;
    max?: number;
    currency?: string | null;
  } | null;
  geolocation?: {
    city?: string | null;
    country?: string | null;
  } | null;
  skills?: Array<{ name?: string | null } | string>;
};


function mapJob(apiJob: ApiJob): DashboardJob {
  const salary = apiJob.salary ?? {};
  const geolocation = apiJob.geolocation ?? {};

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
      .map((skill) => (typeof skill === "string" ? skill : skill?.name ?? ""))
      .filter(Boolean),
    level: apiJob.experience || null,
    type: apiJob.type,
  };
}

export default function useJobs() {
  const [jobs, setJobs] = useState<DashboardJob[]>([]);

  useEffect(() => {
    async function fetchJobs() {
      const data = await getAllJobs();
      const normalizedJobs = Array.isArray(data) ? data.map(mapJob) : [];
      setJobs(normalizedJobs);
    }

    fetchJobs();
  }, []);

  return jobs;
}