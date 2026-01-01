<script setup lang="ts">
export interface ProfileSocialLink {
	label: string;
	url: string;
	icon: "github" | "twitter" | "linkedin" | "medium" | "behance" | "more";
}

defineProps<{
	links: ProfileSocialLink[];
}>();
</script>

<template>
	<section class="space-y-3">
		<h2 class="text-lg font-semibold text-primary">
			Here are my <span class="font-extrabold">socials</span>
		</h2>
		<div class="flex flex-wrap gap-2">
			<a
				v-for="link in links"
				:key="link.label"
				:href="link.url"
				target="_blank"
				rel="noreferrer"
				class="inline-flex items-center gap-2 rounded-xl border border-surface-200 bg-surface px-3 py-2 text-sm font-semibold text-primary hover:border-primary transition-colors focus:(outline-none ring-2 ring-accent ring-offset-2 ring-offset-surface)"
			>
				<span class="w-4 h-4 text-secondary">
					<Icon
						:name="link.icon === 'github'
						? 'mdi:github'
						: link.icon === 'twitter'
						? 'mdi:twitter'
						: link.icon === 'linkedin'
						? 'mdi:linkedin'
						: link.icon === 'medium'
						? 'mdi:medium'
						: link.icon === 'behance'
						? 'mdi:behance'
						: 'mdi:dots-horizontal'"
						size="16"
					/>
				</span>
				<span>{{ link.label }}</span>
			</a>
		</div>
	</section>
</template>
