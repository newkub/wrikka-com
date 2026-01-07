<script setup lang="ts">
import type { GithubProfile } from "../../../shared/types/github";

const colorMode = useColorMode();

function toggleColorMode() {
	colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
}

defineProps<{
	profile: GithubProfile;
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
					<Icon name="mdi:check-decagram" class="text-blue-500 text-2xl" />
				</h1>
				<p class="text-gray-400 mt-1">@{{ profile.login }}</p>
			</div>
		</div>
		<div class="flex items-center gap-4">
			<button
				@click="toggleColorMode"
				class="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-800"
				aria-label="Toggle color mode"
			>
				<Icon
					v-if="colorMode.value === 'dark'"
					name="mdi:white-balance-sunny"
					class="text-2xl"
				/>
				<Icon v-else name="mdi:weather-night" class="text-2xl" />
			</button>
		</div>
	</section>
</template>
