<script setup lang="ts">
import type {
	GithubContributionCalendar,
	GithubProfile,
} from "../../shared/types/github";
import AchievementsSection from '~/components/profile/achievements/AchievementsSection.vue';

const config = useRuntimeConfig();
const username = (config.public.githubUsername || "").trim();

const { profile, calendar, pending, error } = await useProfilePage(username);

const isMissingUsername = computed(() => !username);

// SEO
useSEO({
	title: profile.value?.name
		? `${profile.value.name} - Full Stack Developer`
		: "Wrikka - Full Stack Developer Portfolio",
	description: profile.value?.bio
		|| "A passionate and creative full-stack developer from Thailand with a strong focus on building beautiful, functional, and user-centric web applications.",
	image: profile.value?.avatarUrl,
	type: "profile",
	keywords: [
		"full stack developer",
		"web development",
		"vue.js",
		"nuxt",
		"javascript",
		"typescript",
		"portfolio",
		...(profile.value?.login ? [profile.value.login] : []),
	],
	author: profile.value?.name || "Veerapong",
});

const socials = computed(() => {
	const githubUrl = profile.value?.login
		? `https://github.com/${profile.value.login}`
		: "#";
	return [
		{ label: "GitHub", url: githubUrl, icon: "mdi:github" },
		{ label: "X", url: "#", icon: "mdi:twitter" }, // Assuming 'X' uses the twitter icon
		{
			label: "Facebook",
			url: "https://facebook.com/webdev.sharex",
			icon: "mdi:facebook",
		},
	];
});

const bioText = computed(() => {
	return (
		profile.value?.bio
		|| "A passionate and creative full-stack developer from Thailand with a strong focus on building beautiful, functional, and user-centric web applications. I have a knack for solving complex problems and a deep love for diving into new technologies, constantly striving to push the boundaries of what is possible on the web."
	);
});
</script>

<template>
	<div>
		<div v-if="pending" class="space-y-8 animate-pulse">
			<!-- Skeleton for banner -->
			<div class="h-48 w-full bg-gray-700"></div>
			<div class="px-4 sm:px-6 lg:px-8">
				<div class="flex items-start gap-5 -mt-16">
					<div class="w-24 h-24 rounded-full bg-gray-700 border-4 border-gray-800">
					</div>
					<div class="flex-1 space-y-3 pt-12">
						<div class="h-8 bg-gray-700 rounded w-1/2"></div>
						<div class="h-4 bg-gray-700 rounded w-1/4"></div>
					</div>
				</div>
				<div class="space-y-2 border-t border-gray-700 pt-8 mt-8">
					<div class="h-4 bg-gray-700 rounded w-full"></div>
					<div class="h-4 bg-gray-700 rounded w-full"></div>
					<div class="h-4 bg-gray-700 rounded w-2/3"></div>
				</div>
			</div>
		</div>
		<div v-else-if="isMissingUsername" class="text-center py-12">
			<p class="text-gray-400">
				Missing GitHub username. Please set GITHUB_USERNAME in your environment.
			</p>
		</div>
		<div v-else-if="error" class="text-center py-12">
			<p class="text-red-500">Error loading profile.</p>
			<p class="text-gray-400 mt-2">
				{{
					(error as any)?.statusCode ? `(${(error as any).statusCode}) ` : ""
				}}{{ (error as any)?.statusMessage || "Please try again later." }}
			</p>
		</div>
		<div v-else-if="profile">
			<div>
				<img
					class="h-48 w-full object-cover"
					src="https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=2070&auto=format&fit=crop"
					alt="Cover Banner"
				>
			</div>
			<div class="px-4 sm:px-6 lg:px-8">
				<div class="-mt-16">
					<div class="space-y-12">
						<ProfileHeader :profile="profile" />
						<ProfileBio :bio="bioText" />
						<ProfileActions :email="profile.email" />
						<ProfileSocialLinks :socials="socials" />
						<ProfileContributionGraph :calendar="calendar" />
						<SkillsShowcase />
						<AchievementsSection />
						<ProfileMemories />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
