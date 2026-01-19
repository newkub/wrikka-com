<script setup lang="ts">
const props = defineProps<{
	modelValue: string
	isOpen: boolean
}>()

const emit = defineEmits<{
	(e: 'update:modelValue', value: string): void
	(e: 'update:isOpen', value: boolean): void
}>()

const handleClear = () => {
	emit('update:modelValue', '')
}

const handleClose = () => {
	emit('update:isOpen', false)
	emit('update:modelValue', '')
}
</script>

<template>
	<Modal :is-open="isOpen" @update:is-open="handleClose">
		<div class="flex items-center gap-4 p-4 border-b border-border">
			<SearchInput
				:model-value="modelValue"
				@update:model-value="emit('update:modelValue', $event)"
				@clear="handleClear"
				placeholder="ค้นหาเอกสาร..."
			/>
			<div class="flex items-center gap-2">
				<kbd class="px-2 py-1 bg-accent border border-border rounded text-xs text-muted-foreground font-family">ESC</kbd>
			</div>
		</div>
	</Modal>
</template>


