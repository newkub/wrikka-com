import { DEFAULT_LANGUAGE_COLOR, DEFAULT_LANGUAGE_ICON, LANGUAGE_COLORS, LANGUAGE_ICONS } from "../constants/language";

export function useLanguage() {
	return {
		getLanguageIcon,
		getLanguageColor,
	};
}

export function getLanguageIcon(language: string | null): string {
	if (!language) return DEFAULT_LANGUAGE_ICON;
	const langLower = language.toLowerCase();
	return LANGUAGE_ICONS[langLower] || DEFAULT_LANGUAGE_ICON;
}

export function getLanguageColor(language: string | null): string {
	if (!language) return DEFAULT_LANGUAGE_COLOR;
	const langLower = language.toLowerCase();
	return LANGUAGE_COLORS[langLower] || DEFAULT_LANGUAGE_COLOR;
}

