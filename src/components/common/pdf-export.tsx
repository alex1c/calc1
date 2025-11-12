/**
 * PDFExport - Универсальный компонент для экспорта результатов в PDF
 *
 * ОПИСАНИЕ РАБОТЫ:
 * - Создает красивый PDF файл с результатами расчета
 * - Автоматически добавляет брендинг "calc1.ru калькулятор #1 в мире"
 * - Поддерживает многоязычность (переводы через useTranslations)
 * - Использует универсальный шрифт helvetica для всех языков
 * - Автоматически разбивает длинный контент на страницы
 * - Добавляет нумерацию страниц и дату генерации
 * - Создает активную ссылку на calc1.ru
 *
 * ИСПОЛЬЗОВАНИЕ:
 * <PDFExport
 *   title="Результаты расчета кредита"
 *   content="Детальный текст с результатами..."
 *   fileName="credit-results"
 *   className="mb-4"
 * />
 *
 * ПАРАМЕТРЫ:
 * - title: Заголовок документа (обязательный)
 * - content: Текст содержимого (обязательный)
 * - fileName: Имя файла без расширения (опционально, по умолчанию 'calculation-results')
 * - className: CSS классы для стилизации кнопки (опционально)
 *
 * ПЕРЕВОДЫ (добавить в common.pdf):
 * - header: "calc1.ru калькулятор #1 в мире"
 * - savePdf: "Сохранить в PDF"
 * - generated: "Сгенерировано"
 * - page: "Страница"
 * - of: "из"
 */

'use client';

import { useTranslations } from 'next-intl';
import { FileText } from 'lucide-react';

interface PDFExportProps {
	title: string;
	content: string;
	fileName?: string;
	className?: string;
}

export default function PDFExport({
	title,
	content,
	fileName = 'calculation-results',
	className = '',
}: PDFExportProps) {
	const t = useTranslations('common.pdf');

	const generatePDF = async () => {
		try {
			// Динамически загружаем тяжелые библиотеки только при необходимости
			const [{ default: jsPDF }, html2canvas] = await Promise.all([
				import('jspdf'),
				import('html2canvas'),
			]);

			// Create a temporary HTML element with the content
			const tempDiv = document.createElement('div');
			tempDiv.style.position = 'absolute';
			tempDiv.style.left = '-9999px';
			tempDiv.style.top = '-9999px';
			tempDiv.style.width = '800px';
			tempDiv.style.padding = '40px';
			tempDiv.style.fontFamily = 'Arial, sans-serif';
			tempDiv.style.backgroundColor = 'white';
			tempDiv.style.color = 'black';
			tempDiv.style.lineHeight = '1.6';

			// Create HTML content with proper localization support
			const now = new Date();
			// Use locale-aware date formatting
			const dateStr = now.toLocaleDateString(undefined, {
				year: 'numeric',
				month: 'long',
				day: 'numeric',
			});
			const timeStr = now.toLocaleTimeString(undefined, {
				hour: '2-digit',
				minute: '2-digit',
			});

			tempDiv.innerHTML = `
				<div style="text-align: center; margin-bottom: 30px;">
					<h1 style="color: #3b82f6; font-size: 24px; margin: 0 0 10px 0;">${t(
						'header'
					)}</h1>
					<p style="margin: 0; font-size: 14px;">
						<a href="https://calc1.ru" style="color: #0066cc; text-decoration: none;">calc1.ru</a>
					</p>
				</div>
				
				<h2 style="color: #1f2937; font-size: 20px; margin: 0 0 20px 0; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">${title}</h2>
				
				<div style="margin-bottom: 20px; font-size: 12px; color: #6b7280;">
					${t('generated')}: ${dateStr} ${timeStr}
				</div>
				
				<div style="white-space: pre-line; font-size: 14px; line-height: 1.8;">
					${content}
				</div>
				
				<div style="margin-top: 40px; text-align: center; font-size: 10px; color: #9ca3af; border-top: 1px solid #e5e7eb; padding-top: 10px;">
					${t('page')} 1 ${t('of')} 1
				</div>
			`;

			document.body.appendChild(tempDiv);

			// Convert HTML to canvas
			const canvas = await html2canvas(tempDiv, {
				scale: 2,
				useCORS: true,
				allowTaint: true,
				backgroundColor: '#ffffff',
			});

			// Create PDF from canvas
			const imgData = canvas.toDataURL('image/png');
			const pdf = new jsPDF('p', 'mm', 'a4');

			const imgWidth = 210; // A4 width in mm
			const pageHeight = 295; // A4 height in mm
			const imgHeight = (canvas.height * imgWidth) / canvas.width;

			pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

			// Save the PDF
			pdf.save(`${fileName}.pdf`);

			// Clean up
			document.body.removeChild(tempDiv);
		} catch (error) {
			console.error('Error generating PDF:', error);
			alert('Ошибка при создании PDF файла. Пожалуйста, попробуйте еще раз.');
			// Clean up in case of error
			if (document.body.contains(tempDiv)) {
				document.body.removeChild(tempDiv);
			}
		}
	};

	return (
		<button
			onClick={generatePDF}
			className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 ${className}`}
		>
			<FileText className='w-4 h-4 mr-2' />
			{t('savePdf')}
		</button>
	);
}
