import searchJob from "@/app/api/searchjob";
import SearchResultsClient from "@/components/SearchResultsClient";

type SearchPageProps = {
	params: Promise<{
		word: string;
	}>;
};

export default async function SearchPage({ params }: SearchPageProps) {
	const { word } = await params;
	const jobs = await searchJob(word);
	return (
		<main className="min-h-screen bg-[#0f1020] px-6 py-20 text-white">
			<section className="mx-auto max-w-7xl">
				<div className="mb-10">
					<p className="text-sm uppercase tracking-[0.3em] text-white/60">
						Résultats de recherche
					</p>
					<h1 className="mt-3 text-3xl font-bold md:text-5xl">
						{jobs.length} résultat{jobs.length > 1 ? "s" : ""} pour “
						{decodeURIComponent(word)}”
					</h1>
				</div>

					<SearchResultsClient jobs={jobs} word={word} />
			</section>
		</main>
	);
}
