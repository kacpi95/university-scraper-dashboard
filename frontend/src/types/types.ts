export interface Program {
	name: string;
}

export interface ScrapeResult {
	success: boolean;
	programs: Program[];
}
