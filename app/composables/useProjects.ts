import { storeToRefs } from "pinia";
import { useProjectsStore } from "~/stores/projects";

export const useProjects = async () => {
	const projectsStore = useProjectsStore();
	const { projects } = storeToRefs(projectsStore);

	if (projects.value.length === 0) {
		await projectsStore.fetchProjects();
	}

	return { projects };
};
