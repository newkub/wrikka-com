<script setup lang="ts">
interface Props {
	type?: "button" | "submit" | "reset"
	variant?: "primary" | "secondary" | "outline" | "ghost"
	size?: "sm" | "md" | "lg"
	disabled?: boolean
	loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	type: "button",
	variant: "primary",
	size: "md",
	disabled: false,
	loading: false,
})

const emit = defineEmits<{
	click: [event: MouseEvent]
}>()

const handleClick = (event: MouseEvent) => {
	if (!props.disabled && !props.loading) {
		emit("click", event)
	}
}
</script>

<template>
	<button
		:type="type"
		:disabled="disabled || loading"
		:class="[
			'inline-flex items-center justify-center gap-0.5rem rounded-0.375rem font-600 transition-all-0.2s',
			{
				'bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed': variant === 'primary',
				'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed': variant === 'secondary',
				'border-2 border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 disabled:opacity-50 disabled:cursor-not-allowed': variant === 'outline',
				'bg-transparent text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed': variant === 'ghost',
			},
			{
				'px-0.75rem py-0.375rem text-0.875rem': size === 'sm',
				'px-1rem py-0.5rem text-1rem': size === 'md',
				'px-1.5rem py-0.75rem text-1.125rem': size === 'lg',
			},
		]"
		@click="handleClick"
	>
		<Icon v-if="loading" name="mdi:loading" class="w-1rem h-1rem animate-spin" />
		<slot />
	</button>
</template>
