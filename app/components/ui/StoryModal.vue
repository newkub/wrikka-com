<script setup lang="ts">
import { useStory } from "~/composables/story";

const {
	showProfileModal,
	currentStoryIndex,
	storyProgress,
	isAutoPlaying,
	stories,
	nextStory,
	prevStory,
	togglePlayPause,
	closeStory,
} = useStory();

const socialLinks = [
	{
		name: "GitHub",
		icon: "i-mdi-github",
		href: "#",
		color: "hover:text-primary dark:hover:text-primary-dark",
	},
	{
		name: "Twitter",
		icon: "i-mdi-twitter",
		href: "#",
		color: "hover:text-blue-400",
	},
	{
		name: "LinkedIn",
		icon: "i-mdi-linkedin",
		href: "#",
		color: "hover:text-blue-600",
	},
];
</script>

<template>
	<div
		v-if="showProfileModal"
		class="fixed inset-0 z-50 bg-black flex items-center justify-center"
		@click="closeStory"
	>
		<div
			class="relative w-full max-w-sm h-full max-h-screen bg-gradient-to-br from-accent via-menu-project to-menu-blog flex flex-col"
			@click.stop
		>
			<!-- Story Progress Bars -->
			<div class="flex gap-1 p-4 pb-2">
				<div
					v-for="(story, index) in stories"
					:key="story.id"
					class="flex-1 h-1 bg-white/30 rounded-full overflow-hidden"
				>
					<div
						class="h-full bg-white transition-all duration-100 ease-linear"
						:style="{
							width: index < currentStoryIndex
								? '100%'
								: index === currentStoryIndex
								? `${storyProgress}%`
								: '0%',
						}"
					/>
				</div>
			</div>

			<!-- Story Header -->
			<div class="flex items-center justify-between p-4 pb-2">
				<div class="flex items-center gap-3">
					<div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
						<div class="i-mdi-account w-6 h-6 text-white" />
					</div>
					<div>
						<h3 class="text-white font-semibold text-sm">Wrikka</h3>
						<p class="text-white/70 text-xs">
							{{ stories[currentStoryIndex]?.subtitle }}
						</p>
					</div>
				</div>

				<div class="flex items-center gap-2">
					<!-- Play/Pause Button -->
					<button
						@click="togglePlayPause"
						class="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
					>
						<div
							:class="isAutoPlaying ? 'i-mdi-pause' : 'i-mdi-play'"
							class="w-4 h-4"
						/>
					</button>

					<!-- Close Button -->
					<button
						@click="closeStory"
						class="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
					>
						<div class="i-mdi-close w-4 h-4" />
					</button>
				</div>
			</div>

			<!-- Story Content -->
			<div class="flex-1 flex items-center justify-center p-8 text-center">
				<div>
					<!-- Main Avatar -->
					<div class="w-24 h-24 mx-auto mb-6 bg-white/20 rounded-full p-1">
						<div class="w-full h-full bg-white/10 rounded-full flex items-center justify-center">
							<div class="i-mdi-account w-12 h-12 text-white" />
						</div>
					</div>

					<!-- Story Content -->
					<div class="space-y-4">
						<h2 class="text-2xl font-bold text-white mb-2">Wrikka</h2>
						<p class="text-white/90 font-medium mb-6">Full-Stack Developer</p>

						<div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
							<p class="text-white text-lg leading-relaxed">
								{{ stories[currentStoryIndex]?.content }}
							</p>
						</div>
					</div>
				</div>
			</div>

			<!-- Navigation Areas -->
			<div class="absolute inset-0 flex">
				<!-- Left half - Previous story -->
				<div
					class="flex-1 cursor-pointer"
					@click="prevStory"
				/>
				<!-- Right half - Next story -->
				<div
					class="flex-1 cursor-pointer"
					@click="nextStory"
				/>
			</div>

			<!-- Bottom Social Links -->
			<div class="p-4 pt-0">
				<div class="flex justify-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
					<a
						v-for="social in socialLinks"
						:key="social.name"
						:href="social.href"
						class="p-3 rounded-lg bg-white/20 text-white transition-all duration-200 hover:bg-white/30 hover:scale-110"
					>
						<div :class="social.icon" class="w-5 h-5" />
					</a>
				</div>
			</div>
		</div>
	</div>
</template>
