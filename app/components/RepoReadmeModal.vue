<script setup lang="ts">
interface Props {
	show: boolean;
	repoName: string;
	readme: string | null | undefined;
	htmlUrl: string;
	updatedAt: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
	close: [];
}>();

const { formatTimeAgo } = useDate();
</script>

<template>
	<Teleport to="body">
		<Transition
			enter-active-class="transition-all-0.3s ease-out"
			enter-from-class="opacity-0"
			enter-to-class="opacity-100"
			leave-active-class="transition-all-0.3s ease-in"
			leave-from-class="opacity-100"
			leave-to-class="opacity-0"
		>
			<div
				v-if="show"
				class="fixed inset-0 z-50 flex items-center justify-center p-4"
				@click="emit('close')"
			>
				<div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
				<div
					class="relative bg-background rounded-1rem shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden"
					@click.stop
				>
					<div class="flex items-center justify-between p-1rem border-b border-border">
						<div class="flex items-center gap-0.75rem">
							<Icon
								name="mdi:book-open-variant"
								class="w-1.25rem h-1.25rem text-primary"
							/>
							<h3 class="text-1.25rem font-600 m-0">{{ repoName }}</h3>
						</div>
						<button
							@click="emit('close')"
							class="flex items-center justify-center w-2rem h-2rem rounded-full hover:bg-muted transition-colors-0.2s text-muted-foreground hover:text-foreground"
						>
							<Icon name="mdi:close" class="w-1.25rem h-1.25rem" />
						</button>
					</div>
					<div class="p-1rem overflow-y-auto max-h-[calc(80vh-4rem)]">
						<div v-if="readme" class="prose prose-sm max-w-none">
							{{ readme }}
						</div>
						<div v-else class="text-center py-4rem text-muted-foreground">
							<Icon
								name="mdi:book-open-variant-outline"
								class="w-4rem h-4rem mx-auto mb-1rem opacity-50"
							/>
							<p class="text-1rem">No README available</p>
						</div>
					</div>
					<div class="flex items-center justify-between p-1rem border-t border-border">
						<a
							:href="htmlUrl"
							target="_blank"
							rel="noopener"
							class="flex items-center gap-0.375rem px-1rem py-0.5rem rounded-0.25rem text-0.875rem text-muted-foreground hover:bg-muted hover:text-foreground transition-all-0.2s no-underline"
						>
							<Icon name="mdi:open-in-new" class="w-1rem h-1rem" />
							View on GitHub
						</a>
						<span class="text-0.75rem text-muted-foreground">
							Updated {{ formatTimeAgo(updatedAt) }}
						</span>
					</div>
				</div>
			</div>
		</Transition>
	</Teleport>
</template>
