export interface Skill {
  name: string;
  level: number; // 1-5
  category: string;
  icon?: string;
  years?: number;
  projects?: number;
}

// Mock data - replace with real data from API or config
export const skills: Skill[] = [
  // Frontend
  { name: "Vue.js", level: 5, category: "Frontend", icon: "mdi:vuejs", years: 5, projects: 12 },
  { name: "Nuxt.js", level: 5, category: "Frontend", icon: "mdi:nuxt", years: 4, projects: 8 },
  { name: "TypeScript", level: 4, category: "Frontend", icon: "mdi:language-typescript", years: 4, projects: 15 },
  { name: "React", level: 3, category: "Frontend", icon: "mdi:react", years: 2, projects: 4 },
  { name: "Tailwind CSS", level: 4, category: "Frontend", icon: "mdi:tailwind", years: 3, projects: 10 },
  
  // Backend
  { name: "Node.js", level: 4, category: "Backend", icon: "mdi:nodejs", years: 4, projects: 8 },
  { name: "Express.js", level: 4, category: "Backend", icon: "mdi:nodejs", years: 3, projects: 6 },
  { name: "PostgreSQL", level: 3, category: "Backend", icon: "mdi:database", years: 2, projects: 4 },
  { name: "MongoDB", level: 3, category: "Backend", icon: "mdi:leaf", years: 2, projects: 3 },
  
  // Tools & DevOps
  { name: "Git", level: 5, category: "Tools", icon: "mdi:git", years: 6, projects: 20 },
  { name: "Docker", level: 3, category: "Tools", icon: "mdi:docker", years: 2, projects: 5 },
  { name: "Vercel", level: 4, category: "Tools", icon: "mdi:vercel", years: 3, projects: 12 },
  { name: "AWS", level: 2, category: "Tools", icon: "mdi:aws", years: 1, projects: 2 },
];
