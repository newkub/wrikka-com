export interface BlogPost {
	id: string;
	title: string;
	excerpt: string;
	content: string;
	date: string;
	readingTime: number;
	path: string;
	slug: string;
	category?: string;
	tags?: readonly string[];
	image?: string;
}
