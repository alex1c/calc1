// World Time utility functions

export interface WorldTimeCity {
	id: string;
	name: string;
	country: string;
	timezone: string;
	offset: number; // UTC offset in minutes
	countryCode: string;
	region?: string;
	coordinates?: {
		lat: number;
		lng: number;
	};
}

export interface WorldTimeDisplay {
	city: WorldTimeCity;
	currentTime: Date;
	formattedTime: string;
	formattedDate: string;
	dayOfWeek: string;
	isDST: boolean; // Daylight Saving Time
	utcOffset: string;
}

export interface WorldTimeSettings {
	selectedCities: WorldTimeCity[];
	showSeconds: boolean;
	showDate: boolean;
	showDayOfWeek: boolean;
	showDST: boolean;
	timeFormat: '12h' | '24h';
	dateFormat: 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'YYYY-MM-DD';
}

export function getPopularCities(): WorldTimeCity[] {
	return [
		{
			id: 'moscow',
			name: 'Москва',
			country: 'Россия',
			timezone: 'Europe/Moscow',
			offset: 180, // UTC+3
			countryCode: 'RU',
			coordinates: { lat: 55.7558, lng: 37.6176 },
		},
		{
			id: 'london',
			name: 'Лондон',
			country: 'Великобритания',
			timezone: 'Europe/London',
			offset: 0, // UTC+0 (varies with DST)
			countryCode: 'GB',
			coordinates: { lat: 51.5074, lng: -0.1278 },
		},
		{
			id: 'new-york',
			name: 'Нью-Йорк',
			country: 'США',
			timezone: 'America/New_York',
			offset: -300, // UTC-5 (varies with DST)
			countryCode: 'US',
			coordinates: { lat: 40.7128, lng: -74.006 },
		},
		{
			id: 'tokyo',
			name: 'Токио',
			country: 'Япония',
			timezone: 'Asia/Tokyo',
			offset: 540, // UTC+9
			countryCode: 'JP',
			coordinates: { lat: 35.6762, lng: 139.6503 },
		},
		{
			id: 'sydney',
			name: 'Сидней',
			country: 'Австралия',
			timezone: 'Australia/Sydney',
			offset: 600, // UTC+10 (varies with DST)
			countryCode: 'AU',
			coordinates: { lat: -33.8688, lng: 151.2093 },
		},
		{
			id: 'paris',
			name: 'Париж',
			country: 'Франция',
			timezone: 'Europe/Paris',
			offset: 60, // UTC+1 (varies with DST)
			countryCode: 'FR',
			coordinates: { lat: 48.8566, lng: 2.3522 },
		},
		{
			id: 'berlin',
			name: 'Берлин',
			country: 'Германия',
			timezone: 'Europe/Berlin',
			offset: 60, // UTC+1 (varies with DST)
			countryCode: 'DE',
			coordinates: { lat: 52.52, lng: 13.405 },
		},
		{
			id: 'beijing',
			name: 'Пекин',
			country: 'Китай',
			timezone: 'Asia/Shanghai',
			offset: 480, // UTC+8
			countryCode: 'CN',
			coordinates: { lat: 39.9042, lng: 116.4074 },
		},
		{
			id: 'dubai',
			name: 'Дубай',
			country: 'ОАЭ',
			timezone: 'Asia/Dubai',
			offset: 240, // UTC+4
			countryCode: 'AE',
			coordinates: { lat: 25.2048, lng: 55.2708 },
		},
		{
			id: 'los-angeles',
			name: 'Лос-Анджелес',
			country: 'США',
			timezone: 'America/Los_Angeles',
			offset: -480, // UTC-8 (varies with DST)
			countryCode: 'US',
			coordinates: { lat: 34.0522, lng: -118.2437 },
		},
	];
}

