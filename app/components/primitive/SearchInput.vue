<script setup lang="ts">
const props = defineProps<{
	modelValue: string
	placeholder?: string
}>()

const emit = defineEmits<{
	(e: 'update:modelValue', value: string): void
	(e: 'clear'): void
}>()

const input = ref<HTMLInputElement>()

const handleInput = (e: Event) => {
	const target = e.target as HTMLInputElement
	emit('update:modelValue', target.value)
}

const clear = () => {
	emit('update:modelValue', '')
	emit('clear')
}

defineExpose({
	focus: () => input.value?.focus(),
})
</script>

<template>
	<div class="flex flex-1 items-center gap-3 relative">
		<Icon name="mdi:magnify" size="20" class="text-muted-foreground flex-shrink-0" />
		<input
			ref="input"
			:model-value="modelValue"
			@input="handleInput"
			type="text"
			:placeholder="placeholder"
			class="flex-1 border-none bg-transparent outline-none text-base text-foreground placeholder:text-muted-foreground"
		/>
		<button
			v-if="modelValue"
			@click="clear"
			class="flex items-center justify-center w-6 h-6 border-none bg-transparent text-muted-foreground cursor-pointer rounded hover:bg-accent hover:text-foreground transition-all flex-shrink-0"
			aria-label="Clear"
		>
			<Icon name="mdi:close" size="16" />
		</button>
	</div>
</template>


