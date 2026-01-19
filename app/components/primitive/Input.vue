<script setup lang="ts">
interface Props {
	id?: string;
	type?: "text" | "email" | "password" | "number" | "tel" | "url";
	placeholder?: string;
	disabled?: boolean;
	required?: boolean;
	modelValue: string;
}

const props = withDefaults(defineProps<Props>(), {
	type: "text",
	disabled: false,
	required: false,
});

const emit = defineEmits<{
	"update:modelValue": [value: string];
}>();

const updateValue = (event: Event) => {
	const target = event.target as HTMLInputElement;
	emit("update:modelValue", target.value);
};
</script>

<template>
	<input
		:id="id"
		:type="type"
		:value="modelValue"
		:placeholder="placeholder"
		:disabled="disabled"
		:required="required"
		class="w-full px-1rem py-0.75rem bg-background border border-border rounded-0.375rem text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all-0.2s disabled:opacity-50 disabled:cursor-not-allowed"
		@input="updateValue"
	/>
</template>


