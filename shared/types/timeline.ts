export interface TimelineItem {
	id: string
	company: string
	position: string
	startDate: string
	endDate?: string
	current?: boolean
	description: string
	technologies: string[]
	location: string
	url: string
}
