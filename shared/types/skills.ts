export interface Skill {
	id: string
	name: string
	category: string
	level: "expert" | "advanced" | "intermediate" | "learning"
	years: number
}
