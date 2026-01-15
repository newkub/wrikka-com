<script setup lang="ts">
useSeoMeta({
	title: "Home",
	description: "My personal portfolio and projects",
});

const { data: profile, pending: profilePending } = await useFetch<
	GitHubProfile
>("/api/github/profile");
const { data: readme, pending: readmePending } = await useFetch(
	"/api/github/readme",
);
const { data: repos, pending: reposPending } = await useFetch(
	"/api/github/repos",
);
const { data: stats, pending: statsPending } = await useFetch<GitHubStats>(
	"/api/github/stats",
);

const formatDate = (dateString: string) => {
	return new Date(dateString).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
};

interface GitHubStats {
	totalStars: number;
	totalRepos: number;
	reposByLanguage: Record<string, any[]>;
	repos: any[];
}

interface GitHubProfile {
	login: string;
	name: string | null;
	bio: string | null;
	company: string | null;
	location: string | null;
	blog: string | null;
	twitter_username: string | null;
	avatar_url: string;
	html_url: string;
	followers: number;
	following: number;
}
</script>

<template>
	<div class="flex flex-col gap-2rem">
		<div v-if="profile" class="flex flex-col gap-2rem md:flex-row md:gap-4rem">
			<div class="flex flex-col gap-1rem md:w-1/3">
				<img
					:src="profile.avatar_url"
					:alt="profile.name ?? profile.login"
					class="w-16rem h-16rem rounded-full border-4 border-gray-200 dark:border-gray-700"
				/>
				<h1 class="text-2rem font-700 text-gray-900 dark:text-gray-100">
					{{ profile.name || profile.login }}
				</h1>
				<p class="text-gray-600 dark:text-gray-400">{{ profile.login }}</p>
				<p
					v-if="profile.bio"
					class="text-1rem text-gray-900 dark:text-gray-100"
				>
					{{ profile.bio }}
				</p>
				<div class="flex flex-col gap-0.5rem">
					<a
						v-if="profile.company"
						:href="profile.html_url"
						target="_blank"
						rel="noopener"
						class="flex items-center gap-0.5rem text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors-0.2s"
					>
						<Icon name="mdi:office-building" class="w-1rem h-1rem" />
						<span>{{ profile.company }}</span>
					</a>
					<a
						v-if="profile.location"
						:href="profile.html_url"
						target="_blank"
						rel="noopener"
						class="flex items-center gap-0.5rem text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors-0.2s"
					>
						<Icon name="mdi:map-marker" class="w-1rem h-1rem" />
						<span>{{ profile.location }}</span>
					</a>
					<a
						v-if="profile.blog"
						:href="profile.blog"
						target="_blank"
						rel="noopener"
						class="flex items-center gap-0.5rem text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors-0.2s"
					>
						<Icon name="mdi:link" class="w-1rem h-1rem" />
						<span>{{ profile.blog }}</span>
					</a>
					<a
						v-if="profile.twitter_username"
						:href="`https://twitter.com/${profile.twitter_username}`"
						target="_blank"
						rel="noopener"
						class="flex items-center gap-0.5rem text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors-0.2s"
					>
						<Icon name="mdi:twitter" class="w-1rem h-1rem" />
						<span>@{{ profile.twitter_username }}</span>
					</a>
				</div>
				<div class="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-0.5rem p-1rem mt-1rem">
					<div class="grid grid-cols-2 gap-1rem">
						<a
							:href="profile.html_url"
							target="_blank"
							rel="noopener"
							class="flex flex-col items-center gap-0.25rem p-1rem bg-white dark:bg-gray-700 rounded-0.375rem border border-gray-200 dark:border-gray-600 transition-all-0.2s hover:-translate-y-1px hover:shadow-md no-underline text-gray-900 dark:text-gray-100"
						>
							<Icon name="mdi:star" class="w-1.5rem h-1.5rem text-yellow-500" />
							<span class="font-700 text-1.5rem">{{
								stats?.totalStars ?? 0
							}}</span>
							<span class="text-0.75rem text-gray-600 dark:text-gray-400"
							>Stars</span>
						</a>
						<a
							:href="profile.html_url"
							target="_blank"
							rel="noopener"
							class="flex flex-col items-center gap-0.25rem p-1rem bg-white dark:bg-gray-700 rounded-0.375rem border border-gray-200 dark:border-gray-600 transition-all-0.2s hover:-translate-y-1px hover:shadow-md no-underline text-gray-900 dark:text-gray-100"
						>
							<Icon
								name="mdi:source-repository"
								class="w-1.5rem h-1.5rem text-blue-600 dark:text-blue-400"
							/>
							<span class="font-700 text-1.5rem">{{
								stats?.totalRepos ?? 0
							}}</span>
							<span class="text-0.75rem text-gray-600 dark:text-gray-400"
							>Repos</span>
						</a>
						<a
							:href="`https://github.com/${profile.login}?tab=followers`"
							target="_blank"
							rel="noopener"
							class="flex flex-col items-center gap-0.25rem p-1rem bg-white dark:bg-gray-700 rounded-0.375rem border border-gray-200 dark:border-gray-600 transition-all-0.2s hover:-translate-y-1px hover:shadow-md no-underline text-gray-900 dark:text-gray-100"
						>
							<Icon
								name="mdi:account-group"
								class="w-1.5rem h-1.5rem text-green-600 dark:text-green-400"
							/>
							<span class="font-700 text-1.5rem">{{ profile.followers }}</span>
							<span class="text-0.75rem text-gray-600 dark:text-gray-400"
							>Followers</span>
						</a>
						<a
							:href="`https://github.com/${profile.login}?tab=following`"
							target="_blank"
							rel="noopener"
							class="flex flex-col items-center gap-0.25rem p-1rem bg-white dark:bg-gray-700 rounded-0.375rem border border-gray-200 dark:border-gray-600 transition-all-0.2s hover:-translate-y-1px hover:shadow-md no-underline text-gray-900 dark:text-gray-100"
						>
							<Icon
								name="mdi:account-multiple"
								class="w-1.5rem h-1.5rem text-purple-600 dark:text-purple-400"
							/>
							<span class="font-700 text-1.5rem">{{ profile.following }}</span>
							<span class="text-0.75rem text-gray-600 dark:text-gray-400"
							>Following</span>
						</a>
					</div>
				</div>
				<a
					:href="profile.html_url"
					target="_blank"
					rel="noopener"
					class="mt-1rem px-1rem py-0.5rem bg-blue-600 text-white rounded-0.375rem font-600 text-center no-underline transition-colors-0.2s hover:opacity-90"
				>
					View on GitHub
				</a>
			</div>

			<div class="flex-1 flex flex-col gap-2rem">
				<div
					v-if="readme"
					class="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-0.5rem p-2rem"
				>
					<h2 class="text-1.5rem font-700 mb-1rem flex items-center gap-0.5rem text-gray-900 dark:text-gray-100">
						<Icon name="mdi:file-document" class="w-1.5rem h-1.5rem" />
						README.md
					</h2>
					<MarkdownRenderer :content="readme.content" />
				</div>

				<div
					v-if="stats && stats.repos && stats.repos.length > 0"
					class="flex flex-col gap-2rem"
				>
					<h2 class="text-1.5rem font-700 flex items-center gap-0.5rem text-gray-900 dark:text-gray-100">
						<Icon name="mdi:source-repository" class="w-1.5rem h-1.5rem" />
						Repositories ({{ stats.totalRepos }})
					</h2>
					<div class="grid grid-cols-1 gap-1.5rem md:grid-cols-2 lg:grid-cols-3">
						<RepoCard
							v-for="repo in stats.repos"
							:key="repo.id"
							:repo="repo"
						/>
					</div>
				</div>
			</div>
		</div>

		<div
			v-if="profilePending || readmePending || reposPending || statsPending"
			class="flex justify-center items-center py-4rem"
		>
			<div class="animate-spin w-2rem h-2rem border-4 border-gray-200 dark:border-gray-700 border-t-blue-600 dark:border-t-blue-400 rounded-full">
			</div>
		</div>

		<div
			v-if="!profile && !profilePending"
			class="text-center py-4rem text-gray-600 dark:text-gray-400"
		>
			<p>
				Failed to load profile. Please check your GitHub username configuration.
			</p>
		</div>
	</div>
</template>
