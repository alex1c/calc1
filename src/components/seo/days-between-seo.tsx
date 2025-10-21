'use client';

import { useTranslations } from 'next-intl';

export default function DaysBetweenSEO() {
	const t = useTranslations('calculators.daysBetween');

	const faqData = [
		{
			q: 'Как посчитать количество дней между двумя датами?',
			a: 'Введите начальную и конечную дату — результат появится автоматически.',
		},
		{
			q: 'Учитывает ли калькулятор високосные годы?',
			a: 'Да, все годы с 29 февраля учитываются корректно.',
		},
		{
			q: 'Можно ли узнать количество недель между датами?',
			a: 'Да, результат отображается и в неделях, и в днях.',
		},
		{
			q: 'Как рассчитать количество месяцев?',
			a: 'Калькулятор также показывает эквивалент в месяцах и годах.',
		},
		{
			q: 'Можно ли включить текущую дату?',
			a: 'Да, можно выбрать "сегодня" как одну из дат.',
		},
		{
			q: 'Есть ли ограничение по диапазону дат?',
			a: 'Нет, можно считать периоды даже в несколько десятков лет.',
		},
		{
			q: 'Работает ли калькулятор без интернета?',
			a: 'Нет, требуется подключение для обновления данных.',
		},
		{
			q: 'Подходит ли для расчёта возраста?',
			a: 'Да, можно использовать его для определения возраста человека.',
		},
		{
			q: 'Как рассчитать дни до отпуска или праздника?',
			a: 'Укажите сегодняшнюю дату и дату события — получите результат.',
		},
		{
			q: 'Можно ли использовать разные форматы даты?',
			a: 'Да, поддерживаются стандартные форматы (ДД.ММ.ГГГГ, YYYY-MM-DD и др.).',
		},
		{
			q: 'Могу ли я сохранить результат?',
			a: 'Да, результат можно скопировать или поделиться ссылкой.',
		},
	];

	return (
		<div className='space-y-8'>
			{/* Overview */}
			<section>
				<h2 className='text-2xl font-bold text-gray-900 mb-4'>
					О калькуляторе разницы между датами
				</h2>
				<div className='prose prose-lg text-gray-600'>
					<p>
						Онлайн-калькулятор разницы между датами — это удобный
						инструмент для точного расчёта временных интервалов.
						Просто введите начальную и конечную дату, и получите
						детальную информацию о разнице в днях, неделях, месяцах
						и годах.
					</p>
					<p>
						Калькулятор учитывает високосные годы, различные месяцы
						и корректно обрабатывает переходы между годами. Идеально
						подходит для планирования проектов, расчёта отпусков,
						определения сроков и многих других задач.
					</p>
				</div>
			</section>

			{/* How it works */}
			<section>
				<h2 className='text-2xl font-bold text-gray-900 mb-4'>
					Как рассчитывается разница между датами
				</h2>
				<div className='prose prose-lg text-gray-600'>
					<p>
						Калькулятор использует точные математические алгоритмы
						для расчёта разницы между датами:
					</p>
					<ul>
						<li>
							<strong>Общее количество дней:</strong> Прямой
							расчёт разности в миллисекундах
						</li>
						<li>
							<strong>Недели:</strong> Деление общего количества
							дней на 7
						</li>
						<li>
							<strong>Месяцы и годы:</strong> Учёт календарных
							особенностей каждого месяца
						</li>
						<li>
							<strong>Високосные годы:</strong> Автоматическое
							определение и учёт 29 февраля
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
					<div className='bg-blue-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-blue-900 mb-2'>
							Точность расчётов
						</h3>
						<p className='text-blue-800'>
							Учитывает все календарные особенности, включая
							високосные годы и разную длительность месяцев.
						</p>
					</div>
					<div className='bg-green-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-green-900 mb-2'>
							Простота использования
						</h3>
						<p className='text-green-800'>
							Интуитивно понятный интерфейс — просто выберите даты
							и получите результат.
						</p>
					</div>
					<div className='bg-purple-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-purple-900 mb-2'>
							Детальная информация
						</h3>
						<p className='text-purple-800'>
							Получайте разницу в днях, неделях, месяцах и годах
							одновременно.
						</p>
					</div>
					<div className='bg-orange-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-orange-900 mb-2'>
							Быстрые расчёты
						</h3>
						<p className='text-orange-800'>
							Мгновенные результаты без ожидания — идеально для
							срочных задач.
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
							<strong>Планирование отпуска:</strong> Рассчитайте
							точное количество дней до отпуска
						</li>
						<li>
							<strong>Проектные сроки:</strong> Определите
							длительность проекта в днях и неделях
						</li>
						<li>
							<strong>Праздники:</strong> Узнайте, сколько дней
							осталось до важного события
						</li>
						<li>
							<strong>Возраст:</strong> Используйте для точного
							расчёта возраста в днях
						</li>
						<li>
							<strong>Документооборот:</strong> Рассчитайте сроки
							выполнения документов
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
