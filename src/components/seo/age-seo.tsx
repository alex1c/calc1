'use client';

import { useTranslations } from 'next-intl';

export default function AgeSEO() {
	const t = useTranslations('calculators.age');

	const faqData = [
		{
			q: 'Как посчитать возраст онлайн?',
			a: 'Введите дату рождения — результат появится сразу.',
		},
		{
			q: 'Можно ли узнать возраст на будущее число?',
			a: 'Да, выберите любую конечную дату.',
		},
		{
			q: 'Показывает ли калькулятор возраст в месяцах и днях?',
			a: 'Да, результат включает годы, месяцы и дни.',
		},
		{
			q: 'Можно ли использовать для питомцев или событий?',
			a: 'Да, калькулятор универсальный.',
		},
		{
			q: 'Как определить, сколько лет было на конкретную дату?',
			a: 'Введите дату рождения и дату, на которую нужно вычислить возраст.',
		},
		{
			q: 'Учитывает ли високосные годы?',
			a: 'Да, алгоритм полностью корректен с календарём Григорианского типа.',
		},
		{
			q: 'Можно ли рассчитать разницу между двумя людьми?',
			a: 'Да, можно сравнить две даты рождения.',
		},
		{
			q: 'Подходит ли калькулятор для юридических целей?',
			a: 'Да, результат точен до дня.',
		},
		{
			q: 'В каком формате вводить дату?',
			a: 'Поддерживаются все популярные форматы, включая ISO и европейский.',
		},
		{
			q: 'Можно ли использовать калькулятор офлайн?',
			a: 'Нет, требуется подключение к интернету.',
		},
		{
			q: 'Есть ли ограничение по годам?',
			a: 'Нет, можно вводить любые годы, включая будущие.',
		},
	];

	return (
		<div className='space-y-8'>
			{/* Overview */}
			<section>
				<h2 className='text-2xl font-bold text-gray-900 mb-4'>
					О калькуляторе возраста
				</h2>
				<div className='prose prose-lg text-gray-600'>
					<p>
						Онлайн-калькулятор возраста — это точный инструмент для
						определения возраста в годах, месяцах и днях. Просто
						введите дату рождения и дату, на которую нужно
						рассчитать возраст, и получите детальную информацию о
						прожитом времени.
					</p>
					<p>
						Калькулятор учитывает високосные годы, различные месяцы
						и корректно обрабатывает все календарные особенности.
						Подходит для людей, питомцев, событий и любых других
						объектов с известной датой начала.
					</p>
				</div>
			</section>

			{/* How it works */}
			<section>
				<h2 className='text-2xl font-bold text-gray-900 mb-4'>
					Как рассчитывается возраст
				</h2>
				<div className='prose prose-lg text-gray-600'>
					<p>
						Калькулятор использует точные математические алгоритмы
						для расчёта возраста:
					</p>
					<ul>
						<li>
							<strong>Годы:</strong> Разность между годами с
							учётом месяцев и дней
						</li>
						<li>
							<strong>Месяцы:</strong> Остаток месяцев после
							вычитания полных лет
						</li>
						<li>
							<strong>Дни:</strong> Остаток дней после вычитания
							полных месяцев
						</li>
						<li>
							<strong>Високосные годы:</strong> Автоматический
							учёт 29 февраля
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
					<div className='bg-purple-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-purple-900 mb-2'>
							Точность расчётов
						</h3>
						<p className='text-purple-800'>
							Учитывает все календарные особенности, включая
							високосные годы и разную длительность месяцев.
						</p>
					</div>
					<div className='bg-blue-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-blue-900 mb-2'>
							Универсальность
						</h3>
						<p className='text-blue-800'>
							Подходит для людей, животных, событий и любых
							объектов с известной датой начала.
						</p>
					</div>
					<div className='bg-green-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-green-900 mb-2'>
							Детальная информация
						</h3>
						<p className='text-green-800'>
							Показывает возраст в годах, месяцах, днях и общее
							количество дней.
						</p>
					</div>
					<div className='bg-orange-50 p-6 rounded-lg'>
						<h3 className='text-lg font-semibold text-orange-900 mb-2'>
							Гибкость дат
						</h3>
						<p className='text-orange-800'>
							Можно рассчитать возраст на любую дату, включая
							будущие даты.
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
							<strong>Поздравления:</strong> Узнайте точный
							возраст для персональных поздравлений
						</li>
						<li>
							<strong>Документы:</strong> Рассчитайте возраст для
							официальных документов
						</li>
						<li>
							<strong>Питомцы:</strong> Определите возраст
							домашних животных
						</li>
						<li>
							<strong>События:</strong> Рассчитайте, сколько лет
							прошло с важного события
						</li>
						<li>
							<strong>Планирование:</strong> Узнайте возраст на
							будущую дату для планирования
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
