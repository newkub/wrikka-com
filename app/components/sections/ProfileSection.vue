<script setup lang="ts">
const config = useRuntimeConfig();
const username = (config.public.githubUsername || "").trim();

const { profile, calendar, pending, error } = await useProfilePage(username);

const viewsCount = 78; // Mock data

const socials = computed(() => {
	const githubUrl = username ? `https://github.com/${username}` : "#";
	return [
		{ label: "GitHub", url: githubUrl, icon: "logo-github" },
		{ label: "Twitter", url: "#", icon: "logo-twitter" },
		{ label: "LinkedIn", url: "#", icon: "logo-linkedin" },
	];
});

const bioText = computed(() => {
	return (
		profile.value?.bio
		|| `Passionate full-stack developer creating beautiful, functional web apps. I thrive on solving complex problems and learning new technologies.`
	);
});
</script>

<template>
	<div class="max-w-5xl mx-auto py-8 px-4">
		<div v-if="pending" class="space-y-8 animate-pulse">
			<div class="flex items-start gap-5">
				<div class="w-24 h-24 rounded-full bg-gray-700"></div>
				<div class="flex-1 space-y-3 pt-2">
					<div class="h-8 bg-gray-700 rounded w-1/2"></div>
					<div class="h-4 bg-gray-700 rounded w-1/4"></div>
				</div>
			</div>
			<div class="space-y-2 border-t border-gray-700 pt-8">
				<div class="h-4 bg-gray-700 rounded w-full"></div>
				<div class="h-4 bg-gray-700 rounded w-full"></div>
				<div class="h-4 bg-gray-700 rounded w-2/3"></div>
			</div>
		</div>
		<div v-else-if="error" class="text-center py-12">
			<p class="text-red-500">Error loading profile. Please try again later.</p>
		</div>
		<div v-else-if="profile" class="space-y-12">
			<ProfileProfileHeader :profile="profile" :views-count="viewsCount" />
			<ProfileProfileBio :bio="bioText" />
			<ProfileProfileActions :email="profile.email" />
			<ProfileProfileSocialLinks :socials="socials" />
			<ProfileProfileContributionGraph :calendar="calendar" />
		</div>
	</div>
</template>
