<script setup lang="ts">
const { profile, pending, error } = await useGithubProfile("newkub");
</script>

<template>
	<div v-if="pending" class="p-6 text-center">
		<p>Loading profile...</p>
	</div>
	<div v-else-if="error" class="p-6 text-center text-red-500">
		<p>Could not load profile information.</p>
	</div>
	<div
		v-else-if="profile"
		class="flex items-center space-x-6 p-6 rounded-lg shadow-lg bg-gray-800/50 backdrop-blur-sm"
	>
		<img
			:src="profile.avatarUrl"
			alt="GitHub Avatar"
			class="w-24 h-24 rounded-full border-4 border-gray-700"
		>
		<div class="flex-1">
			<h1 class="text-3xl font-bold text-white">{{ profile.name }}</h1>
			<p class="text-lg text-gray-400">@{{ profile.login }}</p>
			<p v-if="profile.bio" class="mt-2 text-gray-300">{{ profile.bio }}</p>
			<div class="flex items-center space-x-4 mt-4 text-gray-400">
				<div class="flex items-center">
					<span class="i-carbon-user-follower mr-2"></span>
					<span>{{ profile.followers }} followers</span>
				</div>
				<div class="flex items-center">
					<span class="i-carbon-user-following mr-2"></span>
					<span>{{ profile.following }} following</span>
				</div>
			</div>
			<a
				:href="`https://github.com/${profile.login}`"
				target="_blank"
				class="inline-block mt-4 px-4 py-2 text-sm font-semibold text-white bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
			>
				View on GitHub
			</a>
		</div>
	</div>
</template>
