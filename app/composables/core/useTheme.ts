export const useTheme = () => {
	const isDark = ref(false)

	const loadTheme = () => {
		if (process.client) {
			const savedTheme = localStorage.getItem('theme')
			if (savedTheme === 'dark') {
				isDark.value = true
				document.documentElement.classList.add('dark')
			} else if (savedTheme === 'light') {
				isDark.value = false
				document.documentElement.classList.remove('dark')
			} else {
				const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
				isDark.value = prefersDark
				if (prefersDark) {
					document.documentElement.classList.add('dark')
				}
			}
		}
	}

	const toggleTheme = () => {
		isDark.value = !isDark.value
		if (process.client) {
			if (isDark.value) {
				document.documentElement.classList.add('dark')
				localStorage.setItem('theme', 'dark')
			} else {
				document.documentElement.classList.remove('dark')
				localStorage.setItem('theme', 'light')
			}
		}
	}

	const setTheme = (theme: 'dark' | 'light') => {
		isDark.value = theme === 'dark'
		if (process.client) {
			if (theme === 'dark') {
				document.documentElement.classList.add('dark')
				localStorage.setItem('theme', 'dark')
			} else {
				document.documentElement.classList.remove('dark')
				localStorage.setItem('theme', 'light')
			}
		}
	}

	onMounted(() => {
		loadTheme()
	})

	return {
		isDark,
		toggleTheme,
		setTheme,
	}
}

