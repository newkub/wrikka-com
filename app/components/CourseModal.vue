<script setup lang="ts">
interface Props {
	open: boolean;
	heading: string;
	content: string;
}

defineProps<Props>();

const emit = defineEmits<{
	close: [];
}>();

const modalRef = ref<HTMLElement | null>(null);

onClickOutside(modalRef, () => {
	emit('close');
});

onKeyStroke('Escape', () => {
	emit('close');
});
</script>

<template>
	<Transition
		enter-active-class="transition-opacity duration-200"
		enter-from-class="opacity-0"
		enter-to-class="opacity-100"
		leave-active-class="transition-opacity duration-200"
		leave-from-class="opacity-100"
		leave-to-class="opacity-0"
	>
		<div
			v-if="open"
			class="fixed inset-0 z-1000 flex items-center justify-center bg-black/50 backdrop-blur-sm p-1rem"
		>
			<Transition
				enter-active-class="transition-all duration-200"
				enter-from-class="opacity-0 scale-95"
				enter-to-class="opacity-100 scale-100"
				leave-active-class="transition-all duration-200"
				leave-from-class="opacity-100 scale-100"
				leave-to-class="opacity-0 scale-95"
			>
				<div
					v-if="open"
					ref="modalRef"
					class="bg-surface rounded-0.75rem shadow-2xl max-w-800px w-full max-h-[80vh] overflow-hidden flex flex-col"
				>
					<div class="flex items-center justify-between p-1.5rem border-b border-border">
						<h2 class="text-1.5rem font-700 m-0 text-foreground">
							{{ heading }}
						</h2>
						<button
							type="button"
							@click="emit('close')"
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
			</Transition>
		</div>
	</Transition>
</template>
