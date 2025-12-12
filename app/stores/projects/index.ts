import { defineStore } from 'pinia'
import type { Project } from '~/types/project'

export const useProjectsStore = defineStore('projects', {
  state: () => ({
    projects: [] as Project[],
  }),
  actions: {
    async fetchProjects() {
      if (this.projects.length) return
      const projects = await $fetch<Project[]>('/api/projects')
      this.projects = projects
    },
  },
})
