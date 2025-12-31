import { defineStore } from "pinia";
import { projectsData } from "~~/shared/data/projects";
import type { Project } from "~~/shared/types/projects";

export const useProjectsStore = defineStore("projects", {
	state: () => ({
		projects: [] as Project[],
	}),
	actions: {
		async fetchProjects() {
			if (this.projects.length) return;
			this.projects = projectsData;
		},
	},
});
