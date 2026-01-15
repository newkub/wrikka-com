export default defineEventHandler(async () => {
	const config = useRuntimeConfig()
	const githubUsername = config.public.githubUsername

	if (!githubUsername) {
		throw createError({
			statusCode: 400,
			statusMessage: "GitHub username is not configured",
		})
	}

	try {
		const response = await fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=100`, {
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

		const repos = data.map((repo: any) => ({
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
		}))

		const reposWithCommits = await Promise.all(
			repos.slice(0, 12).map(async (repo: any) => {
				try {
					const commitsResponse = await fetch(`https://api.github.com/repos/${githubUsername}/${repo.name}/commits?per_page=3`, {
						headers: {
							Authorization: `Bearer ${config.githubToken}`,
							Accept: "application/vnd.github.v3+json",
						},
					})

					if (commitsResponse.ok) {
						const commitsData = await commitsResponse.json()
						const commits = commitsData.map((commit: any) => ({
							sha: commit.sha.substring(0, 7),
							message: commit.commit.message.split('\n')[0],
							date: commit.commit.author.date,
							url: commit.html_url,
						}))
						return { ...repo, commits }
					}
				} catch {
					return repo
				}
				return repo
			})
		)

		return reposWithCommits
	}
	catch {
		throw createError({
			statusCode: 500,
			statusMessage: "Failed to fetch GitHub repositories",
		})
	}
})
