import { useDark } from "@vueuse/core";

export const useTheme = () => {
	const toggleDark = useDark({
		selector: "html",
		attribute: "class",
		valueDark: "dark",
		valueLight: "light",
		storageKey: "wrikka-theme",
	});

	return {
		toggleDark,
	};
};
