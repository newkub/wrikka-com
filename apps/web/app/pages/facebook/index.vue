<script setup lang="ts">
useSeoMeta({
	title: "Facebook",
	description: "Latest posts from Facebook",
});

const { data: posts, pending: postsPending } = await useFetch(
	"/api/facebook/posts",
);

const formatDate = (dateString: string) => {
	return new Date(dateString).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});
};
</script>

<template>
	<div class="flex flex-col gap-2rem">
		<div class="text-center py-2rem">
			<h1 class="text-2.5rem font-700 mb-0.5rem md:text-2rem text-foreground">
				Facebook
			</h1>
			<p class="text-1.125rem text-muted-foreground">
				Latest posts from Facebook
			</p>
		</div>

		<div v-if="postsPending" class="flex justify-center items-center py-4rem">
			<div class="animate-spin w-2rem h-2rem border-4 border-border border-t-primary rounded-full">
			</div>
		</div>

		<div
			v-else-if="posts && posts.length > 0"
			class="max-w-4xl mx-auto px-1.5rem"
		>
			<div class="flex flex-col gap-1.5rem">
				<a
					v-for="post in posts"
					:key="post.id"
					:href="post.permalink_url"
					target="_blank"
					rel="noopener"
					class="bg-surface border border-border rounded-0.5rem p-1.5rem block transition-all-0.2s hover:-translate-y-2px hover:shadow-lg no-underline text-foreground"
				>
					<div class="flex items-start gap-1rem mb-1rem">
						<img
							v-if="post.from?.picture?.data?.url"
							:src="post.from.picture.data.url"
							:alt="post.from.name"
							class="w-3rem h-3rem rounded-full border-2 border-border"
						/>
						<div class="flex-1">
							<h3 class="text-1rem font-600 m-0 mb-0.25rem">
								{{ post.from.name }}
							</h3>
							<p class="text-0.75rem text-muted-foreground m-0">
								{{ formatDate(post.created_time) }}
							</p>
						</div>
					</div>
					<p
						v-if="post.message"
						class="text-0.875rem text-foreground mb-1rem whitespace-pre-wrap"
					>
						{{ post.message }}
					</p>
					<img
						v-if="post.full_picture"
						:src="post.full_picture"
						alt="Post image"
						class="w-full rounded-0.375rem mb-1rem"
					/>
					<div class="flex items-center gap-0.5rem text-0.75rem text-muted-foreground mb-0.5rem">
						<Icon name="mdi:facebook" class="w-1rem h-1rem" />
						<span>View on Facebook</span>
					</div>
				</a>
			</div>
		</div>

		<div v-else class="text-center py-4rem text-muted-foreground">
			<p>No posts found</p>
		</div>
	</div>
</template>
