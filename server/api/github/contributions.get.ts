export default defineEventHandler(async (event) => {
	const query = getQuery(event);
	const username = typeof query.username === "string" ? query.username : "";

	if (!username) {
		throw createError({ statusCode: 400, statusMessage: "Missing username" });
	}

	const config = useRuntimeConfig(event);
	const token = typeof config.githubToken === "string" && config.githubToken.length > 0 ? config.githubToken : null;

	if (!token) {
		return null;
	}

	return getGitHubContributions(username, token);
});
