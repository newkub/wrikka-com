export default defineEventHandler(async () => {
	const config = useRuntimeConfig();
	const githubUsername = config.public.githubUsername;

	if (!githubUsername) {
		throw createError({
			statusCode: 400,
			statusMessage: "GitHub username is not configured",
		});
	}

	try {
		const response = await fetch(`https://api.github.com/users/${githubUsername}/events/public?per_page=100`, {
			headers: {
				Authorization: `Bearer ${config.githubToken}`,
				Accept: "application/vnd.github.v3+json",
			},
		});

		if (!response.ok) {
			throw createError({
				statusCode: response.status,
				statusMessage: `GitHub API error: ${response.statusText}`,
			});
		}

		const events = await response.json();

		const contributions: Record<string, number> = {};

		const today = new Date();
		const oneYearAgo = new Date(today);
		oneYearAgo.setFullYear(today.getFullYear() - 1);

		events.forEach((event: any) => {
			const date = new Date(event.created_at);
			if (date >= oneYearAgo) {
				const dateKey = date.toISOString().split("T")[0]!;
				contributions[dateKey] = (contributions[dateKey] || 0) + 1;
			}
		});

		const weeks: number[][] = [];
		let currentWeek: number[] = [];
		let currentDate = new Date(oneYearAgo);
		currentDate.setDate(currentDate.getDate() - currentDate.getDay());

		for (let i = 0; i < 53; i++) {
			currentWeek = [];
			for (let j = 0; j < 7; j++) {
				const dateKey = currentDate.toISOString().split("T")[0]!;
				currentWeek.push(contributions[dateKey] || 0);
				currentDate.setDate(currentDate.getDate() + 1);
			}
			weeks.push(currentWeek);
		}

		return {
			weeks,
			totalContributions: events.length,
			years: oneYearAgo.getFullYear() === today.getFullYear()
				? [today.getFullYear()]
				: [oneYearAgo.getFullYear(), today.getFullYear()],
		};
	} catch {
		throw createError({
			statusCode: 500,
			statusMessage: "Failed to fetch GitHub activity",
		});
	}
});
