<script setup lang="ts">
interface Props {
	open: boolean;
	heading: string;
	content: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
	(e: "update:open", value: boolean): void;
	(e: "close"): void;
}>();

const handleClose = () => {
	emit("update:open", false);
	emit("close");
};
</script>

<template>
	<Modal :is-open="open" @update:is-open="handleClose">
		<div class="bg-surface rounded-0.75rem shadow-2xl max-w-800px w-full max-h-[80vh] overflow-hidden flex flex-col">
			<div class="flex items-center justify-between p-1.5rem border-b border-border">
				<h2 class="text-1.5rem font-700 m-0 text-foreground">
					{{ heading }}
				</h2>
				<button
					type="button"
					@click="handleClose"
					class="flex items-center justify-center w-2rem h-2rem rounded-0.375rem hover:bg-muted transition-colors text-muted-foreground"
					aria-label="Close"
				>
					<Icon name="mdi:close" class="w-1.25rem h-1.25rem" />
				</button>
			</div>

			<div class="p-1.5rem overflow-y-auto flex-1">
				<div class="prose prose-gray dark:prose-invert max-w-none">
					<MDCRenderer :value="content" />
				</div>
			</div>
		</div>
	</Modal>
</template>
