<script setup lang="ts">
interface Props {
	platform: "twitter" | "facebook" | "linkedin";
	title?: string;
	url?: string;
}

const props = defineProps<Props>();

const shareUrls = {
	twitter: `https://twitter.com/intent/tweet?text=${
		encodeURIComponent(props.title || "")
	}&url=${encodeURIComponent(props.url || "")}`,
	facebook: `https://www.facebook.com/sharer/sharer.php?u=${
		encodeURIComponent(props.url || "")
	}`,
	linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${
		encodeURIComponent(props.url || "")
	}`,
};

const icons = {
	twitter: "mdi:twitter",
	facebook: "mdi:facebook",
	linkedin: "mdi:linkedin",
};

const labels = {
	twitter: "Twitter",
	facebook: "Facebook",
	linkedin: "LinkedIn",
};
</script>

<template>
	<a
		:href="shareUrls[platform]"
		target="_blank"
		rel="noopener noreferrer"
		class="flex items-center gap-0.25rem px-0.75rem py-0.5rem bg-surface border border-border rounded-0.375rem text-0.875rem text-foreground hover:bg-muted transition-all-0.2s no-underline"
	>
		<Icon :name="icons[platform]" class="w-1rem h-1rem" />
		{{ labels[platform] }}
	</a>
</template>
