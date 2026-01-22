<script setup lang="ts">
useSeoMeta({
	title: "Contact",
	description: "Get in touch with me",
});

const form = reactive({
	name: "",
	email: "",
	subject: "",
	message: "",
});

const isSubmitting = ref(false);
const submitSuccess = ref(false);
const submitError = ref("");

const socialLinks = [
	{
		name: "GitHub",
		icon: "mdi:github",
		href: "https://github.com/mewkub",
		color: "hover:text-white",
	},
	{
		name: "LinkedIn",
		icon: "mdi:linkedin",
		href: "https://linkedin.com/in/mewkub",
		color: "hover:text-blue-400",
	},
	{
		name: "Email",
		icon: "mdi:email",
		href: "mailto:mewkubise@gmail.com",
		color: "hover:text-primary",
	},
];

const submitForm = async () => {
	if (!form.name || !form.email || !form.subject || !form.message) {
		submitError.value = "Please fill in all fields";
		return;
	}

	if (!form.email.includes("@") || !form.email.includes(".")) {
		submitError.value = "Please enter a valid email address";
		return;
	}

	isSubmitting.value = true;
	submitError.value = "";

	try {
		const response = await fetch("/api/contact", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(form),
		});

		if (!response.ok) {
			throw new Error("Failed to send message");
		}

		submitSuccess.value = true;
		form.name = "";
		form.email = "";
		form.subject = "";
		form.message = "";
	} catch (error: any) {
		submitError.value = "Failed to send message. Please try again.";
	} finally {
		isSubmitting.value = false;
	}
};
</script>

