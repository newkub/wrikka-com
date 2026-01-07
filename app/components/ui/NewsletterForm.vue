<script setup lang="ts">
const email = ref("");
const message = ref("");
const isLoading = ref(false);

const subscribe = async () => {
	if (!email.value) return;
	isLoading.value = true;
	message.value = "";
	try {
		await $fetch("/api/subscribe", {
			method: "POST",
			body: { email: email.value },
		});
		message.value = "Thanks for subscribing!";
		email.value = "";
	} catch (error) {
		message.value = "Something went wrong. Please try again.";
	} finally {
		isLoading.value = false;
	}
};
</script>

<template>
	<section class="bg-surface-100/60 dark:bg-surface-200/10 border border-surface-200 dark:border-surface-800 rounded-lg p-8 text-center">
		<h2 class="text-3xl font-bold text-primary dark:text-primary-dark">
			Stay Updated
		</h2>
		<p class="mt-2 text-secondary">
			Subscribe to my newsletter for the latest articles and project updates.
		</p>
		<form
			@submit.prevent="subscribe"
			class="mt-6 max-w-md mx-auto flex flex-col sm:flex-row gap-4"
		>
			<input
				v-model="email"
				type="email"
				placeholder="your@email.com"
				required
				class="flex-1 px-4 py-3 rounded-lg bg-surface dark:bg-surface-dark border border-surface-200 dark:border-surface-800 text-primary dark:text-primary-dark focus:outline-none focus:ring-2 focus:ring-accent transition-all"
			/>
			<button
				type="submit"
				:disabled="isLoading"
				class="px-6 py-3 rounded-lg bg-accent text-white font-semibold hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
			>
				{{ isLoading ? "Subscribing..." : "Subscribe" }}
			</button>
		</form>
		<p v-if="message" class="mt-4 text-sm text-secondary">{{ message }}</p>
	</section>
</template>
