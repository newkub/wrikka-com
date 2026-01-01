<script setup lang="ts"></script>

<template>
	<div class="flex flex-col h-screen bg-surface text-primary">
		<Nav />
		<main class="flex-1 overflow-auto">
			<div class="container mx-auto p-4 sm:p-6 lg:p-8">
				<TabNav />
				<NuxtPage />
			</div>
		</main>
	</div>
</template>
