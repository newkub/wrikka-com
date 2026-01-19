<script setup lang="ts">
interface Props {
	to: string;
	icon?: string;
	active?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	icon: "",
	active: false,
});
</script>

<template>
	<NuxtLink
		:to="to"
		class="flex items-center gap-0.5rem px-0.75rem py-0.5rem rounded-0.375rem no-underline text-foreground transition-all-0.2s font-500 hover:text-primary hover:bg-muted"
		:class="{
			'text-primary bg-primary/10': active,
		}"
	>
		<Icon v-if="icon" :name="icon" class="w-1rem h-1rem" />
		<slot />
	</NuxtLink>
</template>


