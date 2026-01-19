<script setup lang="ts">
useSeoMeta({
	title: "YouTube",
	description: "Latest videos from YouTube",
});

const { data: videos, pending: videosPending } = await useFetch(
	"/api/youtube/videos",
);

const formatDate = (dateString: string) => {
	return new Date(dateString).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
};
</script>

<template>
	<div class="flex flex-col gap-2rem">
		<div class="text-center py-2rem">
			<h1 class="text-2.5rem font-700 mb-0.5rem md:text-2rem text-foreground">
				YouTube
			</h1>
			<p class="text-1.125rem text-muted-foreground">
				Latest videos from YouTube
			</p>
		</div>

		<div v-if="videosPending" class="flex justify-center items-center py-4rem">
			<div class="animate-spin w-2rem h-2rem border-4 border-border border-t-primary rounded-full">
			</div>
		</div>

		<div
			v-else-if="videos && videos.length > 0"
			class="max-w-6xl mx-auto px-1.5rem"
		>
			<div class="grid grid-cols-1 gap-1.5rem md:grid-cols-2 lg:grid-cols-3">
				<a
					v-for="video in videos"
					:key="video.id"
					:href="`https://www.youtube.com/watch?v=${video.id}`"
					target="_blank"
					rel="noopener"
					class="bg-surface border border-border rounded-0.5rem overflow-hidden block transition-all-0.2s hover:-translate-y-2px hover:shadow-lg no-underline text-foreground"
				>
					<div class="relative aspect-video">
						<img
							:src="video.thumbnail"
							:alt="video.title"
							class="w-full h-full object-cover"
						/>
						<div class="absolute bottom-0 right-0 bg-black/80 text-white px-0.5rem py-0.25rem m-0.5rem rounded-0.25rem text-0.75rem font-600">
							<Icon name="mdi:youtube" class="w-1rem h-1rem" />
						</div>
					</div>
					<div class="p-1rem">
						<h3 class="text-1rem font-600 m-0 mb-0.5rem line-clamp-2">
							{{ video.title }}
						</h3>
						<p
							v-if="video.description"
							class="text-0.875rem text-muted-foreground mb-0.5rem line-clamp-2"
						>
							{{ video.description }}
						</p>
						<div class="flex items-center gap-0.5rem text-0.75rem text-muted-foreground">
							<Icon name="mdi:calendar" class="w-1rem h-1rem" />
							<span>{{ formatDate(video.publishedAt) }}</span>
						</div>
					</div>
				</a>
			</div>
		</div>

		<div v-else class="text-center py-4rem text-muted-foreground">
			<p>No videos found</p>
		</div>
	</div>
</template>


