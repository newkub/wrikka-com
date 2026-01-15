<script setup lang="ts">
useSeoMeta({
	title: "Contact",
	description: "Get in touch with me",
})

const form = reactive({
	name: "",
	email: "",
	subject: "",
	message: "",
})

const isSubmitting = ref(false)
const submitSuccess = ref(false)
const submitError = ref("")

const submitForm = async () => {
	if (!form.name || !form.email || !form.subject || !form.message) {
		submitError.value = "Please fill in all fields"
		return
	}

	if (!form.email.includes("@") || !form.email.includes(".")) {
		submitError.value = "Please enter a valid email address"
		return
	}

	isSubmitting.value = true
	submitError.value = ""

	try {
		const response = await fetch("/api/contact", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(form),
		})

		if (!response.ok) {
			throw new Error("Failed to send message")
		}

		submitSuccess.value = true
		form.name = ""
		form.email = ""
		form.subject = ""
		form.message = ""
	}
	catch (error: any) {
		submitError.value = "Failed to send message. Please try again."
	}
	finally {
		isSubmitting.value = false
	}
}
</script>

<template>
	<div class="flex flex-col gap-2rem">
		<div class="text-center py-2rem">
			<h1 class="text-3rem font-700 mb-0.5rem md:text-2.5rem text-gray-900 dark:text-gray-100">Get in Touch</h1>
			<p class="text-1.125rem text-gray-600 dark:text-gray-400">Have a question or want to work together? Drop me a message!</p>
		</div>

		<div class="max-w-2xl mx-auto px-1.5rem w-full">
			<div>
				<div v-if="submitSuccess" class="bg-green-100 dark:bg-green-900 border border-green-200 dark:border-green-800 rounded-0.5rem p-2rem text-center">
					<Icon name="mdi:check-circle" class="w-4rem h-4rem text-green-600 dark:text-green-400 mx-auto mb-1rem" />
					<h2 class="text-1.75rem font-700 mb-0.5rem text-gray-900 dark:text-gray-100">Message Sent!</h2>
					<p class="text-gray-600 dark:text-gray-400">Thank you for reaching out. I'll get back to you soon.</p>
				</div>

				<form v-else @submit.prevent="submitForm" class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-0.5rem p-2rem shadow-sm">
					<div v-if="submitError" class="bg-red-100 dark:bg-red-900 border border-red-200 dark:border-red-800 rounded-0.5rem p-1rem mb-1rem">
						<p class="text-red-700 dark:text-red-400 m-0">{{ submitError }}</p>
					</div>

					<div class="flex flex-col gap-1.25rem">
						<div>
							<label for="name" class="block text-0.875rem font-600 text-gray-900 dark:text-gray-100 mb-0.5rem">Name</label>
							<Input
								id="name"
								v-model="form.name"
								type="text"
								placeholder="Your name"
								required
							/>
						</div>

						<div>
							<label for="email" class="block text-0.875rem font-600 text-gray-900 dark:text-gray-100 mb-0.5rem">Email</label>
							<Input
								id="email"
								v-model="form.email"
								type="email"
								placeholder="your@email.com"
								required
							/>
						</div>

						<div>
							<label for="subject" class="block text-0.875rem font-600 text-gray-900 dark:text-gray-100 mb-0.5rem">Subject</label>
							<Input
								id="subject"
								v-model="form.subject"
								type="text"
								placeholder="What is this about?"
								required
							/>
						</div>

						<div>
							<label for="message" class="block text-0.875rem font-600 text-gray-900 dark:text-gray-100 mb-0.5rem">Message</label>
							<textarea
								id="message"
								v-model="form.message"
								placeholder="Write your message here..."
								required
								rows="6"
								class="w-full px-1rem py-0.75rem bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-0.375rem text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all-0.2s resize-y"
							></textarea>
						</div>

						<div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-0.375rem p-1rem mb-1rem">
							<p class="text-0.875rem text-gray-600 dark:text-gray-400 m-0">
								<Icon name="mdi:email" class="w-1rem h-1rem mr-0.25rem" />
								Your message will be sent to <span class="font-600 text-blue-600 dark:text-blue-400">mewkubise@gmail.com</span>
							</p>
						</div>

						<Button
							type="submit"
							:disabled="isSubmitting"
							:loading="isSubmitting"
							variant="primary"
							size="md"
							class="w-full"
						>
							Send Message
						</Button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>
