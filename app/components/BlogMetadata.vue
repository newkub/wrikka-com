<script setup lang="ts">
interface Props {
	date?: string
	category?: string | null
	tags?: string[]
	author?: string
	readingTime?: number
	updatedDate?: string
	title?: string
	url?: string
}

const props = withDefaults(defineProps<Props>(), {
	date: "",
	category: null,
	tags: () => [],
	author: "",
	readingTime: 0,
	updatedDate: "",
	title: "",
	url: "",
})

const formatDate = (dateString: string) => {
	return new Date(dateString).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	})
}

const formatReadingTime = (minutes: number) => {
	if (minutes < 1) return "< 1 min read"
	return `${Math.round(minutes)} min read`
}
</script>

<template>
	<div class="blog-metadata space-y-1.5rem">
		<!-- Author -->
		<div v-if="author" class="flex items-center gap-0.5rem">
			<Icon name="mdi:account" class="w-1rem h-1rem text-gray-600 dark:text-gray-400" />
			<span class="text-0.875rem text-gray-900 dark:text-gray-100">{{ author }}</span>
		</div>

		<!-- Date -->
		<div v-if="date" class="flex items-start gap-0.5rem">
			<Icon name="mdi:calendar" class="w-1rem h-1rem text-gray-600 dark:text-gray-400 mt-0.125rem" />
			<div class="flex flex-col">
				<span class="text-0.875rem text-gray-900 dark:text-gray-100">{{ formatDate(date) }}</span>
				<span v-if="updatedDate && updatedDate !== date" class="text-0.75rem text-gray-500 dark:text-gray-500">
					Updated {{ formatDate(updatedDate) }}
				</span>
			</div>
		</div>

		<!-- Reading Time -->
		<div v-if="readingTime > 0" class="flex items-center gap-0.5rem">
			<Icon name="mdi:clock-outline" class="w-1rem h-1rem text-gray-600 dark:text-gray-400" />
			<span class="text-0.875rem text-gray-900 dark:text-gray-100">{{ formatReadingTime(readingTime) }}</span>
		</div>

		<!-- Category -->
		<div v-if="category" class="flex items-center gap-0.5rem">
			<Icon name="mdi:folder" class="w-1rem h-1rem text-gray-600 dark:text-gray-400" />
			<span class="bg-blue-600 text-white px-0.5rem py-0.25rem rounded-0.25rem text-0.75rem font-500">{{ category }}</span>
		</div>

		<!-- Tags -->
		<div v-if="tags && tags.length > 0" class="space-y-0.5rem">
			<div class="flex items-center gap-0.5rem">
				<Icon name="mdi:tag" class="w-1rem h-1rem text-gray-600 dark:text-gray-400" />
				<span class="text-0.875rem font-600 text-gray-900 dark:text-gray-100">Tags</span>
			</div>
			<div class="flex flex-wrap gap-0.5rem pl-1.5rem">
				<span
					v-for="tag in tags"
					:key="tag"
					class="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-0.5rem py-0.25rem rounded-0.25rem text-0.75rem"
				>
					{{ tag }}
				</span>
			</div>
		</div>

		<!-- Share -->
		<div class="pt-1rem border-t border-gray-200 dark:border-gray-700">
			<div class="flex items-center gap-0.5rem mb-0.75rem">
				<Icon name="mdi:share-variant" class="w-1rem h-1rem text-gray-600 dark:text-gray-400" />
				<span class="text-0.875rem font-600 text-gray-900 dark:text-gray-100">Share</span>
			</div>
			<div class="flex flex-wrap gap-0.5rem pl-1.5rem">
				<a
					:href="`https://twitter.com/intent/tweet?text=${encodeURIComponent(title || '')}&url=${encodeURIComponent(url)}`"
					target="_blank"
					rel="noopener noreferrer"
					class="flex items-center gap-0.25rem px-0.75rem py-0.5rem bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-0.375rem text-0.875rem text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all-0.2s no-underline"
				>
					<Icon name="mdi:twitter" class="w-1rem h-1rem" />
					Twitter
				</a>
				<a
					:href="`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`"
					target="_blank"
					rel="noopener noreferrer"
					class="flex items-center gap-0.25rem px-0.75rem py-0.5rem bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-0.375rem text-0.875rem text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all-0.2s no-underline"
				>
					<Icon name="mdi:facebook" class="w-1rem h-1rem" />
					Facebook
				</a>
				<a
					:href="`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`"
					target="_blank"
					rel="noopener noreferrer"
					class="flex items-center gap-0.25rem px-0.75rem py-0.5rem bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-0.375rem text-0.875rem text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all-0.2s no-underline"
				>
					<Icon name="mdi:linkedin" class="w-1rem h-1rem" />
					LinkedIn
				</a>
			</div>
		</div>
	</div>
</template>
