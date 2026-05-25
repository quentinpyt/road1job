

import getTheJob from "@/app/api/getthejob";
import { promises } from "dns";

type props = {
    params: Promise<{
        id: string;
        }>;
}


export default async function Job({ params }: props) {
    const {id} = await params;
    const job = await getTheJob(id);
    console.log(id);
    console.log(job);
    const paragraphs = [];
    const words = job.job.description.split(" ");

    for (let i = 0; i < words.length; i += 80) {
    paragraphs.push(words.slice(i, i + 80).join(" "));
}
    return ( 
            
             
        <div className="w-auto h-auto overflow-y-auto flex items-center justify-center ">
           
                    <div className="w-[80%] h-screen border overflow-y-auto flex flex-col p-4 gap-4 rounded-lg bg-[#1D152F] mx-auto mt-30">
                        <h1 className="text-4xl font-bold">{job.job.company}</h1>
                        <h2 className="text-2xl font-bold">{job.job.name}</h2>
                        <p className="location">{job.job.geolocation?.city || "Non spécifié"} - {job.job.geolocation?.country=="none" ? "" : job.job.geolocation?.country}</p>
                        <p className="contract">Contrat : {job.job.type}</p>

                        <div className="meta">
                            <p>Salaire : {job.job.salary?.min || "Non spécifié"} - {job.job.salary?.max || "Non spécifié"} {job.job.salary?.currency=="none" ? "" : job.job.salary?.currency}</p>
                        </div>
                    
                        <div className="flex  md:flex flex-wrap gap-2">
                        
                        {job.job.skills?.map((skill: any) => (
                            <span key={skill.id} className="badge badge-primary p-2">{skill.name}</span>
                        ))}
                        </div>
                            <div className="space-y-6 leading-8 text-lg text-center mt-10">
                            {paragraphs.map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                            </div>
                    </div>
                </div>
        
        
    )
}