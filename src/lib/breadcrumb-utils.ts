/**
 * Утилита для генерации BreadcrumbList разметки Schema.org
 * Используется для создания структурированных данных навигационной цепочки
 */

export interface BreadcrumbItem {
	name: string;
	item: string;
}

/**
 * Генерирует BreadcrumbList разметку для Schema.org
 * @param items - Массив элементов хлебных крошек
 * @returns JSON-LD объект BreadcrumbList
 */
export function generateBreadcrumbListSchema(
	items: BreadcrumbItem[]
): {
	'@context': string;
	'@type': 'BreadcrumbList';
	itemListElement: Array<{
		'@type': 'ListItem';
		position: number;
		name: string;
		item: string;
	}>;
} {
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: items.map((item, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: item.name,
			item: item.item,
		})),
	};
}

