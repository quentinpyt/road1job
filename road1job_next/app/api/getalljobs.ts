



export default  function getAllJobs() {
    const jobs =  fetch(process.env.NEXT_PUBLIC_URL_API!).then((res) => res.json());
    return jobs;
}