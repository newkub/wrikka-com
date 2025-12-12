<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { useMarkdownRenderer } from "~/composables/useMarkdownRenderer";

const props = defineProps<{ content: string }>();

const renderedContent = ref("");

watchEffect(async () => {
	if (props.content) {
		const md = await useMarkdownRenderer();
		renderedContent.value = md.render(props.content);
	}
});
</script>

<template>
	<div v-html="renderedContent" />
</template>
