<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

interface BlogPostDetail {
	content: string
	title: string
	excerpt: string
	date: string
	category: string | null
	tags: string[]
	author?: string
	readingTime?: number
	updatedDate?: string
	cover?: string
}

const { data: post, pending } = await useFetch<BlogPostDetail>(`/api/blog/${slug}`)

const { render } = await useMarkdownRenderer()

const formatDate = (dateString: string) => {
	return new Date(dateString).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		"day": "numeric",
	})
}

const renderedContent = computed(() => {
	if (!post.value?.content) return ""
	return render(post.value.content)
})

const currentUrl = computed(() => {
	return typeof window !== "undefined" ? window.location.href : ""
})

useSeoMeta({
	title: computed(() => post.value?.title || "Blog Post"),
	description: computed(() => post.value?.excerpt || ""),
})
</script>

<template>
	<NuxtLayout name="blog">
		<template #metadata>
			<BlogMetadata
				v-if="post"
				:date="post.date"
				:category="post.category"
				:tags="post.tags"
				:author="post.author"
				:reading-time="post.readingTime"
				:updated-date="post.updatedDate"
				:title="post.title"
				:url="currentUrl"
				:cover="post.cover"
				:excerpt="post.excerpt"
			/>
		</template>

		<template #toc>
			<TableOfContents v-if="post" :content="renderedContent" />
		</template>

		<div v-if="pending" class="flex justify-center items-center py-4rem">
			<div class="animate-spin w-2rem h-2rem border-4 border-border border-t-primary rounded-full"></div>
		</div>

		<article v-else-if="post" class="blog-post">
			<div class="prose prose-invert max-w-none" v-html="renderedContent"></div>
		</article>

		<div v-else class="text-center py-4rem text-muted-foreground">
			<p>Blog post not found</p>
			<NuxtLink to="/blog" class="text-primary no-underline hover:underline">Back to Blog</NuxtLink>
		</div>

		<!-- Fixed Back to Blog Button -->
		<NuxtLink
			to="/blog"
			class="fixed left-0 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary p-1rem transition-all-0.2s z-50"
			title="Back to Blog"
		>
			<Icon name="mdi:arrow-left" class="w-1.5rem h-1.5rem" />
		</NuxtLink>
	</NuxtLayout>
</template>

