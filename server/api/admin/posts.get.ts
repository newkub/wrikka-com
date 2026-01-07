import type { BlogPost } from "~/shared/types/blog";

export default defineEventHandler(async (event) => {
  // Basic authentication check (you should implement proper auth)
  const authHeader = getHeader(event, 'authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized'
    });
  }

  const token = authHeader.substring(7);
  if (token !== process.env.ADMIN_TOKEN) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid token'
    });
  }

  try {
    // Read blog posts from content directory
    const contentDir = fileURLToPath(new URL('../../content/blog', import.meta.url));
    const files = await readdir(contentDir);
    
    const posts: BlogPost[] = [];
    
    for (const file of files) {
      if (file.endsWith('.md')) {
        const filePath = join(contentDir, file);
        const content = await readFile(filePath, 'utf-8');
        
        // Parse frontmatter
        const { data: frontmatter, content: markdownContent } = parseMarkdown(content);
        
        posts.push({
          slug: file.replace('.md', ''),
          title: frontmatter.title || 'Untitled',
          description: frontmatter.description || '',
          content: markdownContent,
          date: frontmatter.date || new Date().toISOString(),
          author: frontmatter.author || 'Veerapong',
          tags: frontmatter.tags || [],
          category: frontmatter.category || 'general',
          published: frontmatter.published !== false,
          featured: frontmatter.featured || false,
          readingTime: calculateReadingTime(markdownContent),
          lastModified: (await stat(filePath)).mtime.toISOString(),
        });
      }
    }

    return {
      success: true,
      data: posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch posts'
    });
  }
});

// Helper functions
function parseMarkdown(content: string) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return { data: {}, content };
  }
  
  try {
    const frontmatter = match[1].split('\n').reduce((acc, line) => {
      const [key, ...valueParts] = line.split(':');
      if (key && valueParts.length) {
        let value = valueParts.join(':').trim();
        
        // Handle arrays
        if (value.startsWith('[') && value.endsWith(']')) {
          value = value.slice(1, -1).split(',').map(item => item.trim().replace(/['"]/g, ''));
        }
        
        // Handle booleans
        if (value === 'true') value = true;
        if (value === 'false') value = false;
        
        acc[key.trim()] = value;
      }
      return acc;
    }, {} as Record<string, any>);
    
    return { data: frontmatter, content: match[2] };
  } catch {
    return { data: {}, content: match[2] };
  }
}

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}
