<script setup lang="ts">
interface Project {
	id: number;
	title: string;
	description: string;
	tech: string[];
	image: string;
	demo: string;
	github: string;
	status: string;
}

defineProps<{
	project: Project;
}>();
</script>

<template>
	<div class="bg-card dark:bg-card-dark rounded-2xl overflow-hidden border border-surface-200 dark:border-surface-200-dark hover:border-accent dark:hover:border-accent-dark transition-all duration-300 hover:shadow-xl hover:shadow-accent/10 group">
		<!-- Project Image -->
		<div class="relative h-48 overflow-hidden">
			<img
				:src="project.image"
				:alt="project.title"
				class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
			>
			<div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent">
			</div>

			<!-- Status Badge -->
			<div class="absolute top-4 right-4">
				<span
					:class="{
						'bg-status-completed': project.status === 'Completed',
						'bg-status-inProgress': project.status === 'In Progress',
						'bg-status-planning': project.status === 'Planning',
					}"
					class="text-white text-xs px-3 py-1 rounded-full font-medium"
				>
					{{
						project.status === "Completed"
						? "เสร็จแล้ว"
						: project.status === "In Progress"
						? "กำลังพัฒนา"
						: "วางแผน"
					}}
				</span>
			</div>
		</div>

		<!-- Project Content -->
		<div class="p-6">
			<h3 class="text-xl font-bold text-primary dark:text-primary-dark mb-3">
				{{ project.title }}
			</h3>
			<p class="text-secondary dark:text-secondary-dark text-sm leading-relaxed mb-4">
				{{ project.description }}
			</p>

			<!-- Tech Stack -->
			<div class="flex flex-wrap gap-2 mb-6">
				<span
					v-for="tech in project.tech"
					:key="tech"
					class="text-xs bg-surface-100 dark:bg-surface-100-dark text-secondary dark:text-secondary-dark px-2 py-1 rounded-lg"
				>
					{{ tech }}
				</span>
			</div>

			<!-- Action Buttons -->
			<div class="flex gap-3">
				<a
					:href="project.demo"
					class="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-accent to-primary text-white py-2 px-4 rounded-lg hover:shadow-lg hover:scale-[1.02] transition-all duration-200 text-sm font-medium"
				>
					<div class="i-mdi-open-in-new w-4 h-4" />
					Demo
				</a>
				<a
					:href="project.github"
					class="flex-1 flex items-center justify-center gap-2 bg-surface-100 dark:bg-surface-100-dark text-secondary dark:text-secondary-dark py-2 px-4 rounded-lg hover:bg-surface-200 dark:hover:bg-surface-200-dark transition-all duration-200 text-sm font-medium"
				>
					<div class="i-mdi-github w-4 h-4" />
					Code
				</a>
			</div>
		</div>
	</div>
</template>
