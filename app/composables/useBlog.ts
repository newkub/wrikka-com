import type { BlogPost } from '../../shared/types/blog';

export const useBlog = () => {
  const fetchPosts = () => {
    return useFetch<BlogPost[]>('/api/blog');
  };

  const fetchPostBySlug = (slug: string) => {
    return useFetch<BlogPost>(`/api/blog/${slug}`);
  };

  return { fetchPosts, fetchPostBySlug };
};
