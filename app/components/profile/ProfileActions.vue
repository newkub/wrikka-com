<script setup lang="ts">
defineProps<{
	introUrl?: string;
	email?: string;
}>();
</script>

<template>
	<section class="flex flex-wrap gap-3">
		<a
			v-if="introUrl"
			:href="introUrl"
			target="_blank"
			rel="noreferrer"
			class="inline-flex items-center gap-2 rounded-xl bg-primary dark:bg-primary-dark text-white px-4 py-2.5 text-sm font-semibold focus:(outline-none ring-2 ring-accent ring-offset-2 ring-offset-surface)"
		>
			<Icon name="mdi:calendar-clock" size="18" />
			<span>Book an intro call</span>
		</a>

		<a
			v-if="email"
			:href="`mailto:${email}`"
			class="inline-flex items-center gap-2 rounded-xl border border-surface-200 dark:border-surface-200-dark bg-surface dark:bg-surface-dark text-primary dark:text-primary-dark px-4 py-2.5 text-sm font-semibold focus:(outline-none ring-2 ring-accent ring-offset-2 ring-offset-surface)"
		>
			<Icon name="mdi:email-outline" size="18" />
			<span>Send an email</span>
		</a>
	</section>
</template>
