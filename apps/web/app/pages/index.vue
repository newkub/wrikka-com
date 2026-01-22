<script setup lang="ts">
import type { GithubProfile, GitHubStats } from "#shared/types/github";

useSeoMeta({
	title: "Home",
	description: "My personal portfolio and projects",
});

const { data: profile, pending: profilePending } = await useFetch<
	GithubProfile
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
</script>

<template>
	<div class="flex flex-col gap-2rem">
		<div v-if="profile" class="flex flex-col gap-2rem md:flex-row md:gap-4rem">
			<div class="flex flex-col gap-1rem md:w-1/4">
				<img
					:src="profile.avatar_url"
					:alt="profile.name ?? profile.login"
					class="w-16rem h-16rem rounded-full border-4 border-border"
				/>
				<h1 class="text-2rem font-700 text-foreground">
					{{ profile.name || profile.login }}
				</h1>
				<p class="text-muted-foreground">{{ profile.login }}</p>
				<p
					v-if="profile.bio"
					class="text-1rem text-foreground"
				>
					{{ profile.bio }}
				</p>
				<div class="flex flex-col gap-0.5rem">
					<a
						v-if="profile.company"
						:href="profile.html_url"
						target="_blank"
						rel="noopener"
						class="flex items-center gap-0.5rem text-muted-foreground hover:text-primary transition-colors-0.2s"
					>
						<Icon name="mdi:office-building" class="w-1rem h-1rem" />
						<span>{{ profile.company }}</span>
					</a>
					<a
						v-if="profile.location"
						:href="profile.html_url"
						target="_blank"
						rel="noopener"
						class="flex items-center gap-0.5rem text-muted-foreground hover:text-primary transition-colors-0.2s"
					>
						<Icon name="mdi:map-marker" class="w-1rem h-1rem" />
						<span>{{ profile.location }}</span>
					</a>
					<a
						v-if="profile.blog"
						:href="profile.blog"
						target="_blank"
						rel="noopener"
						class="flex items-center gap-0.5rem text-muted-foreground hover:text-primary transition-colors-0.2s"
					>
						<Icon name="mdi:link" class="w-1rem h-1rem" />
						<span>{{ profile.blog }}</span>
					</a>
					<a
						v-if="profile.twitter_username"
						:href="`https://twitter.com/${profile.twitter_username}`"
						target="_blank"
						rel="noopener"
						class="flex items-center gap-0.5rem text-muted-foreground hover:text-primary transition-colors-0.2s"
					>
						<Icon name="mdi:twitter" class="w-1rem h-1rem" />
						<span>@{{ profile.twitter_username }}</span>
					</a>
				</div>
				<div class="flex flex-col gap-0.75rem mt-1rem">
					<a
						:href="profile.html_url"
						target="_blank"
						rel="noopener"
						class="flex items-center justify-between px-1rem py-0.75rem bg-surface rounded-0.375rem border border-border transition-all-0.2s hover:-translate-y-1px hover:shadow-md no-underline text-foreground"
					>
						<div class="flex items-center gap-0.5rem">
							<Icon name="mdi:star" class="w-1.25rem h-1.25rem text-warning" />
							<span class="text-0.875rem text-muted-foreground">Stars</span>
						</div>
						<span class="font-600 text-1.125rem">{{
							stats?.totalStars ?? 0
						}}</span>
					</a>
					<a
						:href="profile.html_url"
						target="_blank"
						rel="noopener"
						class="flex items-center justify-between px-1rem py-0.75rem bg-surface rounded-0.375rem border border-border transition-all-0.2s hover:-translate-y-1px hover:shadow-md no-underline text-foreground"
					>
						<div class="flex items-center gap-0.5rem">
							<Icon
								name="mdi:source-repository"
								class="w-1.25rem h-1.25rem text-primary"
							/>
							<span class="text-0.875rem text-muted-foreground">Repos</span>
						</div>
						<span class="font-600 text-1.125rem">{{
							stats?.totalRepos ?? 0
						}}</span>
					</a>
					<a
						:href="`https://github.com/${profile.login}?tab=followers`"
						target="_blank"
						rel="noopener"
						class="flex items-center justify-between px-1rem py-0.75rem bg-surface rounded-0.375rem border border-border transition-all-0.2s hover:-translate-y-1px hover:shadow-md no-underline text-foreground"
					>
						<div class="flex items-center gap-0.5rem">
							<Icon
								name="mdi:account-group"
								class="w-1.25rem h-1.25rem text-success"
							/>
							<span class="text-0.875rem text-muted-foreground">Followers</span>
						</div>
						<span class="font-600 text-1.125rem">{{ profile.followers }}</span>
					</a>
					<a
						:href="`https://github.com/${profile.login}?tab=following`"
						target="_blank"
						rel="noopener"
						class="flex items-center justify-between px-1rem py-0.75rem bg-surface rounded-0.375rem border border-border transition-all-0.2s hover:-translate-y-1px hover:shadow-md no-underline text-foreground"
					>
						<div class="flex items-center gap-0.5rem">
							<Icon
								name="mdi:account-multiple"
								class="w-1.25rem h-1.25rem text-accent"
							/>
							<span class="text-0.875rem text-muted-foreground">Following</span>
						</div>
						<span class="font-600 text-1.125rem">{{ profile.following }}</span>
					</a>
				</div>
				<a
					:href="profile.html_url"
					target="_blank"
					rel="noopener"
					class="mt-1rem px-1rem py-0.75rem bg-primary text-primary-foreground rounded-0.375rem font-600 text-center no-underline transition-colors-0.2s hover:opacity-90 flex items-center justify-center gap-0.5rem"
				>
					<Icon name="mdi:github" class="w-1.25rem h-1.25rem" />
					View on GitHub
				</a>
			</div>

			<div class="flex-1 flex flex-col gap-2rem">
				<div
					v-if="readme"
					class="bg-muted border border-border rounded-0.5rem p-2rem"
				>
					<h2 class="text-1.5rem font-700 mb-1rem flex items-center gap-0.5rem text-foreground">
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
						<RepositoryRepoCard
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
			<div class="animate-spin w-2rem h-2rem border-4 border-border border-t-primary rounded-full">
			</div>
		</div>

		<div
			v-if="!profile && !profilePending"
			class="text-center py-4rem text-muted-foreground"
		>
			<p>
				Failed to load profile. Please check your GitHub username configuration.
			</p>
		</div>
	</div>
</template>
