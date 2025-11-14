import { NextRequest, NextResponse } from 'next/server';

/**
 * API endpoint for contact form submission
 * Sends notification via Telegram Bot API
 */
export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { name, email, message } = body;

		// Validate input
		if (!name || !email || !message) {
			return NextResponse.json(
				{ error: 'Все поля обязательны для заполнения' },
				{ status: 400 }
			);
		}

		// Email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return NextResponse.json(
				{ error: 'Некорректный адрес электронной почты' },
				{ status: 400 }
			);
		}

		// Check Telegram configuration
		const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
		const telegramChatId = process.env.TELEGRAM_CHAT_ID;

		if (!telegramBotToken || !telegramChatId) {
			console.error(
				'Telegram configuration is missing. TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID must be set.'
			);
			return NextResponse.json(
				{
					error: 'Конфигурация Telegram не настроена. Обратитесь к администратору.',
				},
				{ status: 500 }
			);
		}

		// Prepare Telegram message
		const telegramMessage = `📧 *Новое сообщение с формы обратной связи Calc1.ru*

👤 *Имя:* ${name}
📮 *Email:* ${email}

💬 *Сообщение:*
${message}

---
_Отправлено автоматически с сайта calc1.ru_`;

		// Send message via Telegram Bot API
		const telegramApiUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;

		const response = await fetch(telegramApiUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				chat_id: telegramChatId,
				text: telegramMessage,
				parse_mode: 'Markdown',
			}),
		});

		const responseData = await response.json();

		if (!response.ok || !responseData.ok) {
			console.error('Telegram API error:', responseData);
			return NextResponse.json(
				{
					error: 'Ошибка отправки сообщения в Telegram. Попробуйте позже.',
				},
				{ status: 500 }
			);
		}

		console.log('Message sent successfully to Telegram');

		return NextResponse.json(
			{
				message:
					'Ваше сообщение успешно отправлено. Мы ответим вам в ближайшее время.',
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error('Contact form error:', error);

		let errorMessage = 'Произошла ошибка при отправке сообщения';

		if (error instanceof Error) {
			if (error.message.includes('timeout')) {
				errorMessage =
					'Превышено время ожидания отправки. Попробуйте позже.';
			} else if (error.message.includes('fetch')) {
				errorMessage =
					'Ошибка подключения к серверу Telegram. Попробуйте позже.';
			}

			console.error('Error details:', error.message);
		}

		return NextResponse.json({ error: errorMessage }, { status: 500 });
	}
}
