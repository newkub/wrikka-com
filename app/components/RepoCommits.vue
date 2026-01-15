<script setup lang="ts">
interface Commit {
	sha: string;
	message: string;
	date: string;
	url: string;
}

interface Props {
	commits: Commit[];
	updatedAt: string;
}

const props = defineProps<Props>();

const { formatTimeAgo } = useDate();
</script>

<template>
	<div class="mt-0.75rem flex flex-col gap-0.5rem">
		<div class="flex items-center justify-between px-0 py-0.5rem">
			<div class="flex items-center gap-0.5rem">
				<Icon
					name="mdi:source-commit"
					class="w-1rem h-1rem text-muted-foreground"
				/>
				<span class="text-0.875rem font-600 text-muted-foreground"
				>Recent commits</span>
			</div>
			<span class="text-0.75rem text-muted-foreground">{{
				formatTimeAgo(updatedAt)
			}}</span>
		</div>
		<a
			v-for="commit in commits.slice(0, 3)"
			:key="commit.sha"
			:href="commit.url"
			target="_blank"
			rel="noopener"
			class="group flex items-start gap-0.75rem p-0.75rem rounded-0.5rem text-0.75rem text-muted-foreground hover:bg-muted transition-all-0.2s no-underline"
		>
			<span
				class="font-mono text-primary text-0.7rem shrink-0 bg-primary/10 px-0.25rem py-0.125rem rounded"
			>{{ commit.sha.slice(0, 7) }}</span>
			<div class="flex-1 min-w-0">
				<p class="line-clamp-1 group-hover:text-primary transition-colors-0.2s m-0">
					{{ commit.message }}
				</p>
				<span class="text-0.7rem text-muted-foreground">{{
					formatTimeAgo(commit.date)
				}}</span>
			</div>
		</a>
	</div>
</template>
