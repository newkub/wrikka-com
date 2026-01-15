<script setup lang="ts">
useSeoMeta({
	title: "X",
	description: "Latest tweets from X",
})

const { data: tweets, pending: tweetsPending } = await useFetch("/api/x/tweets")

const formatDate = (dateString: string) => {
	return new Date(dateString).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	})
}

const formatNumber = (num: number) => {
	if (num >= 1000000) {
		return `${(num / 1000000).toFixed(1)}M`
	}
	if (num >= 1000) {
		return `${(num / 1000).toFixed(1)}K`
	}
	return num.toString()
}
</script>

<template>
	<div class="flex flex-col gap-2rem">
		<div class="text-center py-2rem">
			<h1 class="text-2.5rem font-700 mb-0.5rem md:text-2rem text-gray-900 dark:text-gray-100">X</h1>
			<p class="text-1.125rem text-gray-600 dark:text-gray-400">Latest tweets from X</p>
		</div>

		<div v-if="tweetsPending" class="flex justify-center items-center py-4rem">
			<div class="animate-spin w-2rem h-2rem border-4 border-gray-200 dark:border-gray-700 border-t-blue-600 dark:border-t-blue-400 rounded-full"></div>
		</div>

		<div v-else-if="tweets && tweets.length > 0" class="max-w-4xl mx-auto px-1.5rem">
			<div class="flex flex-col gap-1.5rem">
				<a
					v-for="tweet in tweets"
					:key="tweet.id"
					:href="`https://x.com/${tweet.user.username}/status/${tweet.id}`"
					target="_blank"
					rel="noopener"
					class="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-0.5rem p-1.5rem block transition-all-0.2s hover:-translate-y-2px hover:shadow-lg no-underline text-gray-900 dark:text-gray-100"
				>
					<div class="flex items-start gap-1rem mb-1rem">
						<img
							v-if="tweet.user?.profile_image_url"
							:src="tweet.user.profile_image_url"
							:alt="tweet.user.name"
							class="w-3rem h-3rem rounded-full border-2 border-gray-200 dark:border-gray-700"
						/>
						<div class="flex-1">
							<h3 class="text-1rem font-600 m-0 mb-0.25rem">{{ tweet.user.name }}</h3>
							<p class="text-0.75rem text-gray-600 dark:text-gray-400 m-0">@{{ tweet.user.username }}</p>
						</div>
					</div>
					<p class="text-0.875rem text-gray-900 dark:text-gray-100 mb-1rem whitespace-pre-wrap">{{ tweet.text }}</p>
					<div v-if="tweet.media && tweet.media.length > 0" class="mb-1rem">
						<div class="grid grid-cols-1 gap-0.5rem">
							<img
								v-for="(mediaItem, index) in tweet.media"
								:key="index"
								:src="mediaItem.preview_image_url || mediaItem.url"
								:alt="`Media ${Number(index) + 1}`"
								class="w-full rounded-0.375rem"
							/>
						</div>
					</div>
					<div class="flex items-center gap-1.5rem text-0.75rem text-gray-600 dark:text-gray-400 mb-0.5rem">
						<span class="flex items-center gap-0.25rem">
							<Icon name="mdi:calendar" class="w-1rem h-1rem" />
							{{ formatDate(tweet.created_at) }}
						</span>
						<span class="flex items-center gap-0.25rem">
							<Icon name="mdi:comment" class="w-1rem h-1rem" />
							{{ formatNumber(tweet.public_metrics?.reply_count || 0) }}
						</span>
						<span class="flex items-center gap-0.25rem">
							<Icon name="mdi:repeat" class="w-1rem h-1rem" />
							{{ formatNumber(tweet.public_metrics?.retweet_count || 0) }}
						</span>
						<span class="flex items-center gap-0.25rem">
							<Icon name="mdi:heart" class="w-1rem h-1rem" />
							{{ formatNumber(tweet.public_metrics?.like_count || 0) }}
						</span>
						<span class="flex items-center gap-0.25rem">
							<Icon name="mdi:eye" class="w-1rem h-1rem" />
							{{ formatNumber(tweet.public_metrics?.impression_count || 0) }}
						</span>
					</div>
					<div class="flex items-center gap-0.5rem text-0.75rem text-gray-600 dark:text-gray-400">
						<Icon name="mdi:twitter" class="w-1rem h-1rem" />
						<span>View on X</span>
					</div>
				</a>
			</div>
		</div>

		<div v-else class="text-center py-4rem text-gray-600 dark:text-gray-400">
			<p>No tweets found</p>
		</div>
	</div>
</template>
