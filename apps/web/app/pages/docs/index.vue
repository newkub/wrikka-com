<script setup lang="ts">
import { queryContent } from "#content";

definePageMeta({
	layout: "docs",
});

const { data: docSets } = await useAsyncData("docs-index", async () => {
	const items = await queryContent("/docs").find();
	return items
		.filter((item: any) => item._path !== "/docs/index")
		.filter((item: any) =>
			typeof item._path === "string" && item._path.endsWith("/index")
		)
		.filter((item: any) =>
			typeof item._path === "string"
			&& item._path.split("/").filter(Boolean).length === 3
		)
		.sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
});
</script>

<template>
	<NuxtLayout name="docs">
		<div class="text-center py-16 px-6 pb-12 bg-gradient-to-br from-primary/5 to-background border-b border-border mb-12">
			<div class="max-w-800px mx-auto">
				<div class="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-500 mb-6">
					<Icon name="mdi:book-open-variant" size="20" />
					<span>Documentation</span>
				</div>
				<h1 class="text-3rem font-700 mb-4 leading-1.2 text-foreground">
					เอกสารและคู่มือ
				</h1>
				<p class="text-1.25rem text-muted-foreground leading-1.6">
					เลือกชุดเอกสารก่อน แล้วค่อยเลือกหัวข้อในชุดนั้น
				</p>
			</div>
		</div>

		<div class="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6 px-6 pb-12 max-w-1200px mx-auto">
			<NuxtLink
				v-for="setDoc in docSets"
				:key="setDoc._path"
				:to="(setDoc._path || '').replace(/\/index$/, '')"
				class="relative flex flex-col p-8 bg-card border border-border rounded-1rem no-underline transition-all-0.3s overflow-hidden group hover:border-primary hover:-translate-y-1 hover:shadow-[0_20px_40px_-12px_hsl(var(--foreground)/0.15)]"
			>
				<div
					class="absolute top-0 left-0 right-0 h-0.75rem bg-gradient-to-r from-primary to-primary/50 group-hover:scale-x-100 origin-left transition-transform-0.3s"
					style="transform: scaleX(0)"
				>
				</div>
				<div class="flex items-center justify-between mb-6">
					<div class="w-14 h-14 flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5 text-primary rounded-1.5rem transition-all-0.3s group-hover:scale-105 group-hover:from-primary/20 group-hover:to-primary/10">
						<Icon name="mdi:folder" size="32" />
					</div>
					<div class="opacity-0 -translate-x-2 transition-all-0.3s text-primary group-hover:opacity-100 group-hover:translate-x-0">
						<Icon name="mdi:arrow-right" size="20" />
					</div>
				</div>
				<div class="flex-1">
					<h2 class="text-1.25rem font-600 text-foreground mb-3 leading-1.4">
						{{ setDoc.title }}
					</h2>
					<p class="text-0.95rem text-muted-foreground leading-1.6">
						{{ setDoc.description }}
					</p>
				</div>
			</NuxtLink>
		</div>
	</NuxtLayout>
</template>
