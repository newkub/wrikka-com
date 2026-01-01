<script setup lang="ts">
import type { GithubProfile } from "../../../shared/types/github";

const props = defineProps<{
	profile: GithubProfile;
	viewsCount: number;
}>();

const emit = defineEmits<{
	toggleTheme: [];
}>();
</script>

<template>
	<section class="bg-surface rounded-2xl border border-surface-200 p-5 sm:p-6">
		<div class="flex gap-5">
			<div class="shrink-0">
				<img
					:src="props.profile.avatarUrl"
					:alt="props.profile.name ?? props.profile.login"
					class="w-20 h-20 rounded-2xl border border-surface-200 object-cover"
				/>
			</div>

			<div class="flex-1 min-w-0">
				<div class="flex justify-between gap-4">
					<div class="min-w-0">
						<h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-primary truncate">
							{{ props.profile.name ?? props.profile.login }}
						</h1>
						<p class="mt-1 text-secondary">
							Open Source Contributor
						</p>
					</div>

					<div class="flex items-start gap-3 shrink-0">
						<button
							type="button"
							class="w-10 h-10 grid place-items-center rounded-full border border-surface-200 text-secondary hover:text-primary hover:border-primary transition-colors"
							@click="emit('toggleTheme')"
						>
							<Icon name="mdi:theme-light-dark" size="18" />
						</button>

						<div class="flex items-center gap-2 text-secondary">
							<Icon name="mdi:eye-outline" size="18" />
							<span class="text-sm">{{ props.viewsCount }}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
