import { useState } from "react";

type ScrapeResult = unknown;

export default function Dashboard() {
	const [url, setUrl] = useState<string>("");
	const [valueResult, setValueResult] = useState<any>(null);

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

			{valueResult && <pre>{JSON.stringify(valueResult, null, 2)}</pre>}
		</div>
	);
}
