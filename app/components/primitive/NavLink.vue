<script setup lang="ts">
interface Props {
	to: string;
	icon?: string;
	active?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	icon: "",
	active: false,
});
</script>

<template>
	<NuxtLink
		:to="to"
		class="flex items-center gap-0.5rem px-0.75rem py-0.5rem rounded-0.375rem no-underline text-gray-900 dark:text-gray-100 transition-all-0.2s font-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800"
		:class="{
			'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20': active,
		}"
	>
		<Icon v-if="icon" :name="icon" class="w-1rem h-1rem" />
		<slot />
	</NuxtLink>
</template>
