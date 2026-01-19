import type { CaseStudy } from "#shared/types/case-studies";

export const useCaseStudies = () => {
	const caseStudies = ref<CaseStudy[]>([
		{
			id: "1",
			title: "E-commerce Platform Redesign",
			slug: "ecommerce-platform-redesign",
			description: "Complete redesign of an e-commerce platform resulting in 40% increase in conversions.",
			problem:
				"The existing e-commerce platform had outdated UI/UX, slow performance, and poor mobile experience, leading to low conversion rates.",
			solution:
				"Redesigned the entire platform using modern technologies, implemented responsive design, optimized performance, and improved user experience.",
			outcome: "40% increase in conversions, 60% improvement in page load time, and 50% increase in mobile users.",
			technologies: ["Nuxt", "Vue.js", "TypeScript", "Stripe", "PostgreSQL", "Redis"],
			images: ["https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800"],
			liveUrl: "https://example.com",
			githubUrl: "https://github.com/example/ecommerce",
			featured: true,
			date: "2024-01",
		},
		{
			id: "2",
			title: "Real-time Analytics Dashboard",
			slug: "realtime-analytics-dashboard",
			description: "Built a real-time analytics dashboard for monitoring business metrics.",
			problem: "The client needed a way to monitor business metrics in real-time across multiple data sources.",
			solution:
				"Created a dashboard that aggregates data from multiple sources and displays it in real-time with customizable widgets.",
			outcome: "Reduced data analysis time by 70%, improved decision-making speed, and increased team productivity.",
			technologies: ["React", "Next.js", "TypeScript", "WebSocket", "PostgreSQL", "Chart.js"],
			images: ["https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800"],
			liveUrl: "https://example.com",
			githubUrl: "https://github.com/example/analytics",
			featured: true,
			date: "2023-11",
		},
		{
			id: "3",
			title: "Social Media Management Tool",
			slug: "social-media-management-tool",
			description: "Developed a comprehensive social media management platform.",
			problem: "Managing multiple social media accounts was time-consuming and inefficient for the client.",
			solution:
				"Built a unified platform that allows scheduling, analytics, and management of multiple social media accounts from one place.",
			outcome:
				"Saved 10+ hours per week on social media management, increased engagement by 35%, and improved content consistency.",
			technologies: ["Nuxt", "Vue.js", "TypeScript", "Node.js", "MongoDB", "Redis"],
			images: ["https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800"],
			liveUrl: "https://example.com",
			githubUrl: "https://github.com/example/social",
			featured: false,
			date: "2023-09",
		},
	]);

	const featuredCaseStudies = computed(() => caseStudies.value.filter(cs => cs.featured));

	return {
		caseStudies,
		featuredCaseStudies,
	};
};
