export interface Program {
	name: string;
	degreeType: string;
	studyModes: string[];
	description: string;
}

export interface ScrapeResult {
	success: boolean;
	sourceUrl: string;
	parserUsed: string;
	warnings: string[];
	programs: Program[];
}

export interface UrlFormProps {
	url: string;
	loading: boolean;
	onUrlChange: (value: string) => void;
	onSubmit: () => void;
}
