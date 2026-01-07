export interface BlogPost {
	slug: string;
	title: string;
	description: string;
	html: string;
	date?: string;
	tags?: string[];
	imageUrl?: string;
}

export type Post = BlogPost;
