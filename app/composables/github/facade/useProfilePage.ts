import { useGithubContributions } from "~/composables/github/core/useGithubContributions";
import { useGithubProfile } from "~/composables/github/core/useGithubProfile";

export const useProfilePage = async (username: string) => {
	const [
		{ profile, pending: profilePending, error: profileError },
		{ calendar, pending: calendarPending, error: calendarError },
	] = await Promise.all([useGithubProfile(username), useGithubContributions(username)]);

	return {
		profile,
		calendar,
		pending: computed(() => profilePending.value || calendarPending.value),
		error: computed(() => profileError.value ?? calendarError.value),
		profilePending,
		calendarPending,
		profileError,
		calendarError,
	};
};
