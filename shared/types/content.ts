export interface ContentItem {
	_path?: string;
	_dir?: string;
	_partial?: boolean;
	title?: string;
	description?: string;
	icon?: string;
	tags?: string[];
	body?: string;
	order?: number;
	[key: string]: any;
}

export interface QueryBuilder {
	where: (query: any) => QueryBuilder;
	find: () => Promise<ContentItem[]>;
	findOne: () => Promise<ContentItem | null>;
}
