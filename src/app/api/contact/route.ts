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
		});

		// Send email
		await transporter.sendMail({
			from: yandexEmail,
			to: 'calc1.ru@yandex.ru',
			subject,
			text: emailBody,
			replyTo: email, // Allow replying directly to the sender
		});

		return NextResponse.json(
			{
				message:
					'Ваше сообщение успешно отправлено. Мы ответим вам в ближайшее время.',
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error('Contact form error:', error);
		return NextResponse.json(
			{ error: 'Произошла ошибка при отправке сообщения' },
			{ status: 500 }
		);
	}
}
