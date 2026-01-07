<script setup lang="ts">
</script>

<template>
	<div class="bg-gradient-to-r from-accent/10 to-accent/5 rounded-lg p-6 border border-accent/20">
		<h3 class="text-xl font-semibold text-primary dark:text-primary-dark mb-4">
			Currently Learning
		</h3>
		<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
			<div class="flex items-center gap-3">
				<Icon name="mdi:school" class="text-2xl text-accent" />
				<div>
					<div class="font-medium">Rust</div>
					<div class="text-sm text-secondary">Systems programming</div>
				</div>
			</div>

			<div class="flex items-center gap-3">
				<Icon name="mdi:cloud" class="text-2xl text-accent" />
				<div>
					<div class="font-medium">Kubernetes</div>
					<div class="text-sm text-secondary">Container orchestration</div>
				</div>
			</div>

			<div class="flex items-center gap-3">
				<Icon name="mdi:brain" class="text-2xl text-accent" />
				<div>
					<div class="font-medium">Machine Learning</div>
					<div class="text-sm text-secondary">AI/ML fundamentals</div>
				</div>
			</div>
		</div>
	</div>
</template>
