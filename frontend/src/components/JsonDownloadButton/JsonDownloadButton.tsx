import type { ScrapeResult } from "../../types/types";

type JsonDownloadButtonProps = {
	result: ScrapeResult;
};

export default function JsonDownloadButton({
	result,
}: JsonDownloadButtonProps) {
	const downloadJson = () => {
		const blob = new Blob([JSON.stringify(result, null, 2)], {
			type: "application/json",
		});

		const link = document.createElement("a");
		link.href = URL.createObjectURL(blob);
		link.download = "scrape-result.json";
		link.click();
	};

	return <button onClick={downloadJson}>Download JSON</button>;
}
