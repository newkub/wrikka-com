export const useProjects = () => {
	const projects = ref([
		{
			id: 1,
			title: "E-commerce Platform",
			description: "ระบบ e-commerce ที่สมบูรณ์ด้วย Vue 3 และ Nuxt 3",
			tech: ["Vue 3", "Nuxt 3", "TypeScript", "Tailwind CSS"],
			image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
			demo: "#",
			github: "#",
			status: "Completed",
		},
		{
			id: 2,
			title: "Task Management App",
			description: "แอปจัดการงานที่ทันสมัยด้วย real-time collaboration",
			tech: ["Vue 3", "Node.js", "Socket.io", "MongoDB"],
			image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
			demo: "#",
			github: "#",
			status: "In Progress",
		},
		{
			id: 3,
			title: "Weather Dashboard",
			description: "แดชบอร์ดสภาพอากาศที่แสดงข้อมูลแบบ real-time",
			tech: ["Vue 3", "Chart.js", "Weather API", "UnoCSS"],
			image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=600&fit=crop",
			demo: "#",
			github: "#",
			status: "Completed",
		},
		{
			id: 4,
			title: "Blog CMS",
			description: "ระบบจัดการเนื้อหาบล็อกด้วย Markdown และ Nuxt Content",
			tech: ["Nuxt 3", "Nuxt Content", "TailwindCSS", "Shiki"],
			image: "https://images.unsplash.com/photo-1486312338219-ce68e2c6b936?w=800&h=600&fit=crop",
			demo: "#",
			github: "#",
			status: "Planning",
		},
	]);

	return {
		projects,
	};
};
