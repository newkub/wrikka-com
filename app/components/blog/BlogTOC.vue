<script setup lang="ts">
import { useTableOfContents } from "~/composables/toc";

const { activeHeadingId, showTOC, toggleTOC, scrollToHeading } =
	useTableOfContents();

const props = defineProps<{
	tableOfContents: { level: number; text: string; id: string }[];
}>();
</script>

<template>
	<!-- Table of Contents Sidebar -->
	<aside
		v-if="showTOC"
		class="hidden xl:block flex-shrink-0 w-80 transition-all duration-300 ease-out"
	>
		<div class="sticky top-24 w-80">
			<div class="bg-card/80 dark:bg-card-dark/80 backdrop-blur-md rounded-xl border border-surface-200/50 dark:border-surface-200-dark/50 overflow-hidden shadow-lg">
				<!-- TOC Header with toggle -->
				<div class="flex items-center justify-between p-4 border-b border-surface-200/30 dark:border-surface-200-dark/30 bg-surface-50/50 dark:bg-surface-800/50">
					<h3 class="text-lg font-bold text-primary dark:text-primary-dark flex items-center gap-2">
						<div class="i-mdi-view-list w-5 h-5 text-accent dark:text-accent-dark" />
						สารบัญ
					</h3>
					<button
						@click="toggleTOC"
						class="p-2 rounded-lg hover:bg-surface-100/50 dark:hover:bg-surface-100-dark/50 transition-all duration-200 group"
					>
						<div class="i-mdi-chevron-right w-5 h-5 text-secondary dark:text-secondary-dark group-hover:text-accent dark:group-hover:text-accent-dark transition-all duration-200 transform group-hover:translate-x-1" />
					</button>
				</div>

				<!-- TOC Content with scroll -->
				<div class="max-h-96 overflow-y-auto scrollbar-hide">
					<div v-if="tableOfContents.length > 0" class="p-4 space-y-1">
						<button
							v-for="heading in tableOfContents"
							:key="heading.id"
							@click="scrollToHeading(heading.id)"
							:class="[
								'block w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 hover:bg-surface-100/50 dark:hover:bg-surface-100-dark/50 hover:translate-x-1',
								activeHeadingId === heading.id
									? 'bg-accent/10 dark:bg-accent-dark/10 text-accent dark:text-accent-dark font-medium border-l-3 border-accent dark:border-accent-dark'
									: 'text-secondary dark:text-secondary-dark border-l-3 border-transparent',
								heading.level === 1 ? 'font-semibold' : '',
								heading.level === 2 ? 'ml-4' : '',
								heading.level === 3 ? 'ml-8 text-xs' : '',
							]"
						>
							<div class="flex items-center gap-2">
								<div
									v-if="activeHeadingId === heading.id"
									class="w-1.5 h-1.5 bg-accent dark:bg-accent-dark rounded-full animate-pulse"
								/>
								<span>{{ heading.text }}</span>
							</div>
						</button>
					</div>
					<div v-else class="p-4">
						<p class="text-secondary dark:text-secondary-dark text-sm text-center">
							ไม่มีหัวข้อในบทความนี้
						</p>
					</div>
				</div>
			</div>
		</div>
	</aside>
</template>
