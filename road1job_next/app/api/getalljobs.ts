



export default async function getAllJobs() {
    const jobs = await fetch("http://localhost:3001/getalljob").then((res) => res.json());
    return jobs;
}