<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getHighlighter } from 'shiki'
import { marked } from 'marked'

const props = defineProps<{
  code: string
  lang: string
  filename?: string
}>()

const highlightedCode = ref('')
const showFileTree = ref(false)
const loading = ref(true)

const getFileIcon = (filename: string) => {
  const ext = filename.split('.').pop()
  switch(ext) {
    case 'js': return 'i-vscode-icons-file-type-js'
    case 'ts': return 'i-vscode-icons-file-type-typescript'
    case 'vue': return 'i-vscode-icons-file-type-vue'
    case 'html': return 'i-vscode-icons-file-type-html'
    case 'css': return 'i-vscode-icons-file-type-css'
    case 'json': return 'i-vscode-icons-file-type-json'
    case 'md': return 'i-vscode-icons-file-type-markdown'
    default: return 'i-carbon-document'
  }
}

onMounted(async () => {
  try {
    const highlighter = await getHighlighter({
      theme: 'github-dark',
      langs: ['javascript', 'typescript', 'html', 'css', 'json', 'markdown', 'bash', 'vue']
    })
    highlightedCode.value = highlighter.codeToHtml(props.code, { lang: props.lang })
  } catch (error) {
    console.error('Failed to highlight code:', error)
    // Fallback to marked for basic highlighting
    highlightedCode.value = `<pre><code class="language-${props.lang}">${props.code}</code></pre>`
  } finally {
    loading.value = false
  }
})

const toggleFileTree = () => {
  showFileTree.value = !showFileTree.value
}

const copyCode = async (button: HTMLButtonElement) => {
  try {
    await navigator.clipboard.writeText(props.code)
    const originalText = button.innerHTML
    button.innerHTML = '<div class="i-carbon-checkmark text-green-500"></div> Copied!'
    setTimeout(() => {
      button.innerHTML = originalText
    }, 2000)
  } catch (error) {
    console.error('Failed to copy code:', error)
  }
}
</script>

<template>
  <div class="relative rounded-lg overflow-hidden mb-6">
    <div class="flex justify-between items-center bg-gray-800 px-4 py-2 text-gray-400 text-sm">
      <div class="flex items-center gap-2">
        <button @click="toggleFileTree" class="hover:text-white transition-colors">
          <div class="i-carbon-list-files text-lg" />
        </button>
        <div :class="[filename ? getFileIcon(filename) : 'i-carbon-code', 'text-lg']" />
        <span>{{ filename || 'code' }}</span>
        <span class="text-gray-500">{{ lang }}</span>
      </div>
      <button
        @click="copyCode($event.target as HTMLButtonElement)"
        class="hover:text-white transition-colors flex items-center gap-1"
      >
        <div class="i-carbon-copy" /> Copy
      </button>
    </div>
    <div v-if="showFileTree" class="absolute left-0 top-full bg-gray-800 w-64 p-4 rounded-b-lg shadow-lg z-10">
      <h4 class="text-white mb-2">Project Files</h4>
      <div class="text-gray-300">
        <div class="flex items-center gap-2 py-1 hover:bg-gray-700 rounded px-2 cursor-pointer">
          <div class="i-vscode-icons-file-type-vue" /> App.vue
        </div>
        <div class="flex items-center gap-2 py-1 hover:bg-gray-700 rounded px-2 cursor-pointer">
          <div class="i-vscode-icons-file-type-typescript" /> main.ts
        </div>
        <div class="flex items-center gap-2 py-1 hover:bg-gray-700 rounded px-2 cursor-pointer">
          <div class="i-vscode-icons-file-type-typescript" /> router.ts
        </div>
      </div>
    </div>
    <div v-if="loading" class="bg-gray-900 p-4 text-gray-400">
      Loading...
    </div>
    <div v-else class="bg-gray-900 p-4 overflow-x-auto" v-html="highlightedCode" />
  </div>
</template>

<style>
:deep(pre) {
  margin: 0 !important;
  padding: 0 !important;
}

:deep(code) {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace !important;
  font-size: 0.9em !important;
  line-height: 1.5 !important;
}

:deep(.shiki) {
  background-color: transparent !important;
}
</style>