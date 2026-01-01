<template>
	<div class="flex flex-col h-screen bg-white dark:bg-black text-black dark:text-white">
		<Nav />
		<main class="flex-1 overflow-auto">
			<div class="container mx-auto p-4 sm:p-6 lg:p-8">
				<NuxtPage />
			</div>
		</main>
	</div>
</template>