<style>
.prose {
	color: rgb(17, 24, 39);
	max-width: 65ch;
}
.prose :where(p):not(:where([class~="not-prose"] *)) {
	margin-top: 1.25em;
	margin-bottom: 1.25em;
}
.prose :where([class~="lead"]):not(:where([class~="not-prose"] *)) {
	color: rgb(55, 65, 81);
	font-size: 1.25em;
	line-height: 1.6;
	margin-top: 1.2em;
	margin-bottom: 1.2em;
}
.prose :where(a):not(:where([class~="not-prose"] *)) {
	color: rgb(37, 99, 235);
	text-decoration: underline;
	font-weight: 500;
}
.prose :where(a):not(:where([class~="not-prose"] *)):hover {
	color: rgb(29, 78, 216);
}
.prose :where(strong):not(:where([class~="not-prose"] *)) {
	color: rgb(17, 24, 39);
	font-weight: 600;
}
.prose :where(a strong):not(:where([class~="not-prose"] *)) {
	color: inherit;
}
.prose :where(blockquote strong):not(:where([class~="not-prose"] *)) {
	color: inherit;
}
.prose :where(thead th strong):not(:where([class~="not-prose"] *)) {
	color: inherit;
}
.prose :where(ul):not(:where([class~="not-prose"] *)) {
	list-style-type: disc;
	padding-left: 1.625em;
}
.prose :where(ol):not(:where([class~="not-prose"] *)) {
	list-style-type: decimal;
	padding-left: 1.625em;
}
.prose :where(li):not(:where([class~="not-prose"] *)) {
	margin-top: 0.5em;
	margin-bottom: 0.5em;
}
.prose :where(ol > li):not(:where([class~="not-prose"] *)) {
	padding-left: 0.375em;
}
.prose :where(ul > li):not(:where([class~="not-prose"] *)) {
	padding-left: 0.375em;
}
.prose :where(.prose > ul > li):not(:where([class~="not-prose"] *)) {
	padding-left: 0.375em;
}
.prose :where(.prose > ol > li):not(:where([class~="not-prose"] *)) {
	padding-left: 0.375em;
}
.prose :where(ul ul, ul ol, ol ul, ol ol):not(:where([class~="not-prose"] *)) {
	margin-top: 0.75em;
	margin-bottom: 0.75em;
}
.prose :where(hr):not(:where([class~="not-prose"] *)) {
	border-color: rgb(229, 231, 235);
	border-top-width: 1px;
	margin-top: 3em;
	margin-bottom: 3em;
}
.prose :where(blockquote):not(:where([class~="not-prose"] *)) {
	font-weight: 500;
	font-style: italic;
	color: rgb(55, 65, 81);
	border-left-width: 0.25rem;
	border-left-color: rgb(209, 213, 219);
	quotes: "\201C""\201D""\2018""\2019";
	margin-top: 1.6em;
	margin-bottom: 1.6em;
	padding-left: 1em;
}
.prose :where(h1):not(:where([class~="not-prose"] *)) {
	color: rgb(17, 24, 39);
	font-weight: 800;
	font-size: 2.25em;
	margin-top: 0;
	margin-bottom: 0.8888889em;
	line-height: 1.1111111;
}
.prose :where(h2):not(:where([class~="not-prose"] *)) {
	color: rgb(17, 24, 39);
	font-weight: 700;
	font-size: 1.5em;
	margin-top: 2em;
	margin-bottom: 1em;
	line-height: 1.3333333;
}
.prose :where(h3):not(:where([class~="not-prose"] *)) {
	color: rgb(17, 24, 39);
	font-weight: 600;
	font-size: 1.25em;
	margin-top: 1.6em;
	margin-bottom: 0.6em;
	line-height: 1.6;
}
.prose :where(h4):not(:where([class~="not-prose"] *)) {
	color: rgb(17, 24, 39);
	font-weight: 600;
	margin-top: 1.5em;
	margin-bottom: 0.5em;
	line-height: 1.5;
}
.prose :where(img):not(:where([class~="not-prose"] *)) {
	margin-top: 2em;
	margin-bottom: 2em;
}
.prose :where(picture):not(:where([class~="not-prose"] *)) {
	display: block;
	margin-top: 2em;
	margin-bottom: 2em;
}
.prose :where(video):not(:where([class~="not-prose"] *)) {
	margin-top: 2em;
	margin-bottom: 2em;
}
.prose :where(figure):not(:where([class~="not-prose"] *)) {
	margin-top: 2em;
	margin-bottom: 2em;
}
.prose :where(figcaption):not(:where([class~="not-prose"] *)) {
	color: rgb(107, 114, 128);
	font-size: 0.875em;
	line-height: 1.4285714;
	margin-top: 0.8571429em;
}
.prose :where(code):not(:where([class~="not-prose"] *)) {
	color: rgb(239, 68, 68);
	font-weight: 600;
	font-size: 0.875em;
}
.prose :where(code):not(:where([class~="not-prose"] *)):before {
	content: "`";
}
.prose :where(code):not(:where([class~="not-prose"] *)):after {
	content: "`";
}
.prose :where(a code):not(:where([class~="not-prose"] *)) {
	color: inherit;
}
.prose :where(h1 code):not(:where([class~="not-prose"] *)) {
	color: inherit;
}
.prose :where(h2 code):not(:where([class~="not-prose"] *)) {
	color: inherit;
}
.prose :where(h3 code):not(:where([class~="not-prose"] *)) {
	color: inherit;
}
.prose :where(h4 code):not(:where([class~="not-prose"] *)) {
	color: inherit;
}
.prose :where(blockquote code):not(:where([class~="not-prose"] *)) {
	color: inherit;
}
.prose :where(th code):not(:where([class~="not-prose"] *)) {
	color: inherit;
}
.prose :where(td code):not(:where([class~="not-prose"] *)) {
	color: inherit;
}
.prose :where(div code):not(:where([class~="not-prose"] *)) {
	color: inherit;
}
.prose :where(pre):not(:where([class~="not-prose"] *)) {
	color: rgb(229, 231, 235);
	background-color: rgb(17, 24, 39);
	overflow-x: auto;
	font-weight: 400;
	font-size: 0.875em;
	line-height: 1.7142857;
	margin-top: 1.7142857em;
	margin-bottom: 1.7142857em;
	border-radius: 0.375rem;
	padding: 0.8571429em 1.1428571em;
}
.prose :where(pre code):not(:where([class~="not-prose"] *)) {
	background-color: transparent;
	border-width: 0;
	border-radius: 0;
	padding: 0;
	font-weight: inherit;
	color: inherit;
	font-size: inherit;
	font-family: inherit;
	line-height: inherit;
}
.prose :where(pre code):not(:where([class~="not-prose"] *)):before {
	content: none;
}
.prose :where(pre code):not(:where([class~="not-prose"] *)):after {
	content: none;
}
.prose :where(table):not(:where([class~="not-prose"] *)) {
	width: 100%;
	table-layout: auto;
	text-align: left;
	margin-top: 2em;
	margin-bottom: 2em;
	font-size: 0.875em;
	line-height: 1.7142857;
}
.prose :where(thead):not(:where([class~="not-prose"] *)) {
	color: rgb(17, 24, 39);
	font-weight: 600;
	border-bottom-width: 1px;
	border-bottom-color: rgb(209, 213, 219);
}
.prose :where(thead th):not(:where([class~="not-prose"] *)) {
	vertical-align: bottom;
	padding-right: 0.5714286em;
	padding-bottom: 0.5714286em;
	padding-left: 0.5714286em;
}
.prose :where(tbody tr):not(:where([class~="not-prose"] *)) {
	border-bottom-width: 1px;
	border-bottom-color: rgb(229, 231, 235);
}
.prose :where(tbody tr:last-child):not(:where([class~="not-prose"] *)) {
	border-bottom-width: 0;
}
.prose :where(tbody td):not(:where([class~="not-prose"] *)) {
	vertical-align: top;
	padding: 0.5714286em;
}
.prose :where(tfoot):not(:where([class~="not-prose"] *)) {
	border-top-width: 1px;
	border-top-color: rgb(209, 213, 219);
}
.prose :where(tfoot td):not(:where([class~="not-prose"] *)) {
	vertical-align: top;
	padding: 0.5714286em;
}
.prose :where(figure > *):not(:where([class~="not-prose"] *)) {
	margin-top: 0;
	margin-bottom: 0;
}
.prose :where(figcaption):not(:where([class~="not-prose"] *)) {
	color: rgb(107, 114, 128);
	font-size: 0.875em;
	line-height: 1.4285714;
	margin-top: 0.8571429em;
}
.prose :where(.dark &):not(:where([class~="not-prose"] *)) {
	color: rgb(229, 231, 235);
}
.prose :where(.dark & strong):not(:where([class~="not-prose"] *)) {
	color: rgb(255, 255, 255);
}
.prose :where(.dark & a):not(:where([class~="not-prose"] *)) {
	color: rgb(96, 165, 250);
}
.prose :where(.dark & a):not(:where([class~="not-prose"] *)):hover {
	color: rgb(129, 140, 248);
}
.prose :where(.dark & blockquote):not(:where([class~="not-prose"] *)) {
	color: rgb(156, 163, 175);
	border-left-color: rgb(75, 85, 99);
}
.prose :where(.dark & h1):not(:where([class~="not-prose"] *)) {
	color: rgb(255, 255, 255);
}
.prose :where(.dark & h2):not(:where([class~="not-prose"] *)) {
	color: rgb(255, 255, 255);
}
.prose :where(.dark & h3):not(:where([class~="not-prose"] *)) {
	color: rgb(255, 255, 255);
}
.prose :where(.dark & h4):not(:where([class~="not-prose"] *)) {
	color: rgb(255, 255, 255);
}
.prose :where(.dark & code):not(:where([class~="not-prose"] *)) {
	color: rgb(248, 113, 113);
}
.prose :where(.dark & thead):not(:where([class~="not-prose"] *)) {
	color: rgb(255, 255, 255);
	border-bottom-color: rgb(75, 85, 99);
}
.prose :where(.dark & tbody tr):not(:where([class~="not-prose"] *)) {
	border-bottom-color: rgb(55, 65, 81);
}
.prose :where(.dark & tfoot):not(:where([class~="not-prose"] *)) {
	border-top-color: rgb(75, 85, 99);
}
</style>
