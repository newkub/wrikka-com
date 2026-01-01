export const useProjects = () => {
	const { data: projects, pending, error } = useFetch('/api/projects');

	return { projects, pending, error };
};
