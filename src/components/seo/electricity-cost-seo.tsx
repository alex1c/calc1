import { useTranslations } from 'next-intl';

export default function ElectricityCostSEO() {
	const t = useTranslations('calculators.electricityCost.seo');

	const faqRaw = t.raw('faqItems');
	const faq = Array.isArray(faqRaw)
		? (faqRaw as Array<{ q: string; a: string }>)
		: [];

	return (
		<div className='max-w-5xl mx-auto mt-10 space-y-8'>
			<section className='bg-white rounded-lg shadow p-6'>
				<h2 className='text-2xl font-bold mb-3'>
					{t('overview.title')}
				</h2>
				<p className='text-gray-700'>{t('overview.content')}</p>
			</section>

			<section className='bg-white rounded-lg shadow p-6'>
				<h2 className='text-2xl font-bold mb-3'>
					{t('calculation.title')}
				</h2>
				<p className='text-gray-700 whitespace-pre-line'>
					{t('calculation.content')}
				</p>
			</section>

			<section className='bg-white rounded-lg shadow p-6'>
				<h2 className='text-2xl font-bold mb-3'>{t('tips.title')}</h2>
				<ul className='list-disc ml-5 text-gray-700 space-y-1'>
					<li>{t('tips.tip1')}</li>
					<li>{t('tips.tip2')}</li>
					<li>{t('tips.tip3')}</li>
				</ul>
			</section>

			<section className='bg-white rounded-lg shadow p-6'>
				<h2 className='text-2xl font-bold mb-3'>{t('faq.title')}</h2>
				<div className='space-y-3'>
					{faq.map((item, idx) => (
						<div
							key={idx}
							className='border rounded p-4'
						>
							<h3 className='font-semibold mb-1'>{item.q}</h3>
							<p className='text-gray-700'>{item.a}</p>
						</div>
					))}
				</div>
			</section>
		</div>
	);
}
