export default defineEventHandler(async () => {
	const config = useRuntimeConfig()
	const youtubeChannelId = config.public.youtubeChannelId

	if (!youtubeChannelId) {
		throw createError({
			statusCode: 400,
			statusMessage: "YouTube Channel ID is not configured",
		})
	}

	try {
		const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${config.youtubeApiKey}&channelId=${youtubeChannelId}&part=snippet,id&order=date&maxResults=12`, {
			headers: {
				Accept: "application/json",
			},
		})

		if (!response.ok) {
			throw createError({
				statusCode: response.status,
				statusMessage: `YouTube API error: ${response.statusText}`,
			})
		}

		const data = await response.json()

		if (data.error) {
			throw createError({
				statusCode: 400,
				statusMessage: `YouTube API error: ${data.error.message}`,
			})
		}

		return data.items.map((item: any) => ({
			id: item.id.videoId,
			title: item.snippet.title,
			description: item.snippet.description,
			thumbnail: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url,
			thumbnailHigh: item.snippet.thumbnails.high?.url,
			thumbnailStandard: item.snippet.thumbnails.standard?.url,
			publishedAt: item.snippet.publishedAt,
			channelTitle: item.snippet.channelTitle,
			channelId: item.snippet.channelId,
		}))
	}
	catch (error: any) {
		throw createError({
			statusCode: 500,
			statusMessage: `Failed to fetch YouTube videos: ${error.message}`,
		})
	}
})
