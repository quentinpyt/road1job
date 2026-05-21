"use client";

import { useState, useEffect } from "react";
import CardJob from "./CardJob";
import getAllJobs from "@/app/api/getalljobs";

export default function ClientJobs() {
  const [visible, setVisible] = useState(3);
  const [jobs, setJobs] = useState([]);

  // utilise useEffect pour récupérer les données des jobs depuis l'API lorsque le composant est monté
  useEffect(() => {
    async function fetchJobs() {
      const data = await getAllJobs();
      setJobs(data);
    }
    fetchJobs();
  }, []);

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
      <div className="offers-grid">
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
          />
        ))}
      </div>
      {visible < jobs.length && (
        <button
          className="mt-4 text-white font-bold underline cursor-pointer"
          onClick={() => setVisible(visible + 3)}
        >
          Voir plus
        </button>
      )}
      {visible >= jobs.length && (
        <a
          href="/Login"
          className="mt-5 text-white font-bold underline cursor-pointer"
        >
          <br></br>
          Connectez-vous pour accéder à toutes les offres !
        </a>
      )}
    </>
  );
}
