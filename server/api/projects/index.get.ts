import type { GithubGraphqlResponse, GithubRepo } from "../../../shared/types/github";
import type { Project } from "../../../shared/types/projects";

const GITHUB_GRAPHQL_API = "https://api.github.com/graphql";

const REPOS_QUERY = `
  query($username: String!) {
    user(login: $username) {
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository {
            name
            description
            url
            homepageUrl
            isFork
            isArchived
            languages(first: 5, orderBy: {field: SIZE, direction: DESC}) {
              nodes { name }
            }
            opengraphImageUrl
          }
        }
      }
      repositories(first: 20, orderBy: {field: UPDATED_AT, direction: DESC}, privacy: PUBLIC) {
        nodes {
          name
          description
          url
          homepageUrl
          isFork
          isArchived
          languages(first: 5, orderBy: {field: SIZE, direction: DESC}) {
            nodes { name }
          }
          opengraphImageUrl
        }
      }
    }
  }
`;

function mapRepoToProject(repo: GithubRepo): Project {
	return {
		name: repo.name,
		description: repo.description || "",
		tags: repo.languages.nodes.map(lang => lang.name),
		imageUrl: repo.opengraphImageUrl,
		url: repo.homepageUrl || undefined,
		githubUrl: repo.url,
		isPinned: false, // Will be set later
	};
}

export default defineEventHandler(async (): Promise<Project[]> => {
	const config = useRuntimeConfig();
	const { githubToken, public: { githubUsername } } = config;

	if (!githubToken || !githubUsername) {
		console.error("GitHub token or username is not configured.");
		return [];
	}

	try {
		const response = await $fetch<GithubGraphqlResponse>(GITHUB_GRAPHQL_API, {
			method: "POST",
			headers: {
				Authorization: `bearer ${githubToken}`,
			},
			body: {
				query: REPOS_QUERY,
				variables: { username: githubUsername },
			},
		});

		const user = response.data?.user;
		if (!user) return [];

		const pinnedRepoNames = new Set(user.pinnedItems.nodes.map((repo: GithubRepo) => repo.name));

		const pinnedProjects: Project[] = user.pinnedItems.nodes.map((repo: GithubRepo) => ({
			...mapRepoToProject(repo),
			isPinned: true,
		}));

		const otherProjects: Project[] = user.repositories.nodes
			.filter((repo: GithubRepo) => !repo.isFork && !repo.isArchived && !pinnedRepoNames.has(repo.name))
			.map((repo: GithubRepo) => mapRepoToProject(repo));

		return [...pinnedProjects, ...otherProjects];
	} catch (error) {
		console.error("Error fetching GitHub data:", error);
		return [];
	}
});
