import type { Skill } from "#shared/types/skills";

export const useSkills = () => {
	const skills = ref<Skill[]>([
		{
			id: "1",
			name: "Vue.js",
			category: "Frontend",
			level: "expert",
			years: 4,
		},
		{
			id: "2",
			name: "Nuxt",
			category: "Frontend",
			level: "expert",
			years: 3,
		},
		{
			id: "3",
			name: "TypeScript",
			category: "Languages",
			level: "expert",
			years: 4,
		},
		{
			id: "4",
			name: "JavaScript",
			category: "Languages",
			level: "expert",
			years: 5,
		},
		{
			id: "5",
			name: "Node.js",
			category: "Backend",
			level: "advanced",
			years: 3,
		},
		{
			id: "6",
			name: "PostgreSQL",
			category: "Database",
			level: "advanced",
			years: 2,
		},
		{
			id: "7",
			name: "TailwindCSS",
			category: "Styling",
			level: "expert",
			years: 3,
		},
		{
			id: "8",
			name: "Git",
			category: "Tools",
			level: "advanced",
			years: 5,
		},
		{
			id: "9",
			name: "Docker",
			category: "DevOps",
			level: "intermediate",
			years: 2,
		},
		{
			id: "10",
			name: "AWS",
			category: "Cloud",
			level: "intermediate",
			years: 1,
		},
	]);

	const topSkills = computed(() => {
		return skills.value
			.filter((skill: Skill) => skill.level === "expert")
			.slice(0, 6);
	});

	const stats = computed(() => {
		const categories = new Set(skills.value.map((skill: Skill) => skill.category)).size;
		const expert = skills.value.filter((skill: Skill) => skill.level === "expert").length;
		const learning = skills.value.filter((skill: Skill) => skill.level === "learning").length;
		return {
			total: skills.value.length,
			categories,
			expert,
			learning,
		};
	});

	return {
		skills,
		topSkills,
		stats,
	};
};
