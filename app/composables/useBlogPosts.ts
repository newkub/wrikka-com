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

export const useBlogPosts = () => {
  const posts = ref<BlogPost[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const loadPosts = async (): Promise<BlogPost[]> => {
    try {
      loading.value = true
      error.value = null
      
      const response = await $fetch('/api/blog') as { posts: BlogPost[], count: number, error?: string }
      
      if (response.error) {
        throw new Error(response.error)
      }
      
      posts.value = response.posts || []
      return posts.value
      
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load blog posts'
      console.error('Error loading blog posts:', err)
      return []
    } finally {
      loading.value = false
    }
  }

  const getPostBySlug = async (slug: string): Promise<BlogPost | null> => {
    try {
      loading.value = true
      error.value = null
      
      const post = await $fetch(`/api/blog/${slug}`)
      return post as BlogPost
      
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load blog post'
      console.error('Error loading blog post:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  const getPostsByCategory = async (category: string): Promise<BlogPost[]> => {
    if (posts.value.length === 0) {
      await loadPosts()
    }
    return posts.value.filter(post => post.category === category)
  }

  const getPostsByTag = async (tag: string): Promise<BlogPost[]> => {
    if (posts.value.length === 0) {
      await loadPosts()
    }
    return posts.value.filter(post => post.tags?.includes(tag))
  }

  return {
    posts: readonly(posts),
    loading: readonly(loading),
    error: readonly(error),
    loadPosts,
    getPostBySlug,
    getPostsByCategory,
    getPostsByTag
  }
}
