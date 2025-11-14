import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import {
	getSafeTitle,
	getSafeDescription,
} from '@/lib/metadata-utils';

interface BabyGrowthLayoutProps {
	children: React.ReactNode;
	params: {
		locale: string;
	};
}

export async function generateMetadata({
	params,
}: BabyGrowthLayoutProps): Promise<Metadata> {
	const t = (key: string) => {
		// This is a simplified approach - in a real app you'd want to handle this more elegantly
		const messages = {
			ru: {
				title: 'Калькулятор роста и веса ребёнка по возрасту',
				description:
					'Онлайн-калькулятор роста и веса ребёнка по данным ВОЗ. Определите, соответствует ли ваш ребёнок нормам роста и массы тела.',
			},
			en: {
				title: 'Baby Growth and Weight Calculator by Age',
				description:
					'Online baby growth and weight calculator based on WHO data. Determine if your child meets height and weight standards.',
			},
			de: {
				title: 'Baby-Wachstums- und Gewichtsrechner nach Alter',
				description:
					'Online-Baby-Wachstums- und Gewichtsrechner basierend auf WHO-Daten. Bestimmen Sie, ob Ihr Kind den Größen- und Gewichtsstandards entspricht.',
			},
			es: {
				title: 'Calculadora de Crecimiento y Peso del Bebé por Edad',
				description:
					'Calculadora en línea de crecimiento y peso del bebé basada en datos de la OMS. Determine si su hijo cumple con los estándares de altura y peso.',
			},
		};
		return (
			messages[params.locale as keyof typeof messages]?.[
				key as keyof (typeof messages)['ru']
			] || messages.ru[key as keyof (typeof messages)['ru']]
		);
	};

	const title = getSafeTitle(t('title'), 'Калькулятор роста и веса ребёнка');
	const description = getSafeDescription(
		t('description'),
		'Онлайн-калькулятор роста и веса ребёнка по данным ВОЗ. Определите, соответствует ли ваш ребёнок нормам роста и массы тела.'
	);

	return {
		title,
		description,
		keywords: [
			'калькулятор роста ребёнка',
			'нормы роста ВОЗ',
			'вес ребёнка по возрасту',
			'процентили роста',
			'развитие ребёнка',
		],
		openGraph: {
			title,
			description,
			type: 'website',
			url: `https://calc1.ru/${params.locale}/life/baby-growth`,
		},
	};
}

export default function BabyGrowthLayout({ children }: BabyGrowthLayoutProps) {
	return <>{children}</>;
}