<template>
	<div class="flex flex-col gap-2rem">
		<div class="text-center py-2rem">
			<h1 class="text-3rem font-700 mb-0.5rem md:text-2.5rem text-foreground">
				Get in Touch
			</h1>
			<p class="text-1.125rem text-muted-foreground max-w-2xl mx-auto">
				Have a question, want to work together, or just want to say hi? Drop me
				a message!
			</p>
		</div>

		<div class="max-w-6xl mx-auto px-1.5rem w-full">
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-2rem">
				<!-- Contact Info Section -->
				<div class="space-y-1.5rem">
					<!-- Social Links -->
					<div class="bg-surface border border-border rounded-0.5rem p-2rem shadow-sm">
						<h2 class="text-1.25rem font-600 mb-1rem text-foreground flex items-center gap-0.5rem">
							<Icon
								name="mdi:account-circle"
								class="w-1.25rem h-1.25rem text-primary"
							/>
							Connect with Me
						</h2>
						<div class="flex gap-1rem flex-wrap">
							<a
								v-for="link in socialLinks"
								:key="link.name"
								:href="link.href"
								:target="link.href.startsWith('http') ? '_blank' : undefined"
								:rel="link.href.startsWith('http')
								? 'noopener noreferrer'
								: undefined"
								class="flex items-center gap-0.5rem px-1rem py-0.75rem bg-surface border border-border rounded-0.375rem text-foreground hover:border-primary transition-all-0.2s hover:shadow-md"
							>
								<Icon
									:name="link.icon"
									class="w-1.25rem h-1.25rem"
									:class="link.color"
								/>
								<span class="text-0.875rem font-500">{{ link.name }}</span>
							</a>
						</div>
					</div>

					<!-- Contact Info -->
					<div class="bg-surface border border-border rounded-0.5rem p-2rem shadow-sm">
						<h2 class="text-1.25rem font-600 mb-1rem text-foreground flex items-center gap-0.5rem">
							<Icon
								name="mdi:information"
								class="w-1.25rem h-1.25rem text-primary"
							/>
							Contact Information
						</h2>
						<div class="space-y-1rem">
							<div class="flex items-start gap-0.75rem">
								<Icon
									name="mdi:email"
									class="w-1.25rem h-1.25rem text-primary mt-0.125rem"
								/>
								<div>
									<p class="text-0.875rem font-600 text-foreground">Email</p>
									<a
										href="mailto:mewkubise@gmail.com"
										class="text-0.875rem text-muted-foreground hover:text-primary transition-colors-0.2s"
									>
										mewkubise@gmail.com
									</a>
								</div>
							</div>
							<div class="flex items-start gap-0.75rem">
								<Icon
									name="mdi:clock"
									class="w-1.25rem h-1.25rem text-primary mt-0.125rem"
								/>
								<div>
									<p class="text-0.875rem font-600 text-foreground">
										Response Time
									</p>
									<p class="text-0.875rem text-muted-foreground">
										Usually within 24-48 hours
									</p>
								</div>
							</div>
						</div>
					</div>

					<!-- Quick Info -->
					<div class="bg-primary/5 border border-primary/20 rounded-0.5rem p-2rem">
						<h2 class="text-1.25rem font-600 mb-1rem text-foreground flex items-center gap-0.5rem">
							<Icon
								name="mdi:lightbulb"
								class="w-1.25rem h-1.25rem text-primary"
							/>
							Quick Tip
						</h2>
						<p class="text-0.875rem text-muted-foreground">
							For faster response, please include details about your project or
							question in the message.
						</p>
					</div>
				</div>

				<!-- Contact Form Section -->
				<div>
					<div
						v-if="submitSuccess"
						class="bg-success/10 border border-success/20 rounded-0.5rem p-2rem text-center"
					>
						<Icon
							name="mdi:check-circle"
							class="w-4rem h-4rem text-success mx-auto mb-1rem"
						/>
						<h2 class="text-1.75rem font-700 mb-0.5rem text-foreground">
							Message Sent!
						</h2>
						<p class="text-muted-foreground">
							Thank you for reaching out. I'll get back to you soon.
						</p>
					</div>

					<form
						v-else
						@submit.prevent="submitForm"
						class="bg-surface border border-border rounded-0.5rem p-2rem shadow-sm"
					>
						<div
							v-if="submitError"
							class="bg-destructive/10 border border-destructive/20 rounded-0.5rem p-1rem mb-1rem"
						>
							<p class="text-destructive-foreground m-0">{{ submitError }}</p>
						</div>

						<div class="flex flex-col gap-1.5rem">
							<!-- Name Input -->
							<div class="space-y-0.5rem">
								<label
									for="name"
									class="block text-0.875rem font-600 text-foreground flex items-center gap-0.375rem"
								>
									<Icon name="mdi:account" class="w-1rem h-1rem text-primary" />
									Name
								</label>
								<Input
									id="name"
									v-model="form.name"
									type="text"
									placeholder="Your name"
									required
									class="w-full"
								/>
							</div>

							<!-- Email Input -->
							<div class="space-y-0.5rem">
								<label
									for="email"
									class="block text-0.875rem font-600 text-foreground flex items-center gap-0.375rem"
								>
									<Icon name="mdi:email" class="w-1rem h-1rem text-primary" />
									Email
								</label>
								<Input
									id="email"
									v-model="form.email"
									type="email"
									placeholder="your@email.com"
									required
									class="w-full"
								/>
							</div>

							<!-- Subject Input -->
							<div class="space-y-0.5rem">
								<label
									for="subject"
									class="block text-0.875rem font-600 text-foreground flex items-center gap-0.375rem"
								>
									<Icon
										name="mdi:format-title"
										class="w-1rem h-1rem text-primary"
									/>
									Subject
								</label>
								<Input
									id="subject"
									v-model="form.subject"
									type="text"
									placeholder="What is this about?"
									required
									class="w-full"
								/>
							</div>

							<!-- Message Input -->
							<div class="space-y-0.5rem">
								<label
									for="message"
									class="block text-0.875rem font-600 text-foreground flex items-center gap-0.375rem"
								>
									<Icon
										name="mdi:message-text"
										class="w-1rem h-1rem text-primary"
									/>
									Message
								</label>
								<textarea
									id="message"
									v-model="form.message"
									placeholder="Write your message here..."
									required
									rows="6"
									class="w-full px-1rem py-0.75rem bg-surface border border-border rounded-0.375rem text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all-0.2s resize-y min-h-8rem"
								></textarea>
							</div>

							<!-- Info Banner -->
							<div class="bg-primary/5 border border-primary/20 rounded-0.5rem p-1rem flex items-start gap-0.75rem">
								<Icon
									name="mdi:information-outline"
									class="w-1.25rem h-1.25rem text-primary mt-0.125rem flex-shrink-0"
								/>
								<p class="text-0.875rem text-muted-foreground m-0">
									Your message will be sent to <span
										class="font-600 text-primary"
									>mewkubise@gmail.com</span>
								</p>
							</div>

							<!-- Submit Button -->
							<Button
								type="submit"
								:disabled="isSubmitting"
								:loading="isSubmitting"
								variant="primary"
								size="lg"
								class="w-full font-600"
							>
								<template v-if="!isSubmitting">
									<Icon name="mdi:send" class="w-1.25rem h-1.25rem mr-0.5rem" />
									Send Message
								</template>
								<template v-else>
									Sending...
								</template>
							</Button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>
