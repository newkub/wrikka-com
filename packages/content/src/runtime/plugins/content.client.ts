export default defineNuxtPlugin(() => {
  // Auto-import queryContent function
  const queryContent = async (path: string) => {
    const { queryContent } = await import('~/modules/content/composables/useContent')
    return queryContent(path)
  }
  
  // Make it globally available
  if (process.client) {
    ;(window as any).queryContent = queryContent
  }
})
