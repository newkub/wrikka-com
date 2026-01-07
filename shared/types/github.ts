export interface GithubProfile {
	login: string;
	name: string | null;
	avatarUrl: string;
	bio: string | null;
	websiteUrl: string | null;
	email: string | null;
	followers: number;
	following: number;
}

export interface GithubContributionDay {
	date: string;
	contributionCount: number;
	color: string;
}

export interface GithubContributionWeek {
	contributionDays: GithubContributionDay[];
}

export interface GithubContributionCalendar {
	totalContributions: number;
	weeks: GithubContributionWeek[];
}

export interface GithubRepo {
	name: string;
	description: string | null;
	url: string;
	homepageUrl: string | null;
	isFork: boolean;
	isArchived: boolean;
	languages: {
		nodes: Array<{ name: string }>;
	};
	opengraphImageUrl: string;
}

export interface PinnedGithubRepo {
	node: GithubRepo;
}

export interface GithubGraphqlResponse {
	data: {
		user: {
			pinnedItems: {
				nodes: GithubRepo[];
			};
			repositories: {
				nodes: GithubRepo[];
			};
		};
	} | null;
}

export interface GithubEvent {
	id: string;
	type: string;
	repo: {
		name: string;
	};
	payload: {
		action?: string;
		issue?: { title: string; html_url: string };
		pull_request?: { title: string; html_url: string };
		commits?: Array<{ sha: string; message: string }>;
	};
	created_at: string;
}
