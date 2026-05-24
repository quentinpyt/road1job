




export default function getTheJob(id: string) {
    const data = fetch(`${process.env.NEXT_PUBLIC_URL_THE_JOB!}/${id}`).then((res) => res.json());
    return data;
}