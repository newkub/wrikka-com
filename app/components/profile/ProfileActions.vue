<script setup lang="ts">
defineProps<{ email?: string | null }>();
</script>

<template>
	<section class="flex flex-wrap gap-4 border-b border-gray-700 pb-8">
		<a
			href="#"
			class="inline-flex items-center gap-2 rounded-lg bg-white text-gray-900 px-4 py-2 font-semibold hover:bg-gray-200 transition-colors"
		>
			<span class="i-carbon-calendar-heat-map text-xl"></span>
			<span>Book an intro call</span>
		</a>
		<a
			v-if="email"
			:href="`mailto:${email}`"
			class="inline-flex items-center gap-2 rounded-lg border border-gray-700 bg-transparent text-white px-4 py-2 font-semibold hover:bg-gray-800 transition-colors"
		>
			<span class="i-carbon-email text-xl"></span>
			<span>Send an email</span>
		</a>
	</section>
</template>
