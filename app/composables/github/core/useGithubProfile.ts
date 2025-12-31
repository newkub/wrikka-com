import { useGithubService } from "~/composables/github/services/useGithubService";
import type { GithubProfile } from "~~/shared/types/github";

export const useGithubProfile = async (username: string) => {
	const service = useGithubService();
	const { data, pending, error, refresh } = await service.getProfile(username);

	return {
		profile: data as Ref<GithubProfile | null>,
		pending,
		error,
		refresh,
	};
};
