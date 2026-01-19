<script setup lang="ts">
const route = useRoute()
const currentUrl = computed(() => {
	if (process.client) {
		return window.location.href
	}
	return ''
})

const isCopied = ref(false)

const copyLink = async () => {
	if (!currentUrl.value) return

	try {
		await navigator.clipboard.writeText(currentUrl.value)
		isCopied.value = true
		setTimeout(() => {
			isCopied.value = false
		}, 2000)
	} catch (error) {
		console.error('Failed to copy link:', error)
	}
}

const shareOnTwitter = () => {
	const text = encodeURIComponent(`Check out this documentation: ${route.meta.title}`)
	const url = encodeURIComponent(currentUrl.value)
	window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank')
}

const shareOnFacebook = () => {
	const url = encodeURIComponent(currentUrl.value)
	window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank')
}

const shareOnLinkedIn = () => {
	const url = encodeURIComponent(currentUrl.value)
	window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank')
}
</script>

<template>
	<div class="flex items-center gap-2 flex-wrap">
		<button
			@click="copyLink"
			class="flex items-center gap-2 px-3 py-2 bg-accent border border-border rounded-lg text-foreground text-sm cursor-pointer transition-all hover:bg-primary hover:text-primary-foreground hover:border-primary"
			:title="isCopied ? 'Copied!' : 'Copy link'"
		>
			<Icon :name="isCopied ? 'mdi:check' : 'mdi:content-copy'" size="18" />
			<span class="whitespace-nowrap">{{ isCopied ? 'Copied!' : 'Copy link' }}</span>
		</button>
		<button
			@click="shareOnTwitter"
			class="flex items-center gap-2 px-3 py-2 bg-accent border border-border rounded-lg text-foreground text-sm cursor-pointer transition-all hover:bg-primary hover:text-primary-foreground hover:border-primary"
			title="Share on Twitter"
		>
			<Icon name="mdi:twitter" size="18" />
			<span class="whitespace-nowrap">Twitter</span>
		</button>
		<button
			@click="shareOnFacebook"
			class="flex items-center gap-2 px-3 py-2 bg-accent border border-border rounded-lg text-foreground text-sm cursor-pointer transition-all hover:bg-primary hover:text-primary-foreground hover:border-primary"
			title="Share on Facebook"
		>
			<Icon name="mdi:facebook" size="18" />
			<span class="whitespace-nowrap">Facebook</span>
		</button>
		<button
			@click="shareOnLinkedIn"
			class="flex items-center gap-2 px-3 py-2 bg-accent border border-border rounded-lg text-foreground text-sm cursor-pointer transition-all hover:bg-primary hover:text-primary-foreground hover:border-primary"
			title="Share on LinkedIn"
		>
			<Icon name="mdi:linkedin" size="18" />
			<span class="whitespace-nowrap">LinkedIn</span>
		</button>
	</div>
</template>


