<script setup lang="ts">
import IconText from "./primitive/IconText.vue";
import ShareButton from "./primitive/ShareButton.vue";
import Badge from "./primitive/Badge.vue";
interface Props {
	date?: string;
	category?: string | null;
	tags?: string[];
	author?: string;
	readingTime?: number;
	updatedDate?: string;
	title?: string;
	url?: string;
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
});

const formatDate = (dateString: string) => {
	return new Date(dateString).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
};

const formatReadingTime = (minutes: number) => {
	if (minutes < 1) return "< 1 min read";
	return `${Math.round(minutes)} min read`;
};
</script>

<template>
	<div class="blog-metadata space-y-1.5rem">
		<!-- Author -->
		<IconText v-if="author" icon="mdi:account" :text="author" />

		<!-- Share -->
		<div class="pt-1rem border-t border-gray-200 dark:border-gray-700">
			<div class="flex items-center gap-0.5rem mb-0.75rem">
				<Icon
					name="mdi:share-variant"
					class="w-1rem h-1rem text-gray-600 dark:text-gray-400"
				/>
				<span class="text-0.875rem font-600 text-gray-900 dark:text-gray-100"
				>Share</span>
			</div>
			<div class="flex flex-wrap gap-0.5rem pl-1.5rem">
				<a
					:href="`https://twitter.com/intent/tweet?text=${
						encodeURIComponent(title || '')
					}&url=${encodeURIComponent(url)}`"
					target="_blank"
					rel="noopener noreferrer"
					class="flex items-center gap-0.25rem px-0.75rem py-0.5rem bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-0.375rem text-0.875rem text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all-0.2s no-underline"
				>
					<Icon name="mdi:twitter" class="w-1rem h-1rem" />
					Twitter
				</a>
				<a
					:href="`https://www.facebook.com/sharer/sharer.php?u=${
						encodeURIComponent(url)
					}`"
					target="_blank"
					rel="noopener noreferrer"
					class="flex items-center gap-0.25rem px-0.75rem py-0.5rem bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-0.375rem text-0.875rem text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all-0.2s no-underline"
				>
					<Icon name="mdi:facebook" class="w-1rem h-1rem" />
					Facebook
				</a>
			</div>
		</div>

		<!-- Date -->
		<div v-if="date" class="flex items-start gap-0.5rem">
			<Icon
				name="mdi:calendar"
				class="w-1rem h-1rem text-gray-600 dark:text-gray-400 mt-0.125rem"
			/>
			<div class="flex flex-col">
				<IconText :text="formatDate(date)" :icon-class="''" text-class="text-0.875rem text-gray-900 dark:text-gray-100" />
				<span
					v-if="updatedDate && updatedDate !== date"
					class="text-0.75rem text-gray-500 dark:text-gray-500"
				>
					Updated {{ formatDate(updatedDate) }}
				</span>
			</div>
		</div>

		<!-- Reading Time -->
		<IconText v-if="readingTime > 0" icon="mdi:clock-outline" :text="formatReadingTime(readingTime)" />

		<!-- Category -->
		<div v-if="category" class="flex items-center gap-0.5rem">
			<Icon
				name="mdi:folder"
				class="w-1rem h-1rem text-gray-600 dark:text-gray-400"
			/>
			<Badge size="sm">{{ category }}</Badge>
		</div>

		<!-- Tags -->
		<div v-if="tags && tags.length > 0" class="space-y-0.5rem">
			<IconText icon="mdi:tag" text="Tags" text-class="text-0.875rem font-600 text-gray-900 dark:text-gray-100" />
			<div class="flex flex-wrap gap-0.5rem pl-1.5rem">
				<Badge
					v-for="tag in tags"
					:key="tag"
					variant="default"
					size="sm"
					class="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
				>
					{{ tag }}
				</Badge>
			</div>
		</div>
	</div>
</template>
