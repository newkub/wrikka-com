<script setup lang="ts">
interface SkeletonCardProps {
	lines?: number;
	showAvatar?: boolean;
	class?: string;
}

const props = withDefaults(defineProps<SkeletonCardProps>(), {
	lines: 3,
	showAvatar: false,
});
</script>

<template>
	<div :class="['bg-secondary dark:bg-surface-800 rounded-lg p-4', props.class]">
		<div v-if="showAvatar" class="flex items-center space-x-4 mb-4">
			<div class="w-10 h-10 bg-tertiary rounded-full animate-pulse"></div>
			<div class="flex-1 space-y-2">
				<div class="h-4 bg-tertiary rounded animate-pulse"></div>
				<div class="h-3 bg-tertiary rounded w-3/4 animate-pulse"></div>
			</div>
		</div>
		<div class="space-y-2">
			<div
				v-for="i in lines"
				:key="i"
				:class="[
					'h-4 bg-tertiary rounded animate-pulse',
					i === lines ? 'w-3/4' : 'w-full',
				]"
			>
			</div>
		</div>
	</div>
</template>
