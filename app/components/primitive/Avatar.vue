<script setup lang="ts">
interface Props {
	src?: string;
	alt?: string;
	size?: "sm" | "md" | "lg";
}

const props = withDefaults(defineProps<Props>(), {
	size: "md",
});
</script>

<template>
	<img
		:src="src"
		:alt="alt"
		:class="[
			'rounded-full object-cover',
			{
				'w-2rem h-2rem': size === 'sm',
				'w-3rem h-3rem': size === 'md',
				'w-4rem h-4rem': size === 'lg',
			},
		]"
	/>
</template>


