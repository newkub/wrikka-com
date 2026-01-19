<script setup lang="ts">
interface Props {
	variant?: "default" | "success" | "warning" | "error" | "outline";
	size?: "sm" | "md";
}

const props = withDefaults(defineProps<Props>(), {
	variant: "default",
	size: "md",
});
</script>

<template>
	<span
		:class="[
			'inline-flex items-center rounded-0.25rem font-500',
			{
				'bg-primary text-primary-foreground': variant === 'default',
				'bg-success text-success-foreground': variant === 'success',
				'bg-warning text-warning-foreground': variant === 'warning',
				'bg-destructive text-destructive-foreground': variant === 'error',
				'border border-border bg-transparent text-foreground':
					variant === 'outline',
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


