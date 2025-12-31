import type { GithubProfile } from "~~/shared/types/github";

export default defineEventHandler(async (event) => {
	const query = getQuery(event);
	const username = typeof query.username === "string" ? query.username : "";

	if (!username) {
		throw createError({ statusCode: 400, statusMessage: "Missing username" });
	}

	const config = useRuntimeConfig(event);
	const token = typeof config.githubToken === "string" && config.githubToken.length > 0 ? config.githubToken : null;

	const headers: Record<string, string> = {
		accept: "application/vnd.github+json",
		"user-agent": "wrikka-com",
	};

	if (token) {
		headers.authorization = `Bearer ${token}`;
	}

	const res = await $fetch<{
		login: string;
		name: string | null;
		avatar_url: string;
		bio: string | null;
		blog: string | null;
		email: string | null;
		followers: number;
		following: number;
	}>(`https://api.github.com/users/${encodeURIComponent(username)}`, { headers });

	const profile: GithubProfile = {
		login: res.login,
		name: res.name,
		avatarUrl: res.avatar_url,
		bio: res.bio,
		websiteUrl: res.blog,
		email: res.email,
		followers: res.followers,
		following: res.following,
	};

	return profile;
});
