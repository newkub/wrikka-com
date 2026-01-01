import type { GithubContributionCalendar } from "../../shared/types/github";

export const getGitHubContributions = async (username: string, token: string) => {
	const to = new Date();
	const from = new Date(to);
	from.setFullYear(to.getFullYear() - 1);

	const body = {
		query: `query($login: String!, $from: DateTime!, $to: DateTime!) {
  user(login: $login) {
    contributionsCollection(from: $from, to: $to) {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            date
            contributionCount
            color
          }
        }
      }
    }
  }
}`,
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
};
