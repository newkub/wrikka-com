import { storeToRefs } from "pinia";
import { useProjectsStore } from "~/stores/projects";
import type { Project } from "~~/shared/types/projects";

export const useProjects = async () => {
	const projectsStore = useProjectsStore();
	const { projects } = storeToRefs(projectsStore);

	if (projects.value.length === 0) {
		await projectsStore.fetchProjects();
	}

	return { projects: projects as Ref<Project[]> };
};
