<script setup lang="ts">
const { render, extractCodeBlocks } = await useMarkdownRenderer();

interface Props {
	content: string;
}

const props = defineProps<Props>();

const renderedContent = computed(() => {
	if (!props.content) return "";
	return render(props.content);
});

const codeBlocks = computed(() => {
	return extractCodeBlocks(props.content);
});

const renderWithCodeBlocks = (content: string) => {
	// Replace code blocks with placeholders
	return content.replace(
		/```(\w+)?(?:\[([^\]]+)\])?\n([\s\S]*?)```/g,
		"___CODEBLOCK___",
	);
};
</script>

<template>
	<div class="prose prose-sm max-w-none">
		<PrimitiveCodeBlock
			v-for="(block, index) in codeBlocks"
			:key="index"
			:code="block.code"
			:language="block.language"
			:filename="block.filename"
		/>
		<div v-html="renderedContent" class="markdown-body"></div>
	</div>
</template>
