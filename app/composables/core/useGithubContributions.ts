import type { GithubContributionCalendar } from "../../../shared/types/github";
import { useGithubService } from "../services/useGithubService";

export const useGithubContributions = async (username: string) => {
	const service = useGithubService();
	const { data, pending, error, refresh } = await service.getContributionCalendar(username);

	return {
		calendar: data as Ref<GithubContributionCalendar | null>,
		pending,
		error,
		refresh,
	};
};
