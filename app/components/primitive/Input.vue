<script setup lang="ts">
interface Props {
	id?: string
	type?: "text" | "email" | "password" | "number" | "tel" | "url"
	placeholder?: string
	disabled?: boolean
	required?: boolean
	modelValue: string
}

const props = withDefaults(defineProps<Props>(), {
	type: "text",
	disabled: false,
	required: false,
})

const emit = defineEmits<{
	"update:modelValue": [value: string]
}>()

const updateValue = (event: Event) => {
	const target = event.target as HTMLInputElement
	emit("update:modelValue", target.value)
}
</script>

<template>
	<input
		:id="id"
		:type="type"
		:value="modelValue"
		:placeholder="placeholder"
		:disabled="disabled"
		:required="required"
		class="w-full px-1rem py-0.75rem bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-0.375rem text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all-0.2s disabled:opacity-50 disabled:cursor-not-allowed"
		@input="updateValue"
	/>
</template>
