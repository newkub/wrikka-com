import type { GithubContributionCalendar } from "~~/shared/types/github";

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

	const to = new Date();
	const from = new Date(to);
	from.setFullYear(to.getFullYear() - 1);

	const body = {
		query:
			`query($login: String!, $from: DateTime!, $to: DateTime!) {\n  user(login: $login) {\n    contributionsCollection(from: $from, to: $to) {\n      contributionCalendar {\n        totalContributions\n        weeks {\n          contributionDays {\n            date\n            contributionCount\n            color\n          }\n        }\n      }\n    }\n  }\n}`,
		variables: {
			login: username,
			from: from.toISOString(),
			to: to.toISOString(),
		},
	};

	const res = await $fetch<
		{ data: { user: { contributionsCollection: { contributionCalendar: GithubContributionCalendar } } } }
	>(
		"https://api.github.com/graphql",
		{
			method: "POST",
			headers: {
				"content-type": "application/json",
				authorization: `Bearer ${token}`,
				"user-agent": "wrikka-com",
			},
			body,
		},
	);

	return res.data.user.contributionsCollection.contributionCalendar;
});
