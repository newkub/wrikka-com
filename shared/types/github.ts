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
