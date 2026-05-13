export interface Program {
	name: string;
	degreeType: string;
	studyMode: string;
	description: string;
}

export interface ScrapeResult {
	success: boolean;
	programs: Program[];
}
