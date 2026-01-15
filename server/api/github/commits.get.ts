export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig()
	const githubUsername = config.public.githubUsername
	const repoName = getRouterParam(event, 'repo')

	if (!githubUsername) {
		throw createError({
			statusCode: 400,
			statusMessage: "GitHub username is not configured",
		})
	}

	if (!repoName) {
		throw createError({
			statusCode: 400,
			statusMessage: "Repository name is required",
		})
	}

	try {
		const response = await fetch(`https://api.github.com/repos/${githubUsername}/${repoName}/commits?per_page=3`, {
			headers: {
				Authorization: `Bearer ${config.githubToken}`,
				Accept: "application/vnd.github.v3+json",
			},
		})

		if (!response.ok) {
			throw createError({
				statusCode: response.status,
				statusMessage: `GitHub API error: ${response.statusText}`,
			})
		}

		const data = await response.json()

		return data.map((commit: any) => ({
			sha: commit.sha.substring(0, 7),
			message: commit.commit.message.split('\n')[0],
			author: commit.commit.author.name,
			date: commit.commit.author.date,
			url: commit.html_url,
		}))
	}
	catch {
		throw createError({
			statusCode: 500,
			statusMessage: "Failed to fetch GitHub commits",
		})
	}
})
