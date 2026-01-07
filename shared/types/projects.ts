export interface Project {
	name: string;
	description: string;
	tags: string[];
	imageUrl: string;
	url?: string;
	githubUrl?: string;
	faviconUrl?: string;
	isPinned?: boolean;
}
