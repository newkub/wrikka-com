export interface GithubEvent {
	id: string
	type: string
	actor: {
		login: string
		avatar_url: string
	}
	repo: {
		name: string
		url: string
	}
	created_at: string
	payload: any
}

export interface GithubProfile {
	login: string
	name: string | null
	bio: string | null
	company: string | null
	location: string | null
	blog: string | null
	twitter_username: string | null
	avatar_url: string
	html_url: string
	followers: number
	following: number
	public_repos: number
}

export interface GithubContributionCalendar {
	weeks: number[][]
	totalContributions: number
	years: number[]
}
