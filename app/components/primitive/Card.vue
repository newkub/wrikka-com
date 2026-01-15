<script setup lang="ts">
interface Props {
	variant?: "default" | "outline" | "ghost";
	padding?: "none" | "sm" | "md" | "lg";
	hover?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	variant: "default",
	padding: "md",
	hover: false,
});
</script>

<template>
	<div
		:class="[
			'rounded-0.5rem transition-all-0.2s',
			{
				'bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700':
					variant === 'default',
				'border-2 border-gray-200 dark:border-gray-700': variant === 'outline',
				'border border-transparent': variant === 'ghost',
			},
			{
				'p-0': padding === 'none',
				'p-1rem': padding === 'sm',
				'p-1.5rem': padding === 'md',
				'p-2rem': padding === 'lg',
			},
			{
				'hover:-translate-y-2px hover:shadow-lg': hover,
			},
		]"
	>
		<slot />
	</div>
</template>
