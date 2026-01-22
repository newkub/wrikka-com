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
		const response = await fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=6`, {
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

		const data = await response.json();

		return data.map((repo: any) => ({
			id: repo.id,
			name: repo.name,
			full_name: repo.full_name,
			description: repo.description,
			html_url: repo.html_url,
			language: repo.language,
			stargazers_count: repo.stargazers_count,
			forks_count: repo.forks_count,
			updated_at: repo.updated_at,
			topics: repo.topics || [],
			fork: repo.fork,
			archived: repo.archived,
		}));
	} catch {
		throw createError({
			statusCode: 500,
			statusMessage: "Failed to fetch GitHub repositories",
		});
	}
});
