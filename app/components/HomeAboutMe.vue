<script setup lang="ts">
const skills = [
	{ name: "Vue.js & Nuxt.js", icon: "i-logos-vue" },
	{ name: "React & Next.js", icon: "i-logos-react" },
	{ name: "TypeScript", icon: "i-logos-typescript-icon" },
	{ name: "Tailwind CSS", icon: "i-logos-tailwindcss-icon" },
	{ name: "Node.js", icon: "i-logos-nodejs-icon" },
	{ name: "GraphQL", icon: "i-logos-graphql" },
];
</script>

<template>
	<section class="py-12 bg-gray-900/50 rounded-lg shadow-xl backdrop-blur-md">
		<div class="container mx-auto px-4">
			<h2 class="text-4xl font-extrabold text-center text-white mb-8">
				About Me
			</h2>
			<div class="max-w-3xl mx-auto text-center text-gray-300">
				<p class="text-lg leading-relaxed mb-6">
					I'm a passionate full-stack developer with a love for creating
					beautiful, functional, and user-friendly web applications. I thrive on
					solving complex problems and continuously learning new technologies.
				</p>
				<p class="text-lg leading-relaxed">
					When I'm not coding, you can find me exploring the latest tech trends,
					contributing to open-source projects, or enjoying a good cup of
					coffee.
				</p>
			</div>
			<div class="mt-12">
				<h3 class="text-2xl font-bold text-center text-white mb-6">
					My Tech Stack
				</h3>
				<div class="flex flex-wrap justify-center gap-4">
					<div
						v-for="skill in skills"
						:key="skill.name"
						class="flex items-center px-4 py-2 bg-gray-800 rounded-full text-gray-300 hover:bg-gray-700 transition-colors"
					>
						<span :class="skill.icon" class="text-2xl mr-2"></span>
						<span>{{ skill.name }}</span>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