export function getAllCities(): WorldTimeCity[] {
	// This would typically come from a comprehensive database
	// For now, we'll return a subset of major cities
	return [
		...getPopularCities(),
		{
			id: 'singapore',
			name: 'Сингапур',
			country: 'Сингапур',
			timezone: 'Asia/Singapore',
			offset: 480, // UTC+8
			countryCode: 'SG',
			coordinates: { lat: 1.3521, lng: 103.8198 },
		},
		{
			id: 'mumbai',
			name: 'Мумбаи',
			country: 'Индия',
			timezone: 'Asia/Kolkata',
			offset: 330, // UTC+5:30
			countryCode: 'IN',
			coordinates: { lat: 19.076, lng: 72.8777 },
		},
		{
			id: 'rio-de-janeiro',
			name: 'Рио-де-Жанейро',
			country: 'Бразилия',
			timezone: 'America/Sao_Paulo',
			offset: -180, // UTC-3
			countryCode: 'BR',
			coordinates: { lat: -22.9068, lng: -43.1729 },
		},
		{
			id: 'cape-town',
			name: 'Кейптаун',
			country: 'ЮАР',
			timezone: 'Africa/Johannesburg',
			offset: 120, // UTC+2
			countryCode: 'ZA',
			coordinates: { lat: -33.9249, lng: 18.4241 },
		},
	];
}

export function getCurrentTimeInCity(city: WorldTimeCity): WorldTimeDisplay {
	const now = new Date();

	// Create a date in the city's timezone
	const cityTime = new Date(
		now.toLocaleString('en-US', { timeZone: city.timezone })
	);

	// Check if the city is currently in DST
	const isDST = isDaylightSavingTime(cityTime, city.timezone);

	// Calculate UTC offset
	const utcOffset = getUTCOffset(cityTime, city.timezone);

	return {
		city,
		currentTime: cityTime,
		formattedTime: formatTime(cityTime, '24h'),
		formattedDate: formatDate(cityTime, 'DD/MM/YYYY'),
		dayOfWeek: getDayOfWeek(cityTime),
		isDST,
		utcOffset,
	};
}

export function getCurrentTimeInMultipleCities(
	cities: WorldTimeCity[]
): WorldTimeDisplay[] {
	return cities.map((city) => getCurrentTimeInCity(city));
}

export function formatTime(date: Date, format: '12h' | '24h' = '24h'): string {
	const options: Intl.DateTimeFormatOptions = {
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		hour12: format === '12h',
	};

	return date.toLocaleTimeString('ru-RU', options);
}

export function formatDate(
	date: Date,
	format: 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'YYYY-MM-DD' = 'DD/MM/YYYY'
): string {
	const day = date.getDate().toString().padStart(2, '0');
	const month = (date.getMonth() + 1).toString().padStart(2, '0');
	const year = date.getFullYear();

	switch (format) {
		case 'DD/MM/YYYY':
			return `${day}/${month}/${year}`;
		case 'MM/DD/YYYY':
			return `${month}/${day}/${year}`;
		case 'YYYY-MM-DD':
			return `${year}-${month}-${day}`;
		default:
			return `${day}/${month}/${year}`;
	}
}

export function getDayOfWeek(date: Date): string {
	const days = [
		'Воскресенье',
		'Понедельник',
		'Вторник',
		'Среда',
		'Четверг',
		'Пятница',
		'Суббота',
	];
	return days[date.getDay()];
}

export function isDaylightSavingTime(date: Date, timezone: string): boolean {
	// This is a simplified check - in reality, DST rules are complex
	// and vary by country and year
	try {
		const january = new Date(date.getFullYear(), 0, 1);
		const july = new Date(date.getFullYear(), 6, 1);

		const janOffset = getTimezoneOffset(january, timezone);
		const julOffset = getTimezoneOffset(july, timezone);

		return janOffset !== julOffset;
	} catch {
		return false;
	}
}

