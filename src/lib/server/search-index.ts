import path from 'node:path';
import { promises as fs } from 'node:fs';
import type { CalculatorSearchResult } from '@/lib/search-utils';

const CATEGORY_MAP: Record<string, { slug: string; titleKey: string }> = {
	auto: { slug: 'auto', titleKey: 'categories.auto.title' },
	finance: { slug: 'finance', titleKey: 'categories.finance.title' },
	life: { slug: 'life', titleKey: 'categories.life.title' },
	math: { slug: 'math', titleKey: 'categories.math.title' },
	construction: {
		slug: 'construction',
		titleKey: 'categories.construction.title',
	},
	time: { slug: 'time', titleKey: 'categories.time.title' },
	health: { slug: 'health', titleKey: 'categories.health.title' },
	converter: {
		slug: 'converter',
		titleKey: 'categories.converter.title',
	},
	fun: { slug: 'fun', titleKey: 'categories.fun.title' },
	it: { slug: 'it', titleKey: 'categories.it.title' },
	science: { slug: 'science', titleKey: 'categories.science.title' },
};

const SPECIAL_CASES: Record<string, Record<string, string>> = {
	auto: {
		carDepreciation: 'car-depreciation',
		carOwnership: 'car-ownership',
		trafficFines: 'traffic-fines',
		vehicleTax: 'vehicle-tax',
		fuelConsumption: 'fuel-consumption',
		carLoan: 'car-loan',
		lpgPayback: 'lpg-payback',
	},
	it: {
		ipCalculator: 'ip-calculator',
		qrGenerator: 'qr-generator',
	},
	health: {
		bmiHealth: 'bmihealth',
	},
	science: {
		gradeCalculator: 'grade-calculator',
	},
};

async function readJsonFile(...segments: string[]) {
	const filePath = path.join(process.cwd(), ...segments);
	try {
		const content = await fs.readFile(filePath, 'utf-8');
		return JSON.parse(content);
	} catch (error) {
		console.debug(`Failed to read JSON file at ${filePath}`, error);
		return null;
	}
}

function getValueByPath(messages: any, key: string) {
	if (!messages) return undefined;
	return key.split('.').reduce((acc: any, part) => acc?.[part], messages);
}

export async function buildSearchIndex(
	locale: string
): Promise<CalculatorSearchResult[]> {
	const results: CalculatorSearchResult[] = [];

	const baseMessages =
		(await readJsonFile('messages', `${locale}.json`)) ?? undefined;

	const getCategoryTitle = (key: string) => {
		const value = getValueByPath(baseMessages, key);
		return value || key.replace('categories.', '').replace('.title', '');
	};

	for (const category of Object.keys(CATEGORY_MAP)) {
		const categoryMessages = await readJsonFile(
			'messages',
			locale,
			'calculators',
			`${category}.json`
		);

		const calculators = categoryMessages?.calculators;
		if (!calculators) continue;

		const categoryInfo = CATEGORY_MAP[category];

		for (const [calcId, calcData] of Object.entries(calculators) as [
			string,
			any
		][]) {
			if (!calcData?.title || !calcData?.description) continue;

			let normalizedId = calcId
				.replace(/_/g, '-')
				.replace(/([a-z])([A-Z])/g, '$1-$2')
				.toLowerCase();

			if (SPECIAL_CASES[category]?.[calcId]) {
				normalizedId = SPECIAL_CASES[category][calcId];
			}

			results.push({
				id: `${category}-${calcId}`,
				title: calcData.title,
				description: calcData.description,
				category: getCategoryTitle(categoryInfo.titleKey),
				categorySlug: categoryInfo.slug,
				href: `/${categoryInfo.slug}/${normalizedId}`,
				locale,
				matchScore: 0,
			});
		}
	}

	return results;
}

