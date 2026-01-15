<script setup lang="ts">

const route = useRoute();
const slug = route.params.slug as string;

const course = await queryContent(`/course/${slug}`).findOne();
const conceptGroups = await useCourseLessons(slug);

const isOpen = ref(false);
const selectedConcept = ref<Lesson & { content: string } | null>(null);

const openModal = async (concept: Lesson) => {
	try {
		const page = await queryContent(concept.contentPath).findOne();
		const content = page?.body || '';
		selectedConcept.value = { ...concept, content };
		isOpen.value = true;
	} catch (error) {
		console.error('Error loading concept content:', error);
	}
};

const closeModal = () => {
	isOpen.value = false;
	selectedConcept.value = null;
};
</script>

<template>
	<div class="flex flex-col gap-2rem">
		<div class="text-center py-2rem">
			<h1 class="text-2.5rem font-700 mb-0.5rem md:text-2rem text-foreground">
				{{ course?.title || 'Course' }}
			</h1>
			<p class="text-1.125rem text-muted-foreground">
				{{ course?.description || '' }}
			</p>
		</div>

		<div class="flex flex-col gap-2rem">
			<div
				v-for="group in conceptGroups"
				:key="group.label"
				class="flex flex-col gap-1rem"
			>
				<div class="flex items-center gap-0.75rem">
					<Icon
						name="mdi:folder"
						class="w-1.25rem h-1.25rem text-primary"
					/>
					<h2 class="text-1.25rem font-600 m-0 text-foreground">
						{{ group.label }}
					</h2>
				</div>

				<div class="grid grid-cols-1 gap-1rem md:grid-cols-2 lg:grid-cols-4">
					<CourseConceptCard
						v-for="concept in group.concepts"
						:key="concept.id"
						:heading="concept.title"
						:content="concept.description"
						:icon="concept.icon"
						@click="openModal(concept)"
					/>
				</div>
			</div>
		</div>

		<CourseModal
			v-if="selectedConcept"
			:open="isOpen"
			:heading="selectedConcept.title"
			:content="selectedConcept.content"
			@close="closeModal"
		/>
	</div>
</template>
