import type { ScrapeResult } from "../types/types";

type ResultSummaryProps = {
	result: ScrapeResult;
};

export default function ResultSummary({ result }: ResultSummaryProps) {
	return (
		<div className='summary'>
			<p>
				<strong>Źródło:</strong> {result.sourceUrl}
			</p>
			<p>
				<strong>Parser:</strong> {result.parserUsed}
			</p>
			<p>
				<strong>Liczba kierunków:</strong> {result.programs.length}
			</p>
		</div>
	);
}
