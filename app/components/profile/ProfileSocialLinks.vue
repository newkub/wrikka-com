<script setup lang="ts">
interface ProfileSocialLink {
	label: string;
	url: string;
	icon: string;
}

defineProps<{
	socials: ProfileSocialLink[];
}>();
</script>

<template>
	<section class="space-y-4">
		<h2 class="text-lg font-semibold text-primary dark:text-primary-dark">
			Find me on
		</h2>
		<div class="flex flex-wrap gap-3">
			<a
				v-for="link in socials"
				:key="link.label"
				:href="link.url"
				target="_blank"
				rel="noreferrer"
				class="inline-flex items-center gap-2 rounded-lg border border-surface-200 dark:border-surface-800 bg-transparent px-3 py-1.5 text-sm font-medium text-secondary hover:text-primary dark:hover:text-primary-dark hover:bg-surface-100 dark:hover:bg-surface-200/10 transition-colors"
			>
				<Icon :name="link.icon" class="text-xl" />
				<span>{{ link.label }}</span>
			</a>
		</div>
	</section>
</template>
