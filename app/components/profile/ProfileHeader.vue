<script setup lang="ts">
import type { GithubProfile } from "../../../shared/types/github";

const colorMode = useColorMode();

function toggleColorMode() {
	colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
}

defineProps<{
	profile: GithubProfile;
	viewsCount: number;
}>();
</script>

<template>
	<section class="flex flex-col sm:flex-row items-start justify-between gap-5">
		<div class="flex items-start gap-5">
			<img
				:src="profile.avatarUrl"
				:alt="profile.name ?? profile.login"
				class="w-24 h-24 rounded-full border-4 border-gray-700 object-cover shadow-lg"
			/>
			<div>
				<h1 class="text-3xl font-bold text-white flex items-center gap-2">
					{{ profile.name ?? profile.login }}
					<span class="i-carbon-badge-check text-blue-500 text-2xl"></span>
				</h1>
				<p class="text-gray-400 mt-1">@{{ profile.login }}</p>
			</div>
		</div>
		<div class="flex items-center gap-4">
			<div class="flex items-center gap-2 text-gray-400">
				<span class="i-carbon-view"></span>
				<span>{{ viewsCount }} views</span>
			</div>
			<button
				@click="toggleColorMode"
				class="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-800"
				aria-label="Toggle color mode"
			>
				<span
					v-if="colorMode.value === 'dark'"
					class="i-carbon-sun text-2xl"
				></span>
				<span v-else class="i-carbon-moon text-2xl"></span>
			</button>
		</div>
	</section>
</template>
