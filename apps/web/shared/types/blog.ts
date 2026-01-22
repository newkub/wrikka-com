export interface BlogPost {
	slug: string;
	title: string;
	excerpt: string;
	description: string;
	date: string;
	category: string | null;
	categories?: string[];
	tags: string[];
}
