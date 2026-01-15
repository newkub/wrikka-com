<script setup lang="ts">
interface Props {
	heading: string;
	content: string;
	icon: string;
}

defineProps<Props>();

const emit = defineEmits<{
	click: [];
}>();
</script>

<template>
	<button
		type="button"
		class="group flex flex-col gap-0.75rem p-1rem rounded-0.5rem border border-border bg-surface hover:border-primary hover:shadow-md transition-all-0.2s w-full text-left"
		@click="emit('click')"
	>
		<div class="flex items-center gap-0.5rem">
			<Icon
				:name="icon"
				class="w-1.25rem h-1.25rem text-primary"
			/>
			<h3 class="text-1rem font-600 m-0 text-foreground">
				{{ heading }}
			</h3>
		</div>

		<p class="text-0.875rem text-muted-foreground line-clamp-2">
			{{ content }}
		</p>
	</button>
</template>
