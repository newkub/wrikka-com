<script setup lang="ts">
import { ref } from 'vue'
import Tokens from '../components/Tokens.vue'
import Input from '../components/Input.vue'
import Search from '../components/Search.vue'
import Button from '../components/Button.vue'
import Alert from '../components/Alert.vue'
import Accordion from '../components/Accordion.vue'
import Badge from '../components/Badge.vue'
import Dialog from '../components/Dialog.vue'
import OtpInput from '../components/OtpInput.vue'
import RadioGroup from '../components/RadioGroup.vue'
import Toggle from '../components/Toggle.vue'
import Tooltip from '../components/Tooltip.vue'
import Resizable from '../components/Resizable.vue'
import Progress from '../components/Progress.vue'
import Pagination from '../components/Pagination.vue'
import Tabs from '../components/Tabs.vue'
import Table from '../components/Table.vue'
import Textarea from '../components/Textarea.vue'
import Toast from '../components/Toast.vue'
import Skeleton from '../components/Skeleton.vue'

const searchText = ref('')
const inputValue = ref('')
const textareaValue = ref('')
const showAlert = ref(true)
const showDialog = ref(false)
const otpValue = ref('')
const selectedRadio = ref('option1')
const toggleValue = ref(false)
const currentPage = ref(1)
const progressValue = ref(65)
const activeTab = ref('tab1')
const sortKey = ref('name')
const sortOrder = ref<'asc' | 'desc'>('asc')
const toastRef = ref()

const accordionItems = [
  {
    title: 'What is Vue.js?',
    content: 'Vue.js is a progressive framework for building user interfaces.'
  },
  {
    title: 'Why use Vue.js?',
    content: 'Vue.js is lightweight, has an easy learning curve, and is very flexible.'
  }
]

const radioOptions = [
  { value: 'option1', label: 'Option 1', description: 'This is option 1' },
  { value: 'option2', label: 'Option 2', description: 'This is option 2' },
  { value: 'option3', label: 'Option 3', description: 'This is option 3' },
]

const tabs = [
  { id: 'tab1', label: 'Profile', icon: 'i-carbon-user-avatar' },
  { id: 'tab2', label: 'Settings', icon: 'i-carbon-settings' },
  { id: 'tab3', label: 'Notifications', icon: 'i-carbon-notification' },
]

const tableColumns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'role', label: 'Role', sortable: true },
  { key: 'status', label: 'Status' },
]

const tableData = [
  { name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Inactive' },
  { name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: 'Active' },
]

const handleSort = (key: string) => {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortOrder.value = 'asc'
  }
}

const handleSelectionChange = (selected: any[]) => {
  console.log('Selected rows:', selected)
}

const showToast = (type: 'success' | 'error' | 'info' | 'warning') => {
  toastRef.value?.show('This is a toast message!', type)
}
</script>

