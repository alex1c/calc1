/**
 * BreadcrumbList Schema Component
 * Генерирует JSON-LD разметку для навигационной цепочки (BreadcrumbList)
 * Используется на всех страницах калькуляторов для улучшения SEO
 */

interface BreadcrumbListSchemaProps {
	items: Array<{
		name: string;
		item: string;
	}>;
}

export default function BreadcrumbListSchema({
	items,
}: BreadcrumbListSchemaProps) {
	const schema = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: items.map((item, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: item.name,
			item: item.item,
		})),
	};

	return (
		<script
			type='application/ld+json'
			dangerouslySetInnerHTML={{
				__html: JSON.stringify(schema),
			}}
		/>
	);
}

