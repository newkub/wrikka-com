import { onMounted, onUnmounted, ref } from "vue";

export const useTableOfContents = () => {
	const activeHeadingId = ref("");
	const showTOC = ref(true);

	const toggleTOC = () => {
		showTOC.value = !showTOC.value;
	};

	const scrollToHeading = (id: string) => {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({
				behavior: "instant",
				block: "start",
			});
			activeHeadingId.value = id;
		}
	};

	const updateActiveHeading = () => {
		const headings = document.querySelectorAll("h1[id], h2[id], h3[id]");
		let current = "";

		for (const heading of headings) {
			const rect = heading.getBoundingClientRect();
			if (rect.top <= 100) {
				current = heading.id;
			}
		}

		activeHeadingId.value = current;
	};

	onMounted(() => {
		window.addEventListener("scroll", updateActiveHeading, { passive: true });
		updateActiveHeading();
	});

	onUnmounted(() => {
		window.removeEventListener("scroll", updateActiveHeading);
	});

	return {
		activeHeadingId,
		showTOC,
		toggleTOC,
		scrollToHeading,
	};
};