export function getUTCOffset(date: Date, timezone: string): string {
	try {
		const offset = getTimezoneOffset(date, timezone);
		const hours = Math.floor(Math.abs(offset) / 60);
		const minutes = Math.abs(offset) % 60;
		const sign = offset >= 0 ? '+' : '-';

		return `UTC${sign}${hours.toString().padStart(2, '0')}:${minutes
			.toString()
			.padStart(2, '0')}`;
	} catch {
		return 'UTC+0';
	}
}

function getTimezoneOffset(date: Date, timezone: string): number {
	try {
		const utcDate = new Date(
			date.toLocaleString('en-US', { timeZone: 'UTC' })
		);
		const localDate = new Date(
			date.toLocaleString('en-US', { timeZone: timezone })
		);
		return (localDate.getTime() - utcDate.getTime()) / (1000 * 60);
	} catch {
		return 0;
	}
}

export function searchCities(
	query: string,
	cities: WorldTimeCity[] = getAllCities()
): WorldTimeCity[] {
	const lowercaseQuery = query.toLowerCase();
	return cities.filter(
		(city) =>
			city.name.toLowerCase().includes(lowercaseQuery) ||
			city.country.toLowerCase().includes(lowercaseQuery) ||
			city.timezone.toLowerCase().includes(lowercaseQuery)
	);
}

export function getCitiesByCountry(
	countryCode: string,
	cities: WorldTimeCity[] = getAllCities()
): WorldTimeCity[] {
	return cities.filter((city) => city.countryCode === countryCode);
}

export function getCitiesByRegion(
	region: string,
	cities: WorldTimeCity[] = getAllCities()
): WorldTimeCity[] {
	return cities.filter((city) => city.region === region);
}

export function compareTimes(
	city1: WorldTimeCity,
	city2: WorldTimeCity
): {
	time1: WorldTimeDisplay;
	time2: WorldTimeDisplay;
	difference: number; // in hours
} {
	const time1 = getCurrentTimeInCity(city1);
	const time2 = getCurrentTimeInCity(city2);

	const difference =
		(time1.currentTime.getTime() - time2.currentTime.getTime()) /
		(1000 * 60 * 60);

	return {
		time1,
		time2,
		difference: Math.abs(difference),
	};
}

export function getTimeZoneInfo(timezone: string): {
	name: string;
	offset: string;
	isDST: boolean;
	nextDSTChange?: Date;
} {
	try {
		const now = new Date();
		const offset = getTimezoneOffset(now, timezone);
		const hours = Math.floor(Math.abs(offset) / 60);
		const minutes = Math.abs(offset) % 60;
		const sign = offset >= 0 ? '+' : '-';

		return {
			name: timezone,
			offset: `UTC${sign}${hours.toString().padStart(2, '0')}:${minutes
				.toString()
				.padStart(2, '0')}`,
			isDST: isDaylightSavingTime(now, timezone),
			nextDSTChange: getNextDSTChange(timezone),
		};
	} catch {
		return {
			name: timezone,
			offset: 'UTC+0',
			isDST: false,
		};
	}
}

function getNextDSTChange(timezone: string): Date | undefined {
	// This is a simplified implementation
	// In reality, DST change dates vary by country and year
	try {
		const now = new Date();
		const currentYear = now.getFullYear();

		// Common DST change dates (varies by country)
		const springChange = new Date(
			currentYear,
			2,
			31 - new Date(currentYear, 2, 0).getDay()
		); // Last Sunday of March
		const fallChange = new Date(
			currentYear,
			9,
			31 - new Date(currentYear, 9, 0).getDay()
		); // Last Sunday of October

		if (now < springChange) return springChange;
		if (now < fallChange) return fallChange;

		// Next year's spring change
		return new Date(
			currentYear + 1,
			2,
			31 - new Date(currentYear + 1, 2, 0).getDay()
		);
	} catch {
		return undefined;
	}
}

export function getWorldClockData(): WorldTimeDisplay[] {
	const popularCities = getPopularCities();
	return getCurrentTimeInMultipleCities(popularCities);
}


