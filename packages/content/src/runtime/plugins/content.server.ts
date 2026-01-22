export default defineNuxtPlugin(() => {
  // Auto-import queryContent function on server
  const queryContent = async (path: string) => {
    const { queryContent } = await import('~/modules/content/composables/useContent')
    return queryContent(path)
  }
  
  return {
    provide: {
      queryContent
    }
  }
})
