import type { Project } from '../../../shared/types/projects';

export default defineEventHandler((): Project[] => {
	return [
		{
			name: 'My Awesome Project',
			description: 'A brief description of this amazing project that solves a real-world problem.',
			tags: ['Vue.js', 'Nuxt.js', 'TypeScript', 'Tailwind CSS'],
			imageUrl: 'https://via.placeholder.com/400x250',
			url: '#',
			githubUrl: '#',
		},
		{
			name: 'Another Cool App',
			description: 'This app leverages modern technologies to deliver a seamless user experience.',
			tags: ['React', 'Next.js', 'GraphQL'],
			imageUrl: 'https://via.placeholder.com/400x250',
			url: '#',
		},
		{
			name: 'Open Source Contribution',
			description: 'Contributed to a popular open-source library, focusing on performance and accessibility.',
			tags: ['Open Source', 'Performance', 'Accessibility'],
			imageUrl: 'https://via.placeholder.com/400x250',
			githubUrl: '#',
		},
	];
});
