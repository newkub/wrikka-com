import type { Project } from "../../../shared/types/projects";

export const useProjects = () => {
	const { data: projects, pending, error } = useFetch<Project[]>("/api/projects");

	return { projects, pending, error };
};
