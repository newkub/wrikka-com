import { promises as fs } from 'fs'
import { join } from 'path'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  date: string
  readingTime: number
  path: string
  slug: string
  category?: string
  tags?: string[]
  image?: string
}

interface FrontMatter {
  title: string
  date: string
  excerpt: string
  slug: string
  readingTime?: number
  category?: string
  tags?: string[]
  image?: string
  [key: string]: any
}

// Simple frontmatter parser
function parseFrontmatter(content: string): { frontmatter: FrontMatter; content: string } {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/
  const match = content.match(frontmatterRegex)

  if (!match) {
    throw new Error('Invalid frontmatter format')
  }

  const [, frontmatterText, markdownContent] = match
  const frontmatter: any = {}

  // Parse YAML-like format
  const lines = frontmatterText.split('\n')
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue

    const colonIndex = trimmed.indexOf(':')
    if (colonIndex === -1) continue

    const key = trimmed.slice(0, colonIndex).trim()
    let value: any = trimmed.slice(colonIndex + 1).trim()

    // Remove quotes
    if ((value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1)
    }

    // Convert numbers
    if (!isNaN(Number(value)) && value !== '') {
      value = Number(value)
    }

    frontmatter[key] = value
  }

  return {
    frontmatter: frontmatter as FrontMatter,
    content: markdownContent.trim()
  }
}

// Calculate reading time
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

export default defineEventHandler(async (event) => {
  try {
    const contentDir = join(process.cwd(), 'content/blog')
    
    // Check if directory exists
    try {
      await fs.access(contentDir)
    } catch {
      return {
        posts: [],
        error: 'Blog content directory not found'
      }
    }

    const files = await fs.readdir(contentDir)
    const markdownFiles = files.filter(file => file.endsWith('.md'))
    
    const blogPosts: BlogPost[] = []

    for (const file of markdownFiles) {
      try {
        const filePath = join(contentDir, file)
        const fileContent = await fs.readFile(filePath, 'utf-8')
        
        const { frontmatter, content } = parseFrontmatter(fileContent)
        
        const post: BlogPost = {
          id: frontmatter.slug || file.replace('.md', ''),
          title: frontmatter.title,
          excerpt: frontmatter.excerpt,
          content,
          date: frontmatter.date,
          readingTime: frontmatter.readingTime || calculateReadingTime(content),
          path: `/blog/${frontmatter.slug || file.replace('.md', '')}`,
          slug: frontmatter.slug || file.replace('.md', ''),
          category: frontmatter.category,
          tags: frontmatter.tags,
          image: frontmatter.image
        }
        
        blogPosts.push(post)
      } catch (fileError) {
        console.error(`Error processing file ${file}:`, fileError)
      }
    }

    // Sort by date (newest first)
    blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return {
      posts: blogPosts,
      count: blogPosts.length
    }
  } catch (error) {
    console.error('Error loading blog posts:', error)
    return {
      posts: [],
      error: error instanceof Error ? error.message : 'Failed to load blog posts'
    }
  }
})
