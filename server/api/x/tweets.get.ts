export default defineEventHandler(async () => {
	const config = useRuntimeConfig()
	const xUsername = config.public.xUsername

	if (!xUsername) {
		throw createError({
			statusCode: 400,
			statusMessage: "X Username is not configured",
		})
	}

	try {
		const response = await fetch(`https://api.twitter.com/2/users/by/username/${xUsername}?user.fields=profile_image_url,name,username`, {
			headers: {
				Authorization: `Bearer ${config.xBearerToken}`,
			},
		})

		if (!response.ok) {
			throw createError({
				statusCode: response.status,
				statusMessage: `X API error: ${response.statusText}`,
			})
		}

		const userData = await response.json()

		if (userData.errors) {
			throw createError({
				statusCode: 400,
				statusMessage: `X API error: ${userData.errors[0].message}`,
			})
		}

		const userId = userData.data.id

		const tweetsResponse = await fetch(`https://api.twitter.com/2/users/${userId}/tweets?max_results=10&tweet.fields=created_at,public_metrics,entities,attachments,media&expansions=attachments.media_keys&media.fields=url,preview_image_url,type`, {
			headers: {
				Authorization: `Bearer ${config.xBearerToken}`,
			},
		})

		if (!tweetsResponse.ok) {
			throw createError({
				statusCode: tweetsResponse.status,
				statusMessage: `X API error: ${tweetsResponse.statusText}`,
			})
		}

		const tweetsData = await tweetsResponse.json()

		if (tweetsData.errors) {
			throw createError({
				statusCode: 400,
				statusMessage: `X API error: ${tweetsData.errors[0].message}`,
			})
		}

		const mediaMap = new Map()
		if (tweetsData.includes?.media) {
			tweetsData.includes.media.forEach((media: any) => {
				mediaMap.set(media.media_key, media)
			})
		}

		return tweetsData.data.map((tweet: any) => {
			const media = tweet.attachments?.media_keys?.map((key: string) => mediaMap.get(key)).filter(Boolean) || []
			return {
				id: tweet.id,
				text: tweet.text,
				created_at: tweet.created_at,
				public_metrics: tweet.public_metrics,
				entities: tweet.entities,
				media: media.map((m: any) => ({
					url: m.url,
					preview_image_url: m.preview_image_url,
					type: m.type,
				})),
				user: {
					id: userData.data.id,
					name: userData.data.name,
					username: userData.data.username,
					profile_image_url: userData.data.profile_image_url,
				},
			}
		})
	}
	catch (error: any) {
		throw createError({
			statusCode: 500,
			statusMessage: `Failed to fetch X tweets: ${error.message}`,
		})
	}
})
