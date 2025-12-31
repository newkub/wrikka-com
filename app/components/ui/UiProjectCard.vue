<script setup lang="ts">
const props = defineProps<{ project: any }>();
</script>

<template>
	<div class="border rounded p-4">
		<h3 class="font-bold">{{ props.project.name }}</h3>
		<p>{{ props.project.description }}</p>
	</div>
</template>
