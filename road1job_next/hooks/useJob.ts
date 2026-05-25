import { useState, useEffect } from "react";

export interface Job {
  job: {
    id: number;
    name: string;
    company: string;
    description: string;
    descriptionmini: string;
    type: string;
    experience?: number;
    image?: string;
    skills: Array<{
      id: number;
      name: string;
      value?: number;
    }>;
    geolocation?: {
      id: number;
      latitude: number;
      longitude: number;
      city?: string;
      country?: string;
    };
    salary?: {
      id: number;
      min: number;
      max: number;
      currency?: string;
    };
  };
}

export function useJob(jobId: string) {
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!jobId) { 
      setLoading(false);
      return;
    }

    const fetchJob = async () => {
      try {
        setLoading(true);
        setError(null);

        const baseUrl = process.env.NEXT_PUBLIC_URL_THE_JOB || "http://localhost:3001/jobs";
        const url = `${baseUrl}/${jobId}`;

        const response = await fetch(url, {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch job: ${response.statusText}`);
        }

        const data = await response.json();
        setJob(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error";
        setError(errorMessage);
        console.error("Error fetching job:", errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  return { job, loading, error };
}
