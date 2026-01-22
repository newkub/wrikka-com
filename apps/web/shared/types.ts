// Shared types for the application
export interface BlogPost {
	slug: string;
	title: string;
	excerpt: string;
	content: string;
	date: string;
	category: string | null;
	tags: string[];
	author?: string;
	readingTime?: number;
	updatedDate?: string;
	cover?: string;
}
