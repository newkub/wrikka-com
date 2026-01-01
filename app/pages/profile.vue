<script setup lang="ts">
const colorMode = useColorMode();
const viewsCount = 71;

function toggleColorMode() {
	colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
}

const config = useRuntimeConfig();
const username = (config.public.githubUsername || "").trim();

const { profile, calendar, pending, error } = await useProfilePage(username);

const socials = computed(() => {
	const githubUrl = username
		? `https://github.com/${username}`
		: "https://github.com";
	return [
		{ label: "GitHub", url: githubUrl, icon: "github" as const },
		{ label: "Twitter", url: "#", icon: "twitter" as const },
		{ label: "LinkedIn", url: "#", icon: "linkedin" as const },
		{ label: "Medium", url: "#", icon: "medium" as const },
		{ label: "Behance", url: "#", icon: "behance" as const },
		{ label: "More", url: "#", icon: "more" as const },
	];
});

const bioText = computed(() => {
	return (
		profile.value?.bio
			?? "Hey, I'm a full stack developer who loves building clean, modern websites and apps where design, functionality, and even the smallest details matter, with a focus on making products that are both practical and visually satisfying.\n\nTech stack isn't my concern, I'm flexible with whatever the project needs, though I prefer modern frameworks and tools. I'm always open for new opportunities to learn and grow."
	);
});
</script>

<template>
	<div class="max-w-5xl mx-auto">
		<div class="space-y-5">
			<div v-if="pending" class="text-secondary">Loading...</div>
			<div v-else-if="error" class="text-secondary">Error</div>
			<div v-else-if="profile" class="space-y-5">
				<ProfileHeaderCard
					:profile="profile"
					:views-count="viewsCount"
					@toggle-theme="toggleColorMode"
				/>

				<ProfileBio :bio="bioText" />

				<ProfileActions :intro-url="'#'" :email="profile.email ?? undefined" />

				<ProfileSocials :links="socials" />

				<ProfileContributions :calendar="calendar" />
			</div>
		</div>
	</div>
</template>
