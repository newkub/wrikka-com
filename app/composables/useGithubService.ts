import type { GithubContributionCalendar, GithubProfile } from "~~/shared/types/github";

export const useGithubService = () => {
	const getProfile = (username: string) => {
		return useFetch<GithubProfile>("/api/github/profile", {
			params: { username },
		});
	};

	const getContributionCalendar = (username: string) => {
		return useFetch<GithubContributionCalendar | null>("/api/github/contributions", {
			params: { username },
		});
	};

	return { getProfile, getContributionCalendar };
};
