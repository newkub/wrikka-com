import { promises as fs } from 'fs'
import { join } from 'path'

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
  const slug = getRouterParam(event, 'slug')
  
  if (!slug) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Slug parameter is required'
    })
  }

  try {
    const contentDir = join(process.cwd(), 'content/blog')
    
    // Check if directory exists
    try {
      await fs.access(contentDir)
    } catch {
      throw createError({
        statusCode: 404,
        statusMessage: 'Blog content directory not found'
      })
    }

    const files = await fs.readdir(contentDir)
    const markdownFiles = files.filter(file => file.endsWith('.md'))
    
    // Find file by slug
    let targetFile = null
    for (const file of markdownFiles) {
      const filePath = join(contentDir, file)
      const fileContent = await fs.readFile(filePath, 'utf-8')
      
      try {
        const { frontmatter } = parseFrontmatter(fileContent)
        const fileSlug = frontmatter.slug || file.replace('.md', '')
        
        if (fileSlug === slug) {
          targetFile = { file, content: fileContent, frontmatter }
          break
        }
      } catch (error) {
        console.error(`Error parsing ${file}:`, error)
      }
    }
    
    if (!targetFile) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Blog post not found'
      })
    }

    const { frontmatter, content } = parseFrontmatter(targetFile.content)
    
    const post = {
      id: frontmatter.slug || targetFile.file.replace('.md', ''),
      title: frontmatter.title,
      excerpt: frontmatter.excerpt,
      content,
      date: frontmatter.date,
      readingTime: frontmatter.readingTime || calculateReadingTime(content),
      path: `/blog/${frontmatter.slug || targetFile.file.replace('.md', '')}`,
      slug: frontmatter.slug || targetFile.file.replace('.md', ''),
      category: frontmatter.category,
      tags: frontmatter.tags,
      image: frontmatter.image
    }
    
    return post
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    
    console.error('Error loading blog post:', error)
    throw createError({
      statusCode: 500,
      statusMessage: error instanceof Error ? error.message : 'Failed to load blog post'
    })
  }
})
