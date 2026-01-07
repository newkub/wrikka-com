export interface Project {
	name: string;
	description: string;
	tags: string[];
	imageUrl: string;
	url?: string;
	githubUrl?: string;
	faviconUrl?: string;
	isPinned?: boolean;
	languages?: string[];
	stars?: number;
	forks?: number;
	issues?: number;
	lastUpdated?: string;
	license?: string;
	demoUrl?: string;
	documentationUrl?: string;
	createdAt?: string;
	archived?: boolean;
	fork?: boolean;
	size?: number;
	topics?: string[];
	contributors?: number;
	releases?: number;
}
