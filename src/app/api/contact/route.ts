import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

/**
 * API endpoint for contact form submission
 * Sends email to calc1.ru@yandex.ru using Yandex SMTP
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

		// Prepare email content
		const subject = `Обратная связь с Calc1.ru от ${name}`;
		const emailBody = `
Новое сообщение с формы обратной связи Calc1.ru

Имя: ${name}
Email: ${email}

Сообщение:
${message}

---
Это сообщение было отправлено автоматически с сайта calc1.ru
`;

		// Check if email configuration is available
		const yandexEmail = process.env.YANDEX_EMAIL;
		const yandexPassword = process.env.YANDEX_PASSWORD;

		if (!yandexEmail || !yandexPassword) {
			console.error(
				'Email configuration is missing. YANDEX_EMAIL and YANDEX_PASSWORD must be set.'
			);
			return NextResponse.json(
				{
					error:
						'Конфигурация почты не настроена. Обратитесь к администратору.',
				},
				{ status: 500 }
			);
		}

		// Create transporter for Yandex SMTP
		const transporter = nodemailer.createTransport({
			host: 'smtp.yandex.ru',
			port: 465,
			secure: true, // true for 465, false for other ports
			auth: {
				user: yandexEmail,
				pass: yandexPassword,
			},
			connectionTimeout: 10000, // 10 seconds timeout for connection
			greetingTimeout: 10000, // 10 seconds timeout for greeting
			socketTimeout: 10000, // 10 seconds timeout for socket
		});

		// Verify transporter configuration
		try {
			await transporter.verify();
		} catch (verifyError) {
			console.error('SMTP verification failed:', verifyError);
			return NextResponse.json(
				{
					error:
						'Ошибка подключения к почтовому серверу. Проверьте настройки.',
				},
				{ status: 500 }
			);
		}

		// Send email with timeout
		const sendPromise = transporter.sendMail({
			from: yandexEmail,
			to: 'calc1.ru@yandex.ru',
			subject,
			text: emailBody,
			replyTo: email, // Allow replying directly to the sender
		});

		// Add timeout wrapper
		const timeoutPromise = new Promise((_, reject) => {
			setTimeout(() => {
				reject(new Error('Email sending timeout'));
			}, 30000); // 30 seconds timeout
		});

		await Promise.race([sendPromise, timeoutPromise]);

		return NextResponse.json(
			{
				message:
					'Ваше сообщение успешно отправлено. Мы ответим вам в ближайшее время.',
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error('Contact form error:', error);
		
		// Provide more detailed error message
		let errorMessage = 'Произошла ошибка при отправке сообщения';
		
		if (error instanceof Error) {
			if (error.message.includes('timeout')) {
				errorMessage = 'Превышено время ожидания отправки. Попробуйте позже.';
			} else if (error.message.includes('authentication')) {
				errorMessage = 'Ошибка аутентификации. Проверьте настройки почты.';
			} else if (error.message.includes('connection')) {
				errorMessage = 'Ошибка подключения к почтовому серверу.';
			}
			console.error('Error details:', error.message);
		}
		
		return NextResponse.json(
			{ error: errorMessage },
			{ status: 500 }
		);
	}
}
