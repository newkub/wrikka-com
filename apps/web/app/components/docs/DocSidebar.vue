<script setup lang="ts">
import { queryContent } from "#content";
import type { ContentItem } from "#content/types";
import { useMobileSidebar } from "~/composables/core/useMobileSidebar";
import type { SidebarItem } from "../../../shared/types/ui";

const route = useRoute();
const { data: docs } = await useAsyncData("docs-sidebar", async () => {
	const items = await queryContent("/docs").find();
	return items as ContentItem[];
});

const currentSet = computed(() => {
	const segments = route.path.split("/").filter(Boolean);
	if (segments[0] !== "docs") return null;
	return segments.length >= 2 ? segments[1] : null;
});

const { isOpen, openSidebar, closeSidebar } = useMobileSidebar();

const sidebarItems = computed<SidebarItem[]>(() => {
	if (!docs.value) return [];

	const set = currentSet.value;
	if (!set) {
		return docs.value
			.filter(item => item._path !== "/docs/index")
			.filter(item =>
				typeof item._path === "string" && item._path.endsWith("/index")
			)
			.filter(item =>
				typeof item._path === "string"
				&& item._path.split("/").filter(Boolean).length === 3
			)
			.sort((a, b) => (a.order || 0) - (b.order || 0))
			.map(item => ({
				title: item.title || "Untitled",
				path: (item._path || "").replace(/\/index$/, ""),
			}));
	}

	return docs.value
		.filter(item =>
			typeof item._path === "string" && item._path.startsWith(`/docs/${set}`)
		)
		.filter(item => item._path !== `/docs/${set}/index`)
		.filter(item =>
			typeof item._path === "string" && !item._path.endsWith("/index")
		)
		.sort((a, b) => (a.order || 0) - (b.order || 0))
		.map(item => ({
			title: item.title || "Untitled",
			path: item._path || "",
		}));
});

const isActive = (path: string) => {
	return route.path === path;
};

const handleNavClick = (path: string) => {
	closeSidebar();
};
</script>

<template>
	<div class="relative">
		<PrimitiveMobileMenuButton aria-label="Open menu" @click="openSidebar" />

		<div
			v-if="isOpen"
			class="hidden fixed inset-0 z-[1000] bg-black/50 md:block"
			@click="closeSidebar"
		>
		</div>

		<aside
			class="fixed top-[64px] left-0 w-[280px] h-[calc(100vh-64px)] overflow-y-auto border-r border-border bg-background p-6 transition-transform duration-300 md:translate-x-0"
			:class="{ 'translate-x-0': isOpen, '-translate-x-full': !isOpen }"
		>
			<div class="flex items-center justify-between mb-8">
				<NuxtLink
					to="/docs"
					class="flex items-center gap-3 text-xl font-semibold text-foreground no-underline"
					@click="closeSidebar"
				>
					<div class="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-lg">
						<Icon name="mdi:book-open-variant" size="24" class="text-primary" />
					</div>
					<span>Docs</span>
				</NuxtLink>
				<div class="flex items-center gap-2">
					<PrimitiveThemeToggle />
					<button
						@click="closeSidebar"
						class="hidden flex items-center justify-center w-9 h-9 border-none bg-transparent text-foreground rounded-lg cursor-pointer transition-all hover:bg-accent md:flex"
						aria-label="Close menu"
					>
						<Icon name="mdi:close" size="24" />
					</button>
				</div>
			</div>

			<nav>
				<ul class="list-none p-0 m-0">
					<li v-for="item in sidebarItems" :key="item.path">
						<NuxtLink
							:to="item.path"
							class="block px-4 py-3 mb-2 rounded-lg no-underline transition-all-0.2s text-muted-foreground font-500 text-0.95rem hover:bg-accent hover:text-accent-foreground hover:translate-x-1"
							:class="isActive(item.path)
							? 'bg-gradient-to-br from-primary/10 to-primary/5 text-primary font-600 border border-primary/20 hover:bg-gradient-to-br hover:from-primary/15 hover:to-primary/8'
							: ''"
							@click="handleNavClick(item.path)"
						>
							<div class="flex items-center justify-between gap-2">
								<span class="flex-1">{{ item.title }}</span>
								<Icon
									v-if="isActive(item.path)"
									name="mdi:check"
									size="16"
									class="flex-shrink-0 opacity-80"
								/>
							</div>
						</NuxtLink>
					</li>
				</ul>
			</nav>
		</aside>
	</div>
</template>
