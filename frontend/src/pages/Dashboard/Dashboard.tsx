import { useState } from "react";
import type { ScrapeResult } from "../../types/types";
import "./Dashboard.css";

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
		<div className='container'>
			<h1>University Scraper</h1>

			<div className='inputRow'>
				<input
					value={url}
					onChange={(e) => setUrl(e.target.value)}
					placeholder='Enter university URL'
				/>

				<button onClick={scrape} disabled={loading}>
					{loading ? "Scraping..." : "Scrape"}
				</button>
			</div>

			{error && <p style={{ color: "red" }}>{error}</p>}

			{valueResult?.programs?.map((program) => (
				<div className='card' key={program.name}>
					<h3>{program.name}</h3>

					<p className='meta'>
						<strong>Stopień:</strong> {program.degreeType}
					</p>

					<p className='meta'>
						<strong>Tryb:</strong> {program.studyMode}
					</p>

					<p className='meta'>{program.description}</p>
				</div>
			))}
		</div>
	);
}
