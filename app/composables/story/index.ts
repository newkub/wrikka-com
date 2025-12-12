export const useStory = () => {
	const showProfileModal = ref(false);
	const currentStoryIndex = ref(0);
	const storyProgress = ref(0);
	const isAutoPlaying = ref(true);

	const stories = [
		{
			id: 1,
			content: "🎯 หลงใหลในการพัฒนาเว็บไซต์และแอปพลิเคชัน",
			subtitle: "Passion for Development",
		},
		{
			id: 2,
			content: "💻 เชี่ยวชาญ Vue.js, Nuxt.js, TypeScript",
			subtitle: "Tech Skills",
		},
		{
			id: 3,
			content: "🚀 สร้างประสบการณ์ผู้ใช้ที่น่าประทับใจ",
			subtitle: "User Experience",
		},
		{
			id: 4,
			content: "📝 แบ่งปันความรู้ผ่านบล็อกและโปรเจกต์",
			subtitle: "Knowledge Sharing",
		},
	];

	let storyInterval: NodeJS.Timeout | null = null;

	const startStory = () => {
		if (storyInterval) clearInterval(storyInterval);

		storyProgress.value = 0;
		isAutoPlaying.value = true;

		storyInterval = setInterval(() => {
			if (isAutoPlaying.value) {
				storyProgress.value += 2;

				if (storyProgress.value >= 100) {
					nextStory();
				}
			}
		}, 100);
	};

	const nextStory = () => {
		if (currentStoryIndex.value < stories.length - 1) {
			currentStoryIndex.value++;
			storyProgress.value = 0;
		} else {
			closeStory();
		}
	};

	const prevStory = () => {
		if (currentStoryIndex.value > 0) {
			currentStoryIndex.value--;
			storyProgress.value = 0;
		}
	};

	const togglePlayPause = () => {
		isAutoPlaying.value = !isAutoPlaying.value;
	};

	const closeStory = () => {
		showProfileModal.value = false;
		if (storyInterval) {
			clearInterval(storyInterval);
			storyInterval = null;
		}
		currentStoryIndex.value = 0;
		storyProgress.value = 0;
		isAutoPlaying.value = true;
	};

	const openStory = () => {
		showProfileModal.value = true;
		startStory();
	};

	onUnmounted(() => {
		if (storyInterval) {
			clearInterval(storyInterval);
		}
	});

	return {
		showProfileModal,
		currentStoryIndex,
		storyProgress,
		isAutoPlaying,
		stories,
		nextStory,
		prevStory,
		togglePlayPause,
		closeStory,
		openStory,
	};
};
