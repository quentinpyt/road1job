



export default async function getAllJobs() {
    const jobs = await fetch(process.env.NEXT_PUBLIC_URL_API!).then((res) => res.json());
    return jobs;
}