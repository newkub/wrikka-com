<script setup lang="ts">
defineProps<{ bio: string }>();
</script>

<template>
	<section class="border-t border-gray-700 pt-8">
		<p class="text-gray-300 leading-relaxed whitespace-pre-line">
			{{ bio }}
		</p>
	</section>
</template>
