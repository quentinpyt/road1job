

export default function searchJob(word: string) {
    const data = fetch(`${process.env.NEXT_PUBLIC_URL_SEARCH_JOB!}${word}`).then((res) => res.json());
    return data;
}