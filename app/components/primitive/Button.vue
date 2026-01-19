<script setup lang="ts">
interface Props {
	type?: "button" | "submit" | "reset";
	variant?: "primary" | "secondary" | "outline" | "ghost";
	size?: "sm" | "md" | "lg";
	disabled?: boolean;
	loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	type: "button",
	variant: "primary",
	size: "md",
	disabled: false,
	loading: false,
});

const emit = defineEmits<{
	click: [event: MouseEvent];
}>();

const handleClick = (event: MouseEvent) => {
	if (!props.disabled && !props.loading) {
		emit("click", event);
	}
};
</script>

<template>
	<button
		:type="type"
		:disabled="disabled || loading"
		:class="[
			'inline-flex items-center justify-center gap-0.5rem rounded-0.375rem font-600 transition-all-0.2s',
			{
				'bg-primary text-primary-foreground hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed':
					variant === 'primary',
				'bg-surface text-foreground hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed':
					variant === 'secondary',
				'border-2 border-primary text-primary hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed':
					variant === 'outline',
				'bg-transparent text-foreground hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed':
					variant === 'ghost',
			},
			{
				'px-0.75rem py-0.375rem text-0.875rem': size === 'sm',
				'px-1rem py-0.5rem text-1rem': size === 'md',
				'px-1.5rem py-0.75rem text-1.125rem': size === 'lg',
			},
		]"
		@click="handleClick"
	>
		<Icon
			v-if="loading"
			name="mdi:loading"
			class="w-1rem h-1rem animate-spin"
		/>
		<slot />
	</button>
</template>


