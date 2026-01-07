// UX Writing Guidelines and Microcopy

export const UX_COPY = {
	// Navigation
	nav: {
		profile: "Profile",
		blog: "Blog", 
		projects: "Projects",
		shop: "Shop",
		products: "Products",
		theme: {
			light: "Switch to light mode",
			dark: "Switch to dark mode",
		},
		descriptions: {
			profile: "View my profile and information",
			blog: "Read my latest blog posts",
			projects: "Explore my projects",
			shop: "Visit my shop",
			products: "Browse my products",
		}
	},

	// Loading States
	loading: {
		general: "Loading...",
		fetching: "Fetching data...",
		processing: "Processing...",
		saving: "Saving...",
	},

	// Error Messages
	errors: {
		general: "Something went wrong",
		network: "Failed to load data. Please check your connection and try again.",
		fetch: "Unable to fetch data. Please try again later.",
		notFound: "The requested content could not be found.",
		server: "Server error. Please try again later.",
		validation: "Please check your input and try again.",
	},

	// Success Messages
	success: {
		saved: "Saved successfully!",
		updated: "Updated successfully!",
		deleted: "Deleted successfully!",
		copied: "Copied to clipboard!",
		subscribed: "Successfully subscribed!",
	},

	// Empty States
	empty: {
		general: "No content available",
		blog: "No blog posts yet",
		projects: "No projects to display",
		memories: "No memories today",
		search: "No results found",
		cart: "Your cart is empty",
	},

	// Call to Actions
	cta: {
		tryAgain: "Try Again",
		goHome: "Go Home",
		learnMore: "Learn More",
		viewDetails: "View Details",
		contact: "Contact Me",
		subscribe: "Subscribe",
		follow: "Follow",
		share: "Share",
		copy: "Copy",
		download: "Download",
	},

	// Form Labels
	form: {
		email: "Email address",
		name: "Your name",
		message: "Your message",
		search: "Search...",
		subscribe: "Subscribe to newsletter",
	},

	// Social Proof
	social: {
		followers: "followers",
		following: "following",
		stars: "stars",
		forks: "forks",
		views: "views",
		likes: "likes",
	},

	// Time and Date
	time: {
		today: "Today",
		yesterday: "Yesterday",
		daysAgo: (days: number) => `${days} day${days !== 1 ? 's' : ''} ago`,
		weeksAgo: (weeks: number) => `${weeks} week${weeks !== 1 ? 's' : ''} ago`,
		monthsAgo: (months: number) => `${months} month${months !== 1 ? 's' : ''} ago`,
		yearsAgo: (years: number) => `${years} year${years !== 1 ? 's' : ''} ago`,
		lastUpdated: "Last updated",
		createdAt: "Created",
	},

	// Accessibility
	a11y: {
		skipToContent: "Skip to main content",
		openMenu: "Open menu",
		closeMenu: "Close menu",
		expandSection: "Expand section",
		collapseSection: "Collapse section",
		externalLink: "Opens in new tab",
		downloadFile: "Download file",
		playVideo: "Play video",
		pauseVideo: "Pause video",
	},

	// Status
	status: {
		online: "Online",
		offline: "Offline",
		busy: "Busy",
		available: "Available",
		away: "Away",
		completed: "Completed",
		inProgress: "In Progress",
		planning: "Planning",
		published: "Published",
		draft: "Draft",
	},

	// Notifications
	notifications: {
		newMessage: "New message",
		newFollower: "New follower",
		newLike: "New like",
		newComment: "New comment",
		updateAvailable: "Update available",
		maintenance: "Scheduled maintenance",
	},

	// Help and Support
	help: {
		needHelp: "Need help?",
		contactSupport: "Contact support",
		faq: "Frequently Asked Questions",
		documentation: "Documentation",
		tutorial: "Tutorial",
		guide: "Guide",
	},
} as const;

// Helper functions for dynamic copy
export const getCopy = (key: string, _params?: Record<string, any>) => {
	// Implementation for getting copy with parameter interpolation
	// This would be used in components for consistent messaging
	return key;
};

// Tone and voice guidelines
export const TONE_GUIDELINES = {
	// Keep it conversational but professional
	// Use active voice
	// Be specific and clear
	// Use contractions sparingly
	// Avoid jargon
	// Be encouraging and helpful
	// Use inclusive language
} as const;
