import { useEffect, useState } from "react";
import  getAllJobs  from "@/app/api/getalljobs";

export default function useJobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    async function fetchJobs() {
      const data = await getAllJobs();
      setJobs(data);
    }

    fetchJobs();
  }, []);

  return jobs;
}