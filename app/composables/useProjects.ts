interface ProjectLink {
	name: string;
	url: string;
}

export const useProjects = () => {
	const projects = ref<ProjectLink[]>([
		{ name: "Project A", url: "#" },
		{ name: "Project B", url: "#" },
		{ name: "Project C", url: "#" },
		{ name: "Project D", url: "#" },
	]);

	return { projects };
};
