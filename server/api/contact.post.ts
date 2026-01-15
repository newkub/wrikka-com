export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig()
	const body = await readBody(event)

	if (!body.name || !body.email || !body.subject || !body.message) {
		throw createError({
			statusCode: 400,
			statusMessage: "All fields are required",
		})
	}

	if (!body.email.includes("@") || !body.email.includes(".")) {
		throw createError({
			statusCode: 400,
			statusMessage: "Invalid email address",
		})
	}

	try {
		const response = await fetch("https://api.resend.com/v1/email/send", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${config.resendApiKey}`,
			},
			body: JSON.stringify({
				from: config.public.contactEmail,
				to: config.public.contactEmail,
				subject: `[Contact Form] ${body.subject} from ${body.name}`,
				html: `
					<h2>New Contact Form Submission</h2>
					<p><strong>Name:</strong> ${body.name}</p>
					<p><strong>Email:</strong> ${body.email}</p>
					<p><strong>Subject:</strong> ${body.subject}</p>
					<p><strong>Message:</strong></p>
					<p>${body.message.replace(/\n/g, "<br>")}</p>
					<p><em>Sent from ${body.email}</em></p>
				`,
				text: `
New Contact Form Submission

Name: ${body.name}
Email: ${body.email}
Subject: ${body.subject}
Message:
${body.message}

Sent from ${body.email}
				`,
			}),
		})

		if (!response.ok) {
			throw createError({
				statusCode: response.status,
				statusMessage: "Failed to send email",
			})
		}

		return {
			success: true,
			message: "Message sent successfully",
		}
	}
	catch {
		throw createError({
			statusCode: 500,
			statusMessage: "Failed to send email",
		})
	}
})
