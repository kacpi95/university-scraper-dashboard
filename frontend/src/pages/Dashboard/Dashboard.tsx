import { useState } from "react";
import type { ScrapeResult } from "../../types/types";
import "./Dashboard.css";
import ResultSummary from "../../components/ResultSummary/ResultSummary";
import ProgramCard from "../../components/ProgramCard/ProgramCard";

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

	const downloadJson = () => {
		if (!valueResult) return;

		const blob = new Blob([JSON.stringify(valueResult, null, 2)], {
			type: "application/json",
		});

		const link = document.createElement("a");
		link.href = URL.createObjectURL(blob);
		link.download = "scrape-result.json";
		link.click();
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

				<button onClick={scrape} disabled={loading || !url.trim()}>
					{loading ? "Scraping..." : "Scrape"}
				</button>
			</div>

			{error && <p style={{ color: "red" }}>{error}</p>}

			{valueResult && <ResultSummary result={valueResult} />}

			{valueResult?.programs?.map((program) => (
				<ProgramCard key={program.name} program={program} />
			))}

			{valueResult && <button onClick={downloadJson}>Download JSON</button>}
		</div>
	);
}
