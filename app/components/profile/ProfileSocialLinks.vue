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
		<h2 class="text-lg font-semibold text-white">Find me on</h2>
		<div class="flex flex-wrap gap-3">
			<a
				v-for="link in socials"
				:key="link.label"
				:href="link.url"
				target="_blank"
				rel="noreferrer"
				class="inline-flex items-center gap-2 rounded-lg border border-gray-700 bg-transparent px-3 py-1.5 text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
			>
				<span :class="`i-carbon-${link.icon}`" class="text-xl"></span>
				<span>{{ link.label }}</span>
			</a>
		</div>
	</section>
</template>
