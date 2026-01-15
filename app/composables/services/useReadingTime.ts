export const useReadingTime = (content: string) => {
	const wordsPerMinute = 200;

	const calculateReadingTime = (text: string): number => {
		if (!text || typeof text !== "string") return 0;
		const words = text.trim().split(/\s+/).length;
		return Math.ceil(words / wordsPerMinute);
	};

	const readingTime = computed(() => calculateReadingTime(content));

	const formatReadingTime = (minutes: number): string => {
		if (minutes < 1) return "< 1 min read";
		if (minutes === 1) return "1 min read";
		return `${minutes} min read`;
	};

	return {
		readingTime,
		formatReadingTime,
	};
};