<template>
  <div class="max-w-4xl mx-auto px-4">
    <h1 class="text-3xl font-bold mb-8">Components</h1>
    
    <div class="grid gap-12">
      <!-- Toast -->
      <Toast ref="toastRef" />
      
      <!-- Textarea -->
      <div class="space-y-6">
        <h2 class="text-2xl font-semibold">Textarea</h2>
        <div class="space-y-4">
          <Textarea
            v-model="textareaValue"
            label="Message"
            placeholder="Enter your message"
            :max-length="200"
          />
          <Textarea
            label="Disabled Textarea"
            placeholder="This textarea is disabled"
            disabled
            v-model="textareaValue"
          />
        </div>
      </div>

      <!-- Toast Triggers -->
      <div class="space-y-6">
        <h2 class="text-2xl font-semibold">Toast</h2>
        <div class="flex gap-4">
          <Button @click="showToast('success')">Success Toast</Button>
          <Button @click="showToast('error')" variant="danger">Error Toast</Button>
          <Button @click="showToast('info')" variant="secondary">Info Toast</Button>
          <Button @click="showToast('warning')">Warning Toast</Button>
        </div>
      </div>

      

      <!-- Skeleton -->
      <div class="space-y-6">
        <h2 class="text-2xl font-semibold">Skeleton</h2>
        <div class="space-y-4">
          <Skeleton />
          <Skeleton variant="circular" width="48px" height="48px" />
          <Skeleton variant="rectangular" height="100px" />
          <div class="flex gap-4">
            <Skeleton variant="circular" width="40px" height="40px" />
            <div class="space-y-2 flex-1">
              <Skeleton height="20px" width="200px" />
              <Skeleton height="16px" />
              <Skeleton height="16px" />
            </div>
          </div>
        </div>
      </div>

      <!-- Existing components... -->
      <!-- Tabs -->
      <div class="space-y-6">
        <h2 class="text-2xl font-semibold">Tabs</h2>
        <div class="space-y-8">
          <div class="space-y-4">
            <h3 class="text-lg font-medium">Default</h3>
            <Tabs v-model="activeTab" :tabs="tabs" />
          </div>
          <div class="space-y-4">
            <h3 class="text-lg font-medium">Pills</h3>
            <Tabs v-model="activeTab" :tabs="tabs" variant="pills" />
          </div>
          <div class="space-y-4">
            <h3 class="text-lg font-medium">Underline</h3>
            <Tabs v-model="activeTab" :tabs="tabs" variant="underline" />
          </div>
        </div>
      </div>

      <!-- Table -->
      <div class="space-y-6">
        <h2 class="text-2xl font-semibold">Table</h2>
        <div class="space-y-8">
          <div class="space-y-4">
            <h3 class="text-lg font-medium">Basic</h3>
            <Table
              :columns="tableColumns"
              :data="tableData"
              :sort-key="sortKey"
              :sort-order="sortOrder"
              @sort="handleSort"
            />
          </div>
          <div class="space-y-4">
            <h3 class="text-lg font-medium">Selectable</h3>
            <Table
              :columns="tableColumns"
              :data="tableData"
              :sort-key="sortKey"
              :sort-order="sortOrder"
              selectable
              @sort="handleSort"
              @select="handleSelectionChange"
            />
          </div>
          <div class="space-y-4">
            <h3 class="text-lg font-medium">Loading</h3>
            <Table
              :columns="tableColumns"
              :data="[]"
              loading
            />
          </div>
        </div>
      </div>

      <!-- Input -->
      <div class="space-y-6">
        <h2 class="text-2xl font-semibold">Input</h2>
        <div class="space-y-4">
          <Input
            v-model="inputValue"
            label="Username"
            placeholder="Enter your username"
          />
          <Input
            type="password"
            label="Password"
            placeholder="Enter your password"
            error="Password is required"
          />
          <Input
            label="Disabled Input"
            placeholder="This input is disabled"
            disabled
          />
        </div>
      </div>

      <!-- Search -->
      <div class="space-y-6">
        <h2 class="text-2xl font-semibold">Search</h2>
        <Search
          v-model="searchText"
          placeholder="Search..."
        />
      </div>

      <!-- Toggle -->
      <div class="space-y-6">
        <h2 class="text-2xl font-semibold">Toggle</h2>
        <div class="space-y-4">
          <Toggle v-model="toggleValue" label="Default Toggle" />
          <Toggle v-model="toggleValue" label="Small Toggle" size="sm" />
          <Toggle v-model="toggleValue" label="Large Toggle" size="lg" />
          <Toggle v-model="toggleValue" label="Disabled Toggle" disabled />
        </div>
      </div>

      <!-- Tooltip -->
      <div class="space-y-6">
        <h2 class="text-2xl font-semibold">Tooltip</h2>
        <div class="flex gap-4">
          <div class="relative">
            <Button>
              Hover me (Top)
              <Tooltip content="This is a tooltip!" position="top" />
            </Button>
          </div>
          <div class="relative">
            <Button>
              Hover me (Right)
              <Tooltip content="This is a tooltip!" position="right" />
            </Button>
          </div>
          <div class="relative">
            <Button>
              Hover me (Bottom)
              <Tooltip content="This is a tooltip!" position="bottom" />
            </Button>
          </div>
          <div class="relative">
            <Button>
              Hover me (Left)
              <Tooltip content="This is a tooltip!" position="left" />
            </Button>
          </div>
        </div>
      </div>

      <!-- Resizable -->
      <div class="space-y-6">
        <h2 class="text-2xl font-semibold">Resizable</h2>
        <Resizable>
          <div class="p-4">
            <h3 class="text-lg font-medium mb-2">Resizable Container</h3>
            <p>Drag the bottom-right corner to resize this container.</p>
          </div>
        </Resizable>
      </div>

      <!-- Progress -->
      <div class="space-y-6">
        <h2 class="text-2xl font-semibold">Progress</h2>
        <div class="space-y-4">
          <Progress :value="progressValue" />
          <Progress :value="progressValue" variant="success" striped animated />
          <Progress :value="progressValue" variant="warning" size="sm" />
          <Progress :value="progressValue" variant="danger" size="lg" />
        </div>
      </div>

      <!-- Pagination -->
      <div class="space-y-6">
        <h2 class="text-2xl font-semibold">Pagination</h2>
        <Pagination v-model="currentPage" :total-pages="10" />
      </div>

      <!-- Dialog -->
      <div class="space-y-6">
        <h2 class="text-2xl font-semibold">Dialog</h2>
        <div class="space-y-4">
          <Button @click="showDialog = true">Open Dialog</Button>
          <Dialog
            v-model="showDialog"
            title="Confirm Action"
            description="Are you sure you want to perform this action?"
          />
        </div>
      </div>

      <!-- OTP Input -->
      <div class="space-y-6">
        <h2 class="text-2xl font-semibold">OTP Input</h2>
        <OtpInput
          v-model="otpValue"
          @complete="handleOtpComplete"
        />
      </div>

      <!-- Radio Group -->
      <div class="space-y-6">
        <h2 class="text-2xl font-semibold">Radio Group</h2>
        <RadioGroup
          v-model="selectedRadio"
          name="demo-radio"
          :options="radioOptions"
        />
      </div>

      <!-- Button -->
      <div class="space-y-6">
        <h2 class="text-2xl font-semibold">Button</h2>
        <div class="flex flex-wrap gap-4">
          <Button>Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="danger">Danger Button</Button>
          <Button variant="ghost">Ghost Button</Button>
          <Button loading>Loading</Button>
          <Button icon="i-carbon-add">With Icon</Button>
        </div>
      </div>

      <!-- Alert -->
      <div class="space-y-6">
        <h2 class="text-2xl font-semibold">Alert</h2>
        <div class="space-y-4">
          <Alert v-if="showAlert" title="Info Alert" @close="showAlert = false">
            This is an informational alert message.
          </Alert>
          <Alert type="success" title="Success Alert">
            Operation completed successfully!
          </Alert>
          <Alert type="warning" title="Warning Alert">
            Please review your input before proceeding.
          </Alert>
          <Alert type="error" title="Error Alert">
            An error occurred while processing your request.
          </Alert>
        </div>
      </div>

      <!-- Accordion -->
      <div class="space-y-6">
        <h2 class="text-2xl font-semibold">Accordion</h2>
        <Accordion :items="accordionItems" />
      </div>

      <!-- Badge -->
      <div class="space-y-6">
        <h2 class="text-2xl font-semibold">Badge</h2>
        <div class="flex flex-wrap gap-4">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="danger">Danger</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge rounded>Rounded</Badge>
          <Badge size="sm">Small</Badge>
          <Badge size="lg">Large</Badge>
        </div>
      </div>

      <!-- Tokens -->
      <div class="space-y-6">
        <h2 class="text-2xl font-semibold">Design Tokens</h2>
        <Tokens />
      </div>
    </div>
  </div>
</template>