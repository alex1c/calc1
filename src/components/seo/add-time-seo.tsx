'use client';

import { useTranslations } from 'next-intl';

export default function AddTimeSEO() {
	const t = useTranslations('calculators.addTime');

	const faqData = [
		{
			q: 'Как прибавить дни к дате?',
			a: 'Введите дату и количество дней — результат появится автоматически.',
		},
		{
			q: 'Можно ли добавить не только дни, но и часы или минуты?',
			a: 'Да, калькулятор позволяет добавлять все типы времени одновременно.',
		},
		{
			q: 'Как учесть переход через месяц или год?',
			a: 'Система корректно рассчитывает новые даты с учётом всех месяцев и лет.',
		},
		{
			q: 'Можно ли учитывать часовой пояс?',
			a: 'Да, есть выбор часового пояса пользователя.',
		},
		{
			q: 'Поддерживает ли калькулятор отрицательные значения?',
			a: 'Да, вы можете вычесть время, введя отрицательное число.',
		},
		{
			q: 'Можно ли использовать разные форматы даты?',
			a: 'Да, поддерживаются форматы ДД.ММ.ГГГГ и YYYY-MM-DD.',
		},
		{
			q: 'Показывает ли калькулятор день недели результата?',
			a: 'Да, в результате указывается и день недели.',
		},
		{
			q: 'Подходит ли калькулятор для расчёта сроков доставки?',
			a: 'Да, инструмент часто используют для логистики и планирования.',
		},
		{
			q: 'Можно ли копировать результат?',
			a: 'Да, итоговая дата копируется одной кнопкой.',
		},
		{
			q: 'Есть ли ограничение по диапазону дат?',
			a: 'Нет, можно работать с любыми годами.',
		},
		{
			q: 'Работает ли калькулятор без интернета?',
			a: 'Нет, требуется онлайн-доступ для точной синхронизации.',
		},
	];

	return (
		<div className='space-y-8'>
			{/* Overview */}
			<section>
				<h2 className='text-2xl font-bold text-gray-900 mb-4'>
					О калькуляторе прибавления времени
				</h2>
				<div className='prose prose-lg text-gray-600'>
					<p>
						Онлайн-калькулятор прибавления времени — это удобный
						инструмент для точного расчёта будущих дат. Просто
						введите начальную дату и время, укажите, сколько дней,
						часов или минут нужно добавить, и получите точный
						результат.
					</p>
					<p>
						Калькулятор автоматически учитывает переходы между
						месяцами, годами, високосные годы и корректно
						обрабатывает все календарные особенности. Идеально
						подходит для планирования проектов, расчёта сроков
						доставки, определения дедлайнов и многих других задач.
					</p>
				</div>
			</section>

			{/* How it works */}
			<section>
				<h2 className='text-2xl font-bold text-gray-900 mb-4'>
					Как работает калькулятор прибавления времени
				</h2>
				<div className='prose prose-lg text-gray-600'>
					<p>
						Калькулятор использует точные математические алгоритмы
						для расчёта будущих дат:
					</p>
					<ul>
						<li>
							<strong>Дни:</strong> Прямое добавление к дате с
							учётом календарных особенностей
						</li>
						<li>
							<strong>Часы:</strong> Преобразование в дни и часы с
							учётом перехода через полночь
						</li>
						<li>
							<strong>Минуты:</strong> Точный расчёт с учётом всех
							временных переходов
						</li>
						<li>
							<strong>Календарь:</strong> Автоматический учёт
							високосных лет и разной длины месяцев
						</li>
					</ul>
				</div>
			</section>

			{/* Advantages */}
			<section>
				<h2 className='text-2xl font-bold text-gray-900 mb-4'>
					Преимущества нашего калькулятора
				</h2>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<div className='bg-green-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-green-900 mb-2'>
							Точность расчётов
						</h3>
						<p className='text-green-800'>
							Учитывает все календарные особенности, включая
							високосные годы и разную длительность месяцев.
						</p>
					</div>
					<div className='bg-blue-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-blue-900 mb-2'>
							Гибкость ввода
						</h3>
						<p className='text-blue-800'>
							Можно добавлять дни, часы и минуты одновременно или
							по отдельности.
						</p>
					</div>
					<div className='bg-purple-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-purple-900 mb-2'>
							Удобный интерфейс
						</h3>
						<p className='text-purple-800'>
							Интуитивно понятные поля ввода с кнопками быстрого
							доступа к текущему времени.
						</p>
					</div>
					<div className='bg-orange-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-orange-900 mb-2'>
							Детальная информация
						</h3>
						<p className='text-orange-800'>
							Показывает итоговую дату, время и день недели для
							полного понимания результата.
						</p>
					</div>
				</div>
			</section>

			{/* Tips */}
			<section>
				<h2 className='text-2xl font-bold text-gray-900 mb-4'>
					Полезные советы
				</h2>
				<div className='prose prose-lg text-gray-600'>
					<ul>
						<li>
							<strong>Планирование проектов:</strong> Рассчитайте
							точные сроки выполнения задач
						</li>
						<li>
							<strong>Доставка:</strong> Определите дату прибытия
							с учётом времени в пути
						</li>
						<li>
							<strong>Дедлайны:</strong> Узнайте, когда нужно
							начать работу для соблюдения сроков
						</li>
						<li>
							<strong>Встречи:</strong> Планируйте встречи с
							учётом времени подготовки
						</li>
						<li>
							<strong>Праздники:</strong> Рассчитайте даты
							празднования с учётом выходных
						</li>
					</ul>
				</div>
			</section>

			{/* FAQ */}
			<section>
				<h2 className='text-2xl font-bold text-gray-900 mb-6'>
					Часто задаваемые вопросы
				</h2>
				<div className='space-y-4'>
					{faqData.map((faq, index) => (
						<div
							key={index}
							className='bg-white border border-gray-200 rounded-lg p-6'
						>
							<h3 className='text-lg font-semibold text-gray-900 mb-2'>
								{faq.q}
							</h3>
							<p className='text-gray-600'>{faq.a}</p>
						</div>
					))}
				</div>
			</section>

			{/* Structured Data */}
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'FAQPage',
						mainEntity: faqData.map((faq) => ({
							'@type': 'Question',
							name: faq.q,
							acceptedAnswer: {
								'@type': 'Answer',
								text: faq.a,
							},
						})),
					}),
				}}
			/>
		</div>
	);
}
