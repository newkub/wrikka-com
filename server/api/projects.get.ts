export default defineEventHandler(async () => {
	try {
		// Try to fetch from GitHub API first
		const config = useRuntimeConfig();
		const githubUsername = config.public.githubUsername;

		if (githubUsername && config.githubToken) {
			try {
				const response = await fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=100`, {
					headers: {
						Authorization: `Bearer ${config.githubToken}`,
						Accept: "application/vnd.github.v3+json",
					},
				});

				if (response.ok) {
					const data = await response.json();

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
					}));

					const reposWithCommits = await Promise.all(
						repos.slice(0, 12).map(async (repo: any) => {
							try {
								const commitsResponse = await fetch(
									`https://api.github.com/repos/${githubUsername}/${repo.name}/commits?per_page=3`,
									{
										headers: {
											Authorization: `Bearer ${config.githubToken}`,
											Accept: "application/vnd.github.v3+json",
										},
									},
								);

								if (commitsResponse.ok) {
									const commitsData = await commitsResponse.json();
									const commits = commitsData.map((commit: any) => ({
										sha: commit.sha.substring(0, 7),
										message: commit.commit.message.split("\n")[0],
										date: commit.commit.author.date,
										url: commit.html_url,
									}));
									return { ...repo, commits };
								}
							} catch {
								return repo;
							}
							return repo;
						}),
					);

					return reposWithCommits;
				}
			} catch (error) {
				console.error("GitHub API error:", error);
			}
		}

		// Fallback to local projects.json
		const fs = await import('node:fs');
		const path = await import('node:path');
		const projectsPath = path.join(process.cwd(), 'content', 'projects.json');
		const projectsData = JSON.parse(fs.readFileSync(projectsPath, 'utf-8'));
		const projects = projectsData.default || [];

		const repos = projects.map((project: any) => ({
			id: parseInt(project.id),
			name: project.title.toLowerCase().replace(/\s+/g, '-'),
			full_name: `${githubUsername || 'wrikka'}/${project.title.toLowerCase().replace(/\s+/g, '-')}`,
			description: project.description,
			html_url: project.github || project.demo,
			language: project.tags?.[0] || 'TypeScript',
			stargazers_count: 0,
			forks_count: 0,
			updated_at: new Date().toISOString(),
			topics: project.tags || [],
			fork: false,
			archived: false,
			commits: [],
		}));

		return repos;
	} catch (error) {
		console.error("Failed to fetch projects:", error);
		throw createError({
			statusCode: 500,
			statusMessage: "Failed to fetch projects",
		});
	}
});
