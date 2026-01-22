<script setup lang="ts">
const props = defineProps<{
	code: string;
}>();

const copied = ref(false);

const copyCode = async () => {
	try {
		const decodedCode = decodeURIComponent(props.code);
		await navigator.clipboard.writeText(decodedCode);
		copied.value = true;
		setTimeout(() => {
			copied.value = false;
		}, 2000);
	} catch (err) {
		console.error("Failed to copy code:", err);
	}
};
</script>

<template>
	<button
		@click="copyCode"
		class="absolute top-2 right-2 bg-surface hover:bg-muted text-foreground p-1.5 rounded-md transition-all-0.2s opacity-0 group-hover:opacity-100 z-10"
		:title="copied ? 'Copied!' : 'Copy code'"
	>
		<Icon
			v-if="!copied"
			name="mdi:content-copy"
			class="w-1rem h-1rem"
		/>
		<Icon
			v-else
			name="mdi:check"
			class="w-1rem h-1rem text-success-foreground"
		/>
	</button>
</template>
