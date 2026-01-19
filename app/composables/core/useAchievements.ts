import type { Achievement } from "#shared/types/achievements";

export const useAchievements = () => {
	const achievements = ref<Achievement[]>([
		{
			id: "1",
			title: "Senior Developer Promotion",
			description:
				"Promoted to Senior Full Stack Developer after demonstrating exceptional technical skills and leadership abilities.",
			date: "2023-01",
			icon: "🏆",
		},
		{
			id: "2",
			title: "Open Source Contributor",
			description: "Contributed to multiple open source projects including Nuxt, VueUse, and other popular libraries.",
			date: "2022-06",
			icon: "💻",
		},
		{
			id: "3",
			title: "Technical Speaker",
			description: "Delivered talks at local meetups and conferences about modern web development and best practices.",
			date: "2022-03",
			icon: "🎤",
		},
		{
			id: "4",
			title: "Project Lead",
			description:
				"Successfully led a team of 5 developers to deliver a major e-commerce platform on time and within budget.",
			date: "2021-11",
			icon: "👥",
		},
	]);

	return {
		achievements,
	};
};
