export const useMobileSidebar = () => {
	const isOpen = useState('mobileSidebar', () => false)

	const openSidebar = () => {
		isOpen.value = true
		document.body.style.overflow = 'hidden'
	}

	const closeSidebar = () => {
		isOpen.value = false
		document.body.style.overflow = ''
	}

	const toggleSidebar = () => {
		if (isOpen.value) {
			closeSidebar()
		} else {
			openSidebar()
		}
	}

	onUnmounted(() => {
		document.body.style.overflow = ''
	})

	return {
		isOpen,
		openSidebar,
		closeSidebar,
		toggleSidebar,
	}
}

