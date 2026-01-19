export interface Course {
	id: string;
	title: string;
	description: string;
	icon: string;
	tags: string[];
	path: string;
}

export interface Lesson {
	id: string;
	title: string;
	description: string;
	icon: string;
	group: string;
	contentPath: string;
	routePath: string;
}

export interface LessonGroup {
	label: string;
	concepts: Lesson[];
}

export const useCourseData = async () => {
	const courses = await queryContent("/course")
		.where({ _partial: false })
		.find();

	return courses.map((course: any) => ({
		id: course._dir,
		title: course.title,
		description: course.description,
		icon: course.icon,
		tags: course.tags || [],
		path: `/course/${course._dir}`,
	})) as Course[];
};

export const useCourseLessons = async (courseId: string) => {
	const coursePath = `/course/${courseId}`;

	// Get all subdirectories (groups) in the course
	const groups = await queryContent(coursePath)
		.where({ _partial: false, _dir: { $ne: null } })
		.find();

	const grouped: LessonGroup[] = [];

	for (const group of groups) {
		const groupLabel = group._dir;
		if (!groupLabel || groupLabel === courseId) continue;

		// Get lessons in this group
		const lessons = await queryContent(`${coursePath}/${groupLabel}`)
			.where({ _partial: false })
			.find();

		const concepts = lessons.map((lesson: any) => ({
			id: lesson._path?.split("/").pop() || "",
			title: lesson.title,
			description: lesson.description,
			icon: lesson.icon,
			group: groupLabel,
			contentPath: lesson._path || "",
			routePath: lesson._path || "",
		}));

		if (concepts.length > 0) {
			grouped.push({
				label: groupLabel
					.split("-")
					.map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
					.join(" "),
				concepts,
			});
		}
	}

	return grouped;
};
