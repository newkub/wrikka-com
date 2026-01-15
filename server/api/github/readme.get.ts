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
		const response = await fetch(`https://api.github.com/repos/${githubUsername}/${githubUsername}/readme`, {
			headers: {
				Authorization: `Bearer ${config.githubToken}`,
				Accept: "application/vnd.github.v3+json",
			},
		})

		if (!response.ok) {
			if (response.status === 404) {
				return {
					content: "# No README found",
					html: "<h1>No README found</h1>",
				}
			}
			throw createError({
				statusCode: response.status,
				statusMessage: `GitHub API error: ${response.statusText}`,
			})
		}

		const data = await response.json()

		const content = Buffer.from(data.content, "base64").toString("utf-8")

		return {
			content,
			html: data.html_url,
		}
	}
	catch {
		throw createError({
			statusCode: 500,
			statusMessage: "Failed to fetch GitHub README",
		})
	}
})
