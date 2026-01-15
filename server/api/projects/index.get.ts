import { readFileSync } from "fs"
import { join } from "path"

export default defineEventHandler(async () => {
	try {
		const projectsFilePath = join(process.cwd(), "content", "projects.json")
		const fileContent = readFileSync(projectsFilePath, "utf-8")
		const projects = JSON.parse(fileContent)

		return projects
	}
	catch {
		return []
	}
})
