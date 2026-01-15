import type { Testimonial } from "#shared/types/testimonials";

export const useTestimonials = () => {
	const testimonials = ref<Testimonial[]>([
		{
			id: "1",
			name: "John Doe",
			position: "CTO",
			company: "Tech Company",
			content: "Veerapong is an exceptional developer who consistently delivers high-quality work. His attention to detail and problem-solving skills are outstanding.",
			avatar: "https://i.pravatar.cc/150?img=1",
			url: "https://linkedin.com/in/johndoe",
			rating: 5,
			date: "2024-01",
		},
		{
			id: "2",
			name: "Jane Smith",
			position: "Product Manager",
			company: "Digital Agency",
			content: "Working with Veerapong was a great experience. He understood our requirements perfectly and delivered the project on time.",
			avatar: "https://i.pravatar.cc/150?img=5",
			url: "https://linkedin.com/in/janesmith",
			rating: 5,
			date: "2023-12",
		},
		{
			id: "3",
			name: "Mike Johnson",
			position: "Senior Developer",
			company: "Startup Inc",
			content: "Veerapong is a talented developer with excellent communication skills. He's always willing to help and share his knowledge.",
			avatar: "https://i.pravatar.cc/150?img=3",
			url: "https://linkedin.com/in/mikejohnson",
			rating: 5,
			date: "2023-11",
		},
	]);

	return {
		testimonials,
	};
};
