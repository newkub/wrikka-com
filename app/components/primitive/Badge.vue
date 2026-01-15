<script setup lang="ts">
interface Props {
	variant?: "default" | "success" | "warning" | "error"
	size?: "sm" | "md"
}

const props = withDefaults(defineProps<Props>(), {
	variant: "default",
	size: "md",
})
</script>

<template>
	<span
		:class="[
			'inline-flex items-center rounded-0.25rem font-500',
			{
				'bg-blue-600 text-white': variant === 'default',
				'bg-green-600 text-white': variant === 'success',
				'bg-yellow-600 text-white': variant === 'warning',
				'bg-red-600 text-white': variant === 'error',
			},
			{
				'px-0.25rem py-0.125rem text-0.75rem': size === 'sm',
				'px-0.5rem py-0.25rem text-0.875rem': size === 'md',
			},
		]"
	>
		<slot />
	</span>
</template>
