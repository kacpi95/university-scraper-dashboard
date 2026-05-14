import type { UrlFormProps } from "../../types/types";

export default function UrlForm({
	url,
	loading,
	onUrlChange,
	onSubmit,
}: UrlFormProps) {
	return (
		<div className='inputRow'>
			<input
				value={url}
				onChange={(e) => onUrlChange(e.target.value)}
				placeholder='Enter university URL'
			/>

			<button onClick={onSubmit} disabled={loading || !url.trim()}>
				{loading ? "Scraping..." : "Scrape"}
			</button>
		</div>
	);
}
