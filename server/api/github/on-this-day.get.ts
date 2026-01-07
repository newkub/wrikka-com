import type { GithubEvent } from "../../../shared/types/github";

export default defineEventHandler(async () => {
	const config = useRuntimeConfig();
	const { githubToken, public: { githubUsername } } = config;

	if (!githubToken || !githubUsername) {
		return [];
	}

	try {
		const allEvents = await $fetch<GithubEvent[]>(
			`https://api.github.com/users/${githubUsername}/events/public?per_page=100`,
			{
				headers: {
					Authorization: `bearer ${githubToken}`,
				},
			},
		);

		const today = new Date();
		const currentMonth = today.getMonth();
		const currentDay = today.getDate();

		const memories = allEvents
			.map(event => ({ ...event, created_at_date: new Date(event.created_at) }))
			.filter(event => {
				const eventYear = event.created_at_date.getFullYear();
				const eventMonth = event.created_at_date.getMonth();
				const eventDay = event.created_at_date.getDate();
				return eventYear < today.getFullYear() && eventMonth === currentMonth && eventDay === currentDay;
			});

		return memories.slice(0, 5); // Return up to 5 memories
	} catch (error) {
		console.error("Error fetching GitHub events:", error);
		return [];
	}
});
