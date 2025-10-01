import { useTranslations } from 'next-intl';
import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import PaperWeightCalculator from '@/components/calculators/paper-weight-calculator';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Paper Weight Calculator | Calc1',
	description:
		'Calculate paper weight by density and number of sheets. A4, A3, A5, Letter formats supported.',
	keywords:
		'калькулятор листов а4, расчёт веса бумаги по плотности калькулятор, расчёт веса бумаги, вес бумаги калькулятор',
};

export default function PaperWeightPage() {
	return (
		<div className='min-h-screen bg-gray-50'>
			<Header />
			<Breadcrumbs
				items={[
					{ label: 'Математика', href: '/math' },
					{ label: 'Калькулятор веса бумаги' },
				]}
			/>
			<PaperWeightCalculator />
		</div>
	);
}
