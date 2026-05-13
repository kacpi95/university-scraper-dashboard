import { useState } from "react";
import type { ScrapeResult } from "../../types/types";

export default function Dashboard() {
	const [url, setUrl] = useState<string>("");
	const [valueResult, setValueResult] = useState<ScrapeResult | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const scrape = async () => {
		try {
			setLoading(true);
			setError("");

			const response = await fetch("http://localhost:3000/scrape", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ url }),
			});

			if (!response.ok) {
				throw new Error("Request failed");
			}

			const data: ScrapeResult = await response.json();
			setValueResult(data);
		} catch (error) {
			setError("Failed to scrape university page");
		} finally {
			setLoading(false);
		}
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

			{loading && <p>Loading...</p>}
			{error && <p>{error}</p>}

			{valueResult?.programs?.map((program) => (
				<div key={program.name} style={{ marginBottom: 20 }}>
					<h3>{program.name}</h3>

					<p>
						<strong>Stopień:</strong> {program.degreeType}
					</p>

					<p>
						<strong>Tryb:</strong> {program.studyMode}
					</p>

					<p>
						<strong>Opis:</strong> {program.description}
					</p>
				</div>
			))}
		</div>
	);
}
