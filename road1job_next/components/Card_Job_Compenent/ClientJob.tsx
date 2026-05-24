"use client";

import { useState, useEffect } from "react";
import CardJob from "./CardJob";
import useJobs from "@/hooks/useJobs";
import getTheJob from "@/app/api/getthejob";
import { useRouter } from "next/navigation";
export default function ClientJobs() {
  const [visible, setVisible] = useState(3);
  const jobs = useJobs();
  const router = useRouter();
  // utilise useEffect pour récupérer les données des jobs depuis l'API lorsque le composant est monté


  type job = {
    id: string;
    name: string;
    company: string;
    skills: string[];
    type: string;
    experience: string;
    salary: {
      min: number;
      max: number;
    };
    geolocation: {
      city: string;
      country: string;
    };
  };
  return (
    
    <>
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
        {jobs.slice(0, visible).map((job: job) => (
          <CardJob
            key={job.id}
            name={job.name}
            company={job.company}
            skills={job.skills}
            salary={job.salary}
            geolocation={job.geolocation}
            job={job.experience}
            type={job.type}
            id={job.id}
            onClick={() => router.push(`/job/${job.id}`)}
          />
        ))}
      </div>
      {visible < jobs.length && (
        <button
          className="btn btn-primary mt-4 text-white font-bold  cursor-pointer"
          onClick={() => setVisible(visible + 3)}
        >
          Voir plus
        </button>
      )}
      {visible >= jobs.length && (
        <a
          href="/Login"
          className="btn btn-primary mt-5 text-white mx-auto font-bold  cursor-pointer"
        >
          Connectez-vous pour accéder à toutes les offres !
        </a>
      )}
    </>
  );
}
