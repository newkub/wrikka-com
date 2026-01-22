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
		const response = await fetch(`https://api.github.com/users/${githubUsername}`, {
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

		return {
			login: data.login,
			name: data.name,
			bio: data.bio,
			avatar_url: data.avatar_url,
			html_url: data.html_url,
			blog: data.blog,
			location: data.location,
			company: data.company,
			followers: data.followers,
			following: data.following,
			public_repos: data.public_repos,
			created_at: data.created_at,
			twitter_username: data.twitter_username,
		};
	} catch {
		throw createError({
			statusCode: 500,
			statusMessage: "Failed to fetch GitHub profile",
		});
	}
});
