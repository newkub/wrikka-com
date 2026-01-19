<script setup lang="ts">
import { computed } from "vue";

interface Props {
	code: string;
	language?: string;
	filename?: string;
}

const props = withDefaults(defineProps<Props>(), {
	language: "",
	filename: "",
});

const decodedCode = computed(() => {
	return decodeURIComponent(props.code);
});
</script>

<template>
	<div class="relative my-4">
		<!-- Filename Header -->
		<div v-if="filename" class="flex items-center justify-between mb-3">
			<div class="flex items-center gap-2">
				<Icon name="mdi:file-code-outline" class="w-1rem h-1rem text-primary" />
				<span class="text-sm font-600 text-foreground">{{ filename }}</span>
			</div>

			<!-- Copy Button -->
			<CopyButton :code="code" />
		</div>

		<!-- Copy Button (for code blocks without filename) -->
		<div v-else class="flex justify-end mb-2">
			<CopyButton :code="code" />
		</div>

		<!-- Code Content -->
		<div class="overflow-x-auto rounded-lg" v-html="decodedCode" />
	</div>
</template>


