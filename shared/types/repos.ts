export interface Repo {
	id: number;
	name: string;
	full_name: string;
	description: string | null;
	html_url: string;
	language: string | null;
	stargazers_count: number;
	forks_count: number;
	open_issues_count?: number;
	pulls_count?: number;
	updated_at: string;
	topics: string[];
	fork: boolean;
	archived: boolean;
	readme?: string | null;
	commits?: Array<{
		sha: string;
		message: string;
		date: string;
		url: string;
	}>;
}
