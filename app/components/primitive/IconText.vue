<script setup lang="ts">
interface Props {
	icon?: string;
	text?: string;
	iconClass?: string;
	textClass?: string;
	align?: "items-center" | "items-start";
	gap?: string;
}

const props = withDefaults(defineProps<Props>(), {
	icon: "",
	text: "",
	iconClass: "w-1rem h-1rem text-gray-600 dark:text-gray-400",
	textClass: "text-0.875rem text-gray-900 dark:text-gray-100",
	align: "items-center",
	gap: "gap-0.5rem",
});
</script>

<template>
	<div class="flex" :class="[align, gap]">
		<Icon v-if="icon" :name="icon" :class="iconClass" />
		<span :class="textClass">{{ text }}</span>
		<slot />
	</div>
</template>
