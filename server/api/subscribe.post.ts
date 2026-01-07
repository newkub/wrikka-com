export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	const email = body.email;

	if (!email || typeof email !== "string") {
		throw createError({
			statusCode: 400,
			statusMessage: "Email is required",
		});
	}

	// For now, just log the email to the console.
	// In a real application, you would save this to a database or a mailing list service.
	console.log(`New newsletter subscription: ${email}`);

	return { success: true };
});
