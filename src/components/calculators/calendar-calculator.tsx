'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import {
	Calendar as CalendarIcon,
	Plus,
	Edit3,
	Trash2,
	ChevronLeft,
	ChevronRight,
	Download,
	Save,
	X,
} from 'lucide-react';
import {
	generateCalendar,
	addEvent,
	removeEvent,
	updateEvent,
	exportToICal,
	getCurrentDate,
	CalendarEvent,
	CalendarMonth,
} from '@/lib/calculators/calendar';

export default function CalendarCalculator() {
	const t = useTranslations('calculators.calendar');
	const [currentDate, setCurrentDate] = useState(new Date());
	const [events, setEvents] = useState<CalendarEvent[]>([]);
	const [selectedDate, setSelectedDate] = useState<string | null>(null);
	const [showEventModal, setShowEventModal] = useState(false);
	const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(
		null
	);
	const [newEvent, setNewEvent] = useState({
		title: '',
		description: '',
		color: '#3B82F6',
	});
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
		// Load events from localStorage
		const savedEvents = localStorage.getItem('calendar-events');
		if (savedEvents) {
			setEvents(JSON.parse(savedEvents));
		}
	}, []);

	useEffect(() => {
		// Save events to localStorage
		localStorage.setItem('calendar-events', JSON.stringify(events));
	}, [events]);

	const calendar = generateCalendar(
		currentDate.getFullYear(),
		currentDate.getMonth(),
		events,
		'ru'
	);

	const handlePreviousMonth = () => {
		setCurrentDate(
			new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
		);
	};

	const handleNextMonth = () => {
		setCurrentDate(
			new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
		);
	};

	const handleDateClick = (date: string) => {
		setSelectedDate(date);
		setShowEventModal(true);
		setEditingEvent(null);
		setNewEvent({ title: '', description: '', color: '#3B82F6' });
	};

	const handleAddEvent = () => {
		if (!selectedDate || !newEvent.title.trim()) return;

		const event: CalendarEvent = {
			id: Date.now().toString(),
			title: newEvent.title,
			date: selectedDate,
			description: newEvent.description,
			color: newEvent.color,
		};

		setEvents(
			addEvent(
				events,
				event.title,
				event.date,
				event.description,
				event.color
			)
		);
		setShowEventModal(false);
		setSelectedDate(null);
		setNewEvent({ title: '', description: '', color: '#3B82F6' });
	};

	const handleEditEvent = (event: CalendarEvent) => {
		setEditingEvent(event);
		setNewEvent({
			title: event.title,
			description: event.description || '',
			color: event.color || '#3B82F6',
		});
		setShowEventModal(true);
	};

	const handleUpdateEvent = () => {
		if (!editingEvent || !newEvent.title.trim()) return;

		setEvents(
			updateEvent(events, editingEvent.id, {
				title: newEvent.title,
				description: newEvent.description,
				color: newEvent.color,
			})
		);

		setShowEventModal(false);
		setEditingEvent(null);
		setNewEvent({ title: '', description: '', color: '#3B82F6' });
	};

	const handleDeleteEvent = (eventId: string) => {
		setEvents(removeEvent(events, eventId));
	};

	const handleExportCalendar = () => {
		const icalData = exportToICal(events);
		const blob = new Blob([icalData], { type: 'text/calendar' });
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.download = `calendar-${getCurrentDate()}.ics`;
		link.click();
		URL.revokeObjectURL(url);
	};

	const getEventColor = (color: string) => {
		return color || '#3B82F6';
	};

	// Show loading state during hydration
	if (!isMounted) {
		return (
			<div className='bg-white rounded-lg shadow-lg p-6'>
				<div className='text-center mb-8'>
					<div className='inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4'>
						<CalendarIcon className='h-8 w-8 text-blue-600' />
					</div>
					<h2 className='text-2xl font-bold text-gray-900 mb-2'>
						{t('title')}
					</h2>
					<p className='text-gray-600'>{t('description')}</p>
				</div>
				<div className='flex items-center justify-center py-12'>
					<div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
				</div>
			</div>
		);
	}

	return (
		<div className='bg-white rounded-lg shadow-lg p-6'>
			{/* Header */}
			<div className='text-center mb-8'>
				<div className='inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4'>
					<CalendarIcon className='h-8 w-8 text-blue-600' />
				</div>
				<h2 className='text-2xl font-bold text-gray-900 mb-2'>
					{t('title')}
				</h2>
				<p className='text-gray-600'>{t('description')}</p>
			</div>

			{/* Calendar Navigation */}
			<div className='flex items-center justify-between mb-6'>
				<button
					onClick={handlePreviousMonth}
					className='p-2 hover:bg-gray-100 rounded-lg transition-colors'
				>
					<ChevronLeft className='h-5 w-5' />
				</button>
				<h3 className='text-xl font-semibold text-gray-900'>
					{calendar.monthName} {calendar.year}
				</h3>
				<button
					onClick={handleNextMonth}
					className='p-2 hover:bg-gray-100 rounded-lg transition-colors'
				>
					<ChevronRight className='h-5 w-5' />
				</button>
			</div>

			{/* Calendar Grid */}
			<div className='grid grid-cols-7 gap-1 mb-6'>
				{/* Weekday headers */}
				{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(
					(day) => (
						<div
							key={day}
							className='p-2 text-center text-sm font-medium text-gray-500'
						>
							{day}
						</div>
					)
				)}

				{/* Calendar days */}
				{calendar.days.map((day, index) => (
					<div
						key={index}
						className={`
							min-h-[80px] p-1 border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors
							${!day.isCurrentMonth ? 'bg-gray-50 text-gray-400' : ''}
							${day.isToday ? 'bg-blue-100 border-blue-300' : ''}
							${day.isWeekend ? 'bg-red-50' : ''}
							${day.isHoliday ? 'bg-red-100' : ''}
						`}
						onClick={() =>
							handleDateClick(
								day.date.toISOString().split('T')[0]
							)
						}
					>
						<div className='text-sm font-medium mb-1'>
							{day.day}
						</div>
						{day.events.map((event) => (
							<div
								key={event.id}
								className='text-xs p-1 mb-1 rounded truncate'
								style={{
									backgroundColor:
										getEventColor(event.color) + '20',
									color: getEventColor(event.color),
								}}
								onClick={(e) => {
									e.stopPropagation();
									handleEditEvent(event);
								}}
							>
								{event.title}
							</div>
						))}
					</div>
				))}
			</div>

			{/* Action Buttons */}
			<div className='flex flex-wrap gap-2 justify-center'>
				<button
					onClick={handleExportCalendar}
					className='flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors'
				>
					<Download className='h-4 w-4 mr-2' />
					{t('form.export')}
				</button>
			</div>

			{/* Event Modal */}
			{showEventModal && (
				<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
					<div className='bg-white rounded-lg p-6 w-full max-w-md mx-4'>
						<div className='flex items-center justify-between mb-4'>
							<h3 className='text-lg font-semibold'>
								{editingEvent
									? t('form.editEvent')
									: t('form.addEvent')}
							</h3>
							<button
								onClick={() => setShowEventModal(false)}
								className='text-gray-400 hover:text-gray-600'
							>
								<X className='h-5 w-5' />
							</button>
						</div>

						<div className='space-y-4'>
							<div>
								<label className='block text-sm font-medium text-gray-700 mb-1'>
									{t('form.eventTitle')}
								</label>
								<input
									type='text'
									value={newEvent.title}
									onChange={(e) =>
										setNewEvent({
											...newEvent,
											title: e.target.value,
										})
									}
									className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
									placeholder={t(
										'form.eventTitlePlaceholder'
									)}
								/>
							</div>

							<div>
								<label className='block text-sm font-medium text-gray-700 mb-1'>
									{t('form.eventDescription')}
								</label>
								<textarea
									value={newEvent.description}
									onChange={(e) =>
										setNewEvent({
											...newEvent,
											description: e.target.value,
										})
									}
									className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
									rows={3}
									placeholder={t(
										'form.eventDescriptionPlaceholder'
									)}
								/>
							</div>

							<div>
								<label className='block text-sm font-medium text-gray-700 mb-1'>
									{t('form.eventColor')}
								</label>
								<input
									type='color'
									value={newEvent.color}
									onChange={(e) =>
										setNewEvent({
											...newEvent,
											color: e.target.value,
										})
									}
									className='w-full h-10 border border-gray-300 rounded-lg'
								/>
							</div>
						</div>

						<div className='flex gap-2 mt-6'>
							<button
								onClick={
									editingEvent
										? handleUpdateEvent
										: handleAddEvent
								}
								className='flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center'
							>
								<Save className='h-4 w-4 mr-2' />
								{editingEvent
									? t('form.update')
									: t('form.add')}
							</button>
							{editingEvent && (
								<button
									onClick={() => {
										handleDeleteEvent(editingEvent.id);
										setShowEventModal(false);
									}}
									className='px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center'
								>
									<Trash2 className='h-4 w-4' />
								</button>
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
