'use client';

import { useState, FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { Mail, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface ContactFormProps {
	locale: string;
}

export default function ContactForm({ locale }: ContactFormProps) {
	const t = useTranslations('contact.form');
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		message: '',
	});
	const [status, setStatus] = useState<{
		type: 'idle' | 'success' | 'error';
		message: string;
	}>({ type: 'idle', message: '' });
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsSubmitting(true);
		setStatus({ type: 'idle', message: '' });

		try {
			// Create AbortController for timeout
			const controller = new AbortController();
			const timeoutId = setTimeout(() => controller.abort(), 35000); // 35 seconds timeout

			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
				signal: controller.signal,
			});

			clearTimeout(timeoutId);

			// Check if response is ok before parsing JSON
			if (!response.ok) {
				// Try to parse error message
				let errorMessage = 'Произошла ошибка при отправке';
				try {
					const errorData = await response.json();
					errorMessage = errorData.error || errorMessage;
				} catch {
					// If JSON parsing fails, use status text
					errorMessage = response.statusText || errorMessage;
				}

				setStatus({
					type: 'error',
					message: errorMessage,
				});
				return;
			}

			// Parse successful response
			const data = await response.json();

			setStatus({
				type: 'success',
				message: data.message || 'Сообщение успешно отправлено',
			});
			setFormData({ name: '', email: '', message: '' });
		} catch (error) {
			// Handle different types of errors
			let errorMessage = 'Произошла ошибка при отправке сообщения';

			if (error instanceof Error) {
				if (error.name === 'AbortError') {
					errorMessage = 'Превышено время ожидания. Проверьте подключение к интернету и попробуйте снова.';
				} else if (error.message.includes('Failed to fetch')) {
					errorMessage = 'Не удалось подключиться к серверу. Проверьте подключение к интернету.';
				} else {
					errorMessage = error.message || errorMessage;
				}
			}

			setStatus({
				type: 'error',
				message: errorMessage,
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<form onSubmit={handleSubmit} className='space-y-4'>
			<div>
				<label
					htmlFor='name'
					className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'
				>
					{t('name')}
				</label>
				<input
					type='text'
					id='name'
					name='name'
					value={formData.name}
					onChange={handleChange}
					required
					className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent'
				/>
			</div>
			<div>
				<label
					htmlFor='email'
					className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'
				>
					{t('email')}
				</label>
				<input
					type='email'
					id='email'
					name='email'
					value={formData.email}
					onChange={handleChange}
					required
					className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent'
				/>
			</div>
			<div>
				<label
					htmlFor='message'
					className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'
				>
					{t('message')}
				</label>
				<textarea
					id='message'
					name='message'
					rows={6}
					value={formData.message}
					onChange={handleChange}
					required
					className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent'
				/>
			</div>

			{/* Status messages */}
			{status.type === 'success' && (
				<div className='flex items-center space-x-2 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg'>
					<CheckCircle className='h-5 w-5 text-green-600 dark:text-green-400' />
					<p className='text-green-700 dark:text-green-300 text-sm'>
						{status.message}
					</p>
				</div>
			)}

			{status.type === 'error' && (
				<div className='flex items-center space-x-2 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg'>
					<AlertCircle className='h-5 w-5 text-red-600 dark:text-red-400' />
					<p className='text-red-700 dark:text-red-300 text-sm'>
						{status.message}
					</p>
				</div>
			)}

			<button
				type='submit'
				disabled={isSubmitting}
				className='w-full md:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors flex items-center justify-center space-x-2'
			>
				{isSubmitting ? (
					<>
						<Loader2 className='h-5 w-5 animate-spin' />
						<span>{t('sending')}</span>
					</>
				) : (
					<span>{t('submit')}</span>
				)}
			</button>
		</form>
	);
}

