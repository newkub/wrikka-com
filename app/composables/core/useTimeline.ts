import type { TimelineItem } from "#shared/types/timeline";

export const useTimeline = () => {
	const timeline = ref<TimelineItem[]>([
		{
			id: "1",
			company: "Tech Company",
			position: "Senior Full Stack Developer",
			startDate: "2023-01",
			current: true,
			description: "Leading development of modern web applications using Nuxt, Vue.js, and TypeScript. Implementing best practices and mentoring junior developers.",
			technologies: ["Nuxt", "Vue.js", "TypeScript", "Node.js", "PostgreSQL"],
			location: "Bangkok, Thailand",
			url: "https://example.com",
		},
		{
			id: "2",
			company: "Digital Agency",
			position: "Full Stack Developer",
			startDate: "2021-06",
			endDate: "2022-12",
			description: "Developed and maintained multiple client projects. Built responsive web applications and RESTful APIs.",
			technologies: ["React", "Next.js", "Node.js", "MongoDB", "AWS"],
			location: "Bangkok, Thailand",
			url: "https://example.com",
		},
		{
			id: "3",
			company: "Startup Inc",
			position: "Frontend Developer",
			startDate: "2020-01",
			endDate: "2021-05",
			description: "Created user interfaces for web applications. Collaborated with designers to implement pixel-perfect designs.",
			technologies: ["Vue.js", "Nuxt.js", "TailwindCSS", "Firebase"],
			location: "Remote",
			url: "https://example.com",
		},
	]);

	const sortedTimeline = computed(() => {
		return [...timeline.value].sort((a, b) => {
			const dateA = a.endDate || a.current ? new Date().toISOString() : a.startDate;
			const dateB = b.endDate || b.current ? new Date().toISOString() : b.startDate;
			return new Date(dateB).getTime() - new Date(dateA).getTime();
		});
	});

	return {
		timeline: sortedTimeline,
	};
};
