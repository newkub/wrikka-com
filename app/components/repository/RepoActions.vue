<script setup lang="ts">
interface Props {
	htmlUrl: string;
}

const props = defineProps<Props>();

const copyRepoLink = () => {
	navigator.clipboard.writeText(props.htmlUrl);
};
</script>

<template>
	<div class="flex items-center gap-0.5rem pt-1rem border-t border-border mt-1.25rem">
		<a
			:href="htmlUrl + '/stargazers'"
			target="_blank"
			rel="noopener"
			class="flex items-center gap-0.375rem px-0.75rem py-0.5rem rounded-0.25rem text-0.875rem text-muted-foreground hover:bg-warning/10 hover:text-warning transition-all-0.2s no-underline"
			title="Star this repository"
		>
			<Icon name="mdi:star-outline" class="w-1rem h-1rem" />
			Star
		</a>
		<a
			:href="htmlUrl + '/fork'"
			target="_blank"
			rel="noopener"
			class="flex items-center gap-0.375rem px-0.75rem py-0.5rem rounded-0.25rem text-0.875rem text-muted-foreground hover:bg-muted hover:text-foreground transition-all-0.2s no-underline"
			title="Fork this repository"
		>
			<Icon name="mdi:source-fork" class="w-1rem h-1rem" />
			Fork
		</a>
		<button
			@click="copyRepoLink"
			class="flex items-center gap-0.375rem px-0.75rem py-0.5rem rounded-0.25rem text-0.875rem text-muted-foreground hover:bg-muted hover:text-foreground transition-all-0.2s"
			title="Copy repository link"
		>
			<Icon name="mdi:content-copy" class="w-1rem h-1rem" />
			Copy
		</button>
	</div>
</template>


