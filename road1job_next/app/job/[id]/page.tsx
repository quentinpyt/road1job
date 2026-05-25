import { JobPageClient } from "@/components/JobPageClient";

type props = {
    params: Promise<{
        id: string;
    }>;
}

export default async function Job({ params }: props) {
    const { id } = await params;

    return <JobPageClient jobId={id} />;
}
