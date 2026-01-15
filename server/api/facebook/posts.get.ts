export default defineEventHandler(async () => {
	const config = useRuntimeConfig()
	const facebookPageId = config.public.facebookPageId

	if (!facebookPageId) {
		throw createError({
			statusCode: 400,
			statusMessage: "Facebook Page ID is not configured",
		})
	}

	try {
		const response = await fetch(`https://graph.facebook.com/v18.0/${facebookPageId}/posts?fields=id,message,created_time,full_picture,permalink_url,from{name,picture}&limit=10&access_token=${config.facebookAccessToken}`, {
			headers: {
				Accept: "application/json",
			},
		})

		if (!response.ok) {
			throw createError({
				statusCode: response.status,
				statusMessage: `Facebook API error: ${response.statusText}`,
			})
		}

		const data = await response.json()

		if (data.error) {
			throw createError({
				statusCode: 400,
				statusMessage: `Facebook API error: ${data.error.message}`,
			})
		}

		return data.data.map((post: any) => ({
			id: post.id,
			message: post.message,
			created_time: post.created_time,
			full_picture: post.full_picture,
			permalink_url: post.permalink_url,
			from: post.from,
		}))
	}
	catch (error: any) {
		throw createError({
			statusCode: 500,
			statusMessage: `Failed to fetch Facebook posts: ${error.message}`,
		})
	}
})
