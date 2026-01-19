export interface TOCItem {
	id: string;
	text: string;
	level: number;
}

export interface SidebarItem {
	title: string;
	path: string;
	children?: SidebarItem[];
}
