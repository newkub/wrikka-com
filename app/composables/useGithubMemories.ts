import type { GithubEvent } from "../../shared/types/github";

export const useGithubMemories = () => {
	return useFetch<GithubEvent[]>("/api/github/on-this-day", { lazy: true });
};
