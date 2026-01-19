<script setup lang="ts">
const route = useRoute();
const { data: doc } = await useAsyncData(`doc:${route.path}`, async () => {
	return await queryContent(route.path).findOne();
});

useHead({
	title: doc.value?.title || "Docs",
	meta: [
		{ name: "description", content: doc.value?.description || "" },
	],
});

const breadcrumbs = computed(() => {
	const path = route.path.split("/").filter(Boolean);
	return path.map((segment, index) => {
		const href = "/" + path.slice(0, index + 1).join("/");
		return { label: segment.charAt(0).toUpperCase() + segment.slice(1), href };
	});
});
</script>

<template>
	<div class="flex flex-col min-h-100vh bg-background">
		<LayoutNavbar />

		<div class="flex-1 flex relative">
			<DocSidebar />

			<main class="flex-1 ml-280 mr-280 transition-all-0.3s">
				<div class="max-w-800px mx-auto p-12">
					<nav
						class="flex items-center flex-wrap gap-2 mb-10 text-sm p-4 bg-card rounded-lg border border-border"
						v-if="breadcrumbs.length > 0"
					>
						<NuxtLink to="/" class="flex items-center">Home</NuxtLink>
						<span class="mx-2 text-muted-foreground">/</span>
						<NuxtLink to="/docs" class="flex items-center">Docs</NuxtLink>
						<span
							v-for="(item, index) in breadcrumbs"
							:key="item.href"
							class="flex items-center"
						>
							<span class="mx-2 text-muted-foreground">/</span>
							<NuxtLink
								:to="item.href"
								class="text-muted-foreground no-underline transition-all-0.2s font-500 hover:text-primary"
							>{{ item.label }}</NuxtLink>
						</span>
					</nav>

					<article class="pb-16">
						<h1
							v-if="doc?.title"
							class="text-2.75rem font-700 mb-4 leading-1.2 text-foreground tracking-tight"
						>
							{{ doc.title }}
						</h1>
						<p
							v-if="doc?.description"
							class="text-1.25rem text-muted-foreground mb-10 leading-1.6 font-400"
						>
							{{ doc.description }}
						</p>
						<DocContent v-if="doc?.body" :content="doc.body" />
						<slot v-else />
						<DocNav />
					</article>
				</div>
			</main>

			<DocTOC v-if="doc?.body" :content="doc.body" />
		</div>
	</div>
</template>
