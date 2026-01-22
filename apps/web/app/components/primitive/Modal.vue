<script setup lang="ts">
const props = defineProps<{
	isOpen: boolean;
}>();

const emit = defineEmits<{
	(e: "update:isOpen", value: boolean): void;
	(e: "close"): void;
}>();

const close = () => {
	emit("update:isOpen", false);
	emit("close");
};

const handleBackdropClick = () => {
	close();
};

const handleKeydown = (e: KeyboardEvent) => {
	if (e.key === "Escape") {
		close();
	}
};

onMounted(() => {
	if (props.isOpen) {
		document.addEventListener("keydown", handleKeydown);
	}
});

onUnmounted(() => {
	document.removeEventListener("keydown", handleKeydown);
});

watch(() => props.isOpen, (isOpen) => {
	if (isOpen) {
		document.addEventListener("keydown", handleKeydown);
	} else {
		document.removeEventListener("keydown", handleKeydown);
	}
});
</script>

<template>
	<Transition
		enter-active-class="transition-opacity duration-200"
		leave-active-class="transition-opacity duration-200"
		enter-from-class="opacity-0"
		leave-to-class="opacity-0"
	>
		<div
			v-if="isOpen"
			class="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] bg-black/50 animate-in fade-in duration-200"
			@click="handleBackdropClick"
		>
			<div
				class="w-full max-w-[600px] bg-background rounded-xl shadow-2xl animate-in slide-in-from-top-5 duration-200"
				@click.stop
			>
				<slot />
			</div>
		</div>
	</Transition>
</template>
