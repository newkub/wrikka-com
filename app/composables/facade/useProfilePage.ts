import { computed, ref } from "vue";
import { useGithubContributions } from "../core/useGithubContributions";
import { useGithubProfile } from "../core/useGithubProfile";

export const useProfilePage = async (username: string) => {
	if (!username) {
		const profile = ref(null);
		const calendar = ref(null);
		const pending = ref(false);
		const error = ref(null);

		return {
			profile,
			calendar,
			pending,
			error,
			profilePending: pending,
			calendarPending: pending,
			profileError: error,
			calendarError: error,
		};
	}

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

