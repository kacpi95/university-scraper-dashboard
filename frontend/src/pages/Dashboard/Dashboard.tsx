import { useState } from "react";
import type { ScrapeResult } from "../../types/types";

export default function Dashboard() {
	const [url, setUrl] = useState<string>("");
	const [valueResult, setValueResult] = useState<ScrapeResult | null>(null);

	const scrape = async () => {
		const response = await fetch("http://localhost:3000/scrape", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ url }),
		});

		const data: ScrapeResult = await response.json();
		setValueResult(data);
	};

	return (
		<div>
			<h1>University Scraper</h1>
			<input
				value={url}
				onChange={(e) => setUrl(e.target.value)}
				placeholder='Click university URL'
			/>

			<button onClick={scrape}>Scraper</button>

			{valueResult?.programs?.map((program) => (
				<div key={program.name}>
					<h3>{program.name}</h3>
				</div>
			))}
		</div>
	);
}
