<script setup lang="ts">
import { ref } from 'vue'

interface Column {
  key: string
  label: string
  sortable?: boolean
}

interface Props {
  columns: Column[]
  data: any[]
  sortKey?: string
  sortOrder?: 'asc' | 'desc'
  selectable?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  sortOrder: 'asc',
  selectable: false,
  loading: false
})

const emit = defineEmits<{
  (e: 'sort', key: string): void
  (e: 'select', selected: any[]): void
}>()

const selectedRows = ref<Set<any>>(new Set())

const toggleSort = (column: Column) => {
  if (column.sortable) {
    emit('sort', column.key)
  }
}

const toggleSelectAll = () => {
  if (selectedRows.value.size === props.data.length) {
    selectedRows.value.clear()
  } else {
    selectedRows.value = new Set(props.data)
  }
  emit('select', Array.from(selectedRows.value))
}

const toggleSelectRow = (row: any) => {
  if (selectedRows.value.has(row)) {
    selectedRows.value.delete(row)
  } else {
    selectedRows.value.add(row)
  }
  emit('select', Array.from(selectedRows.value))
}

const getSortIcon = (column: Column) => {
  if (!column.sortable) return ''
  if (props.sortKey !== column.key) return 'i-carbon-arrow-up-down'
  return props.sortOrder === 'asc' ? 'i-carbon-arrow-up' : 'i-carbon-arrow-down'
}
</script>

<template>
  <div class="overflow-x-auto">
    <table class="w-full border-collapse">
      <thead>
        <tr class="bg-gray-50 dark:bg-gray-800">
          <th
            v-if="selectable"
            class="px-4 py-2 text-left border-b border-gray-200 dark:border-gray-700"
          >
            <input
              type="checkbox"
              :checked="selectedRows.size === data.length"
              :indeterminate="selectedRows.size > 0 && selectedRows.size < data.length"
              @change="toggleSelectAll"
              class="rounded"
            />
          </th>
          <th
            v-for="column in columns"
            :key="column.key"
            class="px-4 py-2 text-left font-medium border-b border-gray-200 dark:border-gray-700"
            :class="{ 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700': column.sortable }"
            @click="toggleSort(column)"
          >
            <div class="flex items-center gap-2">
              {{ column.label }}
              <div
                v-if="column.sortable"
                :class="getSortIcon(column)"
                class="text-gray-400"
              />
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-if="loading">
          <tr v-for="i in 3" :key="i">
            <td
              :colspan="selectable ? columns.length + 1 : columns.length"
              class="px-4 py-2 border-b border-gray-200 dark:border-gray-700"
            >
              <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </td>
          </tr>
        </template>
        <template v-else>
          <tr
            v-for="(row, index) in data"
            :key="index"
            class="hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <td
              v-if="selectable"
              class="px-4 py-2 border-b border-gray-200 dark:border-gray-700"
            >
              <input
                type="checkbox"
                :checked="selectedRows.has(row)"
                @change="toggleSelectRow(row)"
                class="rounded"
              />
            </td>
            <td
              v-for="column in columns"
              :key="column.key"
              class="px-4 py-2 border-b border-gray-200 dark:border-gray-700"
            >
              {{ row[column.key] }}
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>