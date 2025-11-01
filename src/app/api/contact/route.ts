import { NextRequest, NextResponse } from 'next/server';

/**
 * API endpoint for contact form submission
 * Sends email to calc1.ru@yandex.ru
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

		// Send email to calc1.ru@yandex.ru
		// Note: In production, implement actual email sending using:
		// - Nodemailer with SMTP
		// - SendGrid
		// - AWS SES
		// - Resend
		// - Mailgun
		
		// For now, log the email (replace with actual sending in production)
		console.log('Contact form submission:', {
			to: 'calc1.ru@yandex.ru',
			subject,
			body: emailBody,
		});

		// TODO: Replace with actual email sending
		// Example with Nodemailer (install: npm install nodemailer):
		// const nodemailer = require('nodemailer');
		// const transporter = nodemailer.createTransport({
		//   host: 'smtp.yandex.ru',
		//   port: 465,
		//   secure: true,
		//   auth: {
		//     user: process.env.YANDEX_EMAIL,
		//     pass: process.env.YANDEX_PASSWORD,
		//   },
		// });
		// await transporter.sendMail({
		//   from: process.env.YANDEX_EMAIL,
		//   to: 'calc1.ru@yandex.ru',
		//   subject,
		//   text: emailBody,
		// });

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
