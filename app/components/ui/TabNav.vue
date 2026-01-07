<script setup lang="ts">
const route = useRoute();

const colorMode = useColorMode();

type NavItem =
	| {
		type: "internal";
		name: string;
		path: string;
		iconName: string;
		description?: string;
	}
	| {
		type: "external";
		name: string;
		href: string;
		iconName: string;
		description?: string;
	};

const items: NavItem[] = [
	{
		type: "internal",
		name: "Profile",
		path: "/",
		iconName: "mdi:account-circle",
		description: "View my profile and information",
	},
	{
		type: "internal",
		name: "Blog",
		path: "/blog",
		iconName: "mdi:post",
		description: "Read my latest blog posts",
	},
	{
		type: "internal",
		name: "Projects",
		path: "/projects",
		iconName: "mdi:code-tags",
		description: "Explore my projects",
	},
	{
		type: "internal",
		name: "Shop",
		path: "/shop",
		iconName: "mdi:store",
		description: "Visit my shop",
	},
	{
		type: "internal",
		name: "Products",
		path: "/products",
		iconName: "mdi:package-variant",
		description: "Browse my products",
	},
];

const isActive = (path: string) => {
	if (path === "/") {
		return route.path === "/";
	}
	return route.path.startsWith(path);
};

function toggleTheme() {
	colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
}

// Keyboard navigation
const currentFocusIndex = ref(0);

const handleKeyDown = (event: KeyboardEvent) => {
	switch (event.key) {
		case "ArrowLeft":
		case "ArrowUp":
			event.preventDefault();
			currentFocusIndex.value = (currentFocusIndex.value - 1 + items.length)
				% items.length;
			break;
		case "ArrowRight":
		case "ArrowDown":
			event.preventDefault();
			currentFocusIndex.value = (currentFocusIndex.value + 1) % items.length;
			break;
		case "Home":
			event.preventDefault();
			currentFocusIndex.value = 0;
			break;
		case "End":
			event.preventDefault();
			currentFocusIndex.value = items.length - 1;
			break;
	}
};

const themeButtonRef = ref<HTMLElement>();

const handleThemeKeyDown = (event: KeyboardEvent) => {
	if (event.key === "Enter" || event.key === " ") {
		event.preventDefault();
		toggleTheme();
	}
};
</script>

<template>
	<header class="sticky top-0 z-40 pointer-events-auto bg-primary/80 dark:bg-primary-dark/80 backdrop-blur-lg py-2 border-b border-custom mb-8">
		<div class="container">
			<nav
				aria-label="Primary navigation"
				class="flex items-center justify-center gap-1"
				@keydown="handleKeyDown"
			>
				<div class="flex items-center gap-1 nav-mobile">
					<template v-for="(item, index) in items" :key="item.name">
						<NuxtLink
							v-if="item.type === 'internal'"
							:to="item.path"
							:aria-current="isActive(item.path) ? 'page' : undefined"
							:aria-label="item.description"
							:tabindex="currentFocusIndex === index ? 0 : -1"
							class="group inline-flex items-center gap-2 px-3 py-2 text-secondary hover:text-accent transition-colors whitespace-nowrap font-medium rounded-md focus-visible:(outline-none ring-2 ring-accent ring-offset-2 ring-offset-primary dark:ring-offset-primary-dark) focus-visible:text-accent"
							:class="isActive(item.path)
							? '!text-accent bg-secondary dark:bg-surface-800'
							: undefined"
						>
							<Icon
								:name="item.iconName"
								class="text-lg opacity-80 group-hover:opacity-100 transition-opacity"
								aria-hidden="true"
							/>
							<span class="hidden sm:inline">{{ item.name }}</span>
							<span class="sm:hidden">{{ item.name.charAt(0) }}</span>
						</NuxtLink>
						<a
							v-else
							:href="item.href"
							target="_blank"
							rel="noreferrer noopener"
							:aria-label="item.description"
							:tabindex="currentFocusIndex === index ? 0 : -1"
							class="group inline-flex items-center gap-2 px-3 py-2 text-secondary hover:text-accent transition-colors whitespace-nowrap font-medium rounded-md focus-visible:(outline-none ring-2 ring-accent ring-offset-2 ring-offset-primary dark:ring-offset-primary-dark) focus-visible:text-accent"
						>
							<Icon
								:name="item.iconName"
								class="text-lg opacity-80 group-hover:opacity-100 transition-opacity"
								aria-hidden="true"
							/>
							<span class="hidden sm:inline">{{ item.name }}</span>
							<span class="sm:hidden">{{ item.name.charAt(0) }}</span>
						</a>
					</template>
				</div>

				<div class="ml-2 flex items-center gap-1">
					<button
						ref="themeButtonRef"
						type="button"
						class="inline-flex items-center justify-center rounded-md px-2 py-2 text-secondary hover:text-primary transition-colors focus-visible:(outline-none ring-2 ring-accent ring-offset-2 ring-offset-primary dark:ring-offset-primary-dark) cursor-pointer"
						:aria-label="colorMode.value === 'dark'
						? 'Switch to light mode'
						: 'Switch to dark mode'"
						:aria-pressed="colorMode.value === 'dark'"
						@click="toggleTheme"
						@keydown="handleThemeKeyDown"
					>
						<Icon
							v-if="colorMode.value === 'dark'"
							name="mdi:white-balance-sunny"
							class="text-xl"
							aria-hidden="true"
						/>
						<Icon
							v-else
							name="mdi:weather-night"
							class="text-xl"
							aria-hidden="true"
						/>
						<span class="sr-only">
							{{
								colorMode.value === "dark"
								? "Switch to light mode"
								: "Switch to dark mode"
							}}
						</span>
					</button>
				</div>
			</nav>
		</div>
	</header>
</template>
