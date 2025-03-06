<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getHighlighter } from 'shiki'
import { marked } from 'marked'
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps<{
  code: string
  lang: string
  filename?: string
}>()

const highlightedCode = ref('')
const showFileTree = ref(false)
const loading = ref(true)
const isCopied = ref(false)

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

const projectFiles = [
  { name: 'App.vue', path: '/src/App.vue' },
  { name: 'main.ts', path: '/src/main.ts' },
  { name: 'router.ts', path: '/src/router.ts' },
  { name: 'Code.vue', path: '/src/components/Code.vue' }
]

onMounted(async () => {
  try {
    const highlighter = await getHighlighter({
      theme: 'github-dark',
      langs: ['javascript', 'typescript', 'html', 'css', 'json', 'markdown', 'bash', 'vue']
    })
    highlightedCode.value = highlighter.codeToHtml(props.code, { lang: props.lang })
  } catch (error) {
    console.error('Failed to highlight code:', error)
    highlightedCode.value = `<pre><code class="language-${props.lang}">${props.code}</code></pre>`
  } finally {
    loading.value = false
  }
})

const toggleFileTree = () => {
  showFileTree.value = !showFileTree.value
}

const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(props.code)
    isCopied.value = true
    setTimeout(() => {
      isCopied.value = false
    }, 2000)
  } catch (error) {
    console.error('Failed to copy code:', error)
  }
}

const downloadCode = () => {
  const blob = new Blob([props.code], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = props.filename || 'code.txt'
  a.click()
  URL.revokeObjectURL(url)
}
</script>

<template>
  <div class="relative rounded-lg overflow-hidden mb-6 border border-gray-700">
    <div class="flex justify-between items-center bg-gray-800 px-4 py-2 text-gray-400 text-sm">
      <div class="flex items-center gap-2">
        <button
          @click="toggleFileTree"
          class="hover:text-white transition-colors duration-200"
          aria-label="Toggle file tree"
        >
          <div class="i-carbon-list-files text-lg" />
        </button>
        <div :class="[filename ? getFileIcon(filename) : 'i-carbon-code', 'text-lg']" />
        <span>{{ filename || 'code' }}</span>
        <span class="text-gray-500">{{ lang }}</span>
      </div>
      <div class="flex items-center gap-2">
        <button
          @click="downloadCode"
          class="hover:text-white transition-colors duration-200 flex items-center gap-1"
          aria-label="Download code"
        >
          <div class="i-carbon-download" />
        </button>
        <button
          @click="copyCode"
          class="hover:text-white transition-colors duration-200 flex items-center gap-1"
          :class="{ 'text-green-500': isCopied }"
          aria-label="Copy code"
        >
          <div :class="isCopied ? 'i-carbon-checkmark' : 'i-carbon-copy'" />
          {{ isCopied ? 'Copied!' : 'Copy' }}
        </button>
      </div>
    </div>
    <Transition name="slide">
      <div
        v-if="showFileTree"
        class="absolute left-0 top-full bg-gray-800 w-64 p-4 rounded-b-lg shadow-lg z-10"
      >
        <h4 class="text-white mb-2">Project Files</h4>
        <div class="text-gray-300">
          <div
            v-for="file in projectFiles"
            :key="file.name"
            @click="router.push(file.path)"
            class="flex items-center gap-2 py-1 hover:bg-gray-700 rounded px-2 cursor-pointer transition-colors duration-200"
          >
            <div :class="getFileIcon(file.name)" />
            {{ file.name }}
          </div>
        </div>
      </div>
    </Transition>
    <div v-if="loading" class="bg-gray-900 p-4 animate-pulse">
      <div class="h-4 bg-gray-800 rounded w-1/4 mb-2" />
      <div class="h-4 bg-gray-800 rounded w-3/4" />
    </div>
    <div v-else class="bg-gray-900 p-4 overflow-x-auto" v-html="highlightedCode" />
  </div>
</template>

<style>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

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