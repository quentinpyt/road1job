"use client"

import { useRouter } from "next/navigation";
import CardJob from "@/components/Card_Job_Compenent/CardJob";

type Props = {
  jobs: any[];
  word: string;
};

export default function SearchResultsClient({ jobs, word }: Props) {
  const router = useRouter();

  return (
    <>
      {jobs.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {jobs.map((job: any) => (
            <CardJob
              key={job.id}
              id={job.id}
              name={job.name}
              company={job.company}
              skills={job.skills}
              salary={job.salary}
              geolocation={job.geolocation}
              type={job.type}
              level={job.experience}
              onClick={() => router.push(`/job/${job.id}`)}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center text-white/70">
          Aucun job trouvé pour ce mot-clé.
        </div>
      )}
    </>
  );
}
