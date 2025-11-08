/**
 * Vehicle Tax Calculator Library
 * 
 * Provides functionality for calculating Russian vehicle tax (transport tax).
 * 
 * Features:
 * - Regional tax rates (rubles per horsepower)
 * - Engine power input
 * - Ownership period calculation (partial year support)
 * - Tax amount calculation
 * 
 * Calculation formula:
 * Tax = Engine Power × Regional Rate × (Ownership Months / 12)
 * 
 * Regional rates vary by region and are set per horsepower.
 */

export interface VehicleTaxInput {
	enginePower: number;
	region: string;
	ownershipMonths: number;
}

export interface VehicleTaxResult {
	taxAmount: number;
	enginePower: number;
	rate: number;
	ownershipMonths: number;
	ownershipCoefficient: number;
}

// Regional tax rates (rubles per horsepower)
export const REGIONAL_RATES: Record<string, number> = {
	// Central Federal District
	moscow: 25,
	moscow_region: 20,
	voronezh: 15,
	belgorod: 15,
	bryansk: 15,
	ivanovo: 15,
	kaluga: 15,
	kostroma: 15,
	kursk: 15,
	lipetsk: 15,
	orel: 15,
	ryazan: 15,
	smolensk: 15,
	tambov: 15,
	tver: 15,
	tula: 15,
	yaroslavl: 15,

	// Northwestern Federal District
	spb: 35,
	leningrad_region: 25,
	arkhangelsk: 20,
	vologda: 20,
	kaliningrad: 20,
	karelia: 20,
	komi: 20,
	murmansk: 20,
	novgorod: 20,
	pskov: 20,

	// Southern Federal District
	rostov: 20,
	volgograd: 20,
	krasnodar: 20,
	astrakhan: 20,
	adygea: 20,
	kalmykia: 20,
	crimea: 20,
	sevastopol: 20,

	// North Caucasian Federal District
	stavropol: 20,
	dagestan: 20,
	chechnya: 20,
	ingushetia: 20,
	kabardino_balkaria: 20,
	karachay_cherkessia: 20,
	north_ossetia: 20,

	// Volga Federal District
	nizhny_novgorod: 20,
	samara: 20,
	kazan: 20,
	perm: 20,
	ufa: 20,
	izhevsk: 20,
	orenburg: 20,
	penza: 20,
	saratov: 20,
	ulianovsk: 20,
	chuvashia: 20,
	mari_el: 20,
	mordovia: 20,
	tatarstan: 20,
	udmurtia: 20,
	bashkortostan: 20,

	// Ural Federal District
	ekaterinburg: 20,
	chelyabinsk: 20,
	tyumen: 20,
	kurgan: 20,
	sverdlovsk: 20,
	khanty_mansi: 20,
	yamal_nenets: 20,

	// Siberian Federal District
	novosibirsk: 20,
	krasnoyarsk: 20,
	omsk: 20,
	irkutsk: 20,
	kemerovo: 20,
	tomsk: 20,
	barnaul: 20,
	chita: 20,
	buryatia: 20,
	altai: 20,
	khakassia: 20,
	tuva: 20,

	// Far Eastern Federal District
	vladivostok: 20,
	khabarovsk: 20,
	yakutsk: 20,
	blagoveshchensk: 20,
	magadan: 20,
	petropavlovsk_kamchatsky: 20,
	yuzhno_sakhalinsk: 20,
	chukotka: 20,
	kamchatka: 20,
	primorsky: 20,
	sakhalin: 20,
	amur: 20,
	evreyskaya: 20,
};

// Regional names for display
export const REGIONAL_NAMES: Record<string, string> = {
	moscow: 'Москва',
	moscow_region: 'Московская область',
	spb: 'Санкт-Петербург',
	leningrad_region: 'Ленинградская область',
	rostov: 'Ростовская область',
	volgograd: 'Волгоградская область',
	krasnodar: 'Краснодарский край',
	stavropol: 'Ставропольский край',
	nizhny_novgorod: 'Нижегородская область',
	samara: 'Самарская область',
	kazan: 'Республика Татарстан',
	perm: 'Пермский край',
	ufa: 'Республика Башкортостан',
	ekaterinburg: 'Свердловская область',
	chelyabinsk: 'Челябинская область',
	tyumen: 'Тюменская область',
	novosibirsk: 'Новосибирская область',
	krasnoyarsk: 'Красноярский край',
	omsk: 'Омская область',
	irkutsk: 'Иркутская область',
	vladivostok: 'Приморский край',
	khabarovsk: 'Хабаровский край',
	yakutsk: 'Республика Саха (Якутия)',
};

export function calculateVehicleTax(input: VehicleTaxInput): VehicleTaxResult {
	const { enginePower, region, ownershipMonths } = input;

	// Get tax rate for the region
	const rate = REGIONAL_RATES[region] || 20; // Default rate if region not found

	// Calculate ownership coefficient (months / 12)
	const ownershipCoefficient = ownershipMonths / 12;

	// Calculate tax amount
	const taxAmount = enginePower * rate * ownershipCoefficient;

	return {
		taxAmount: Math.round(taxAmount),
		enginePower,
		rate,
		ownershipMonths,
		ownershipCoefficient,
	};
}

export function validateVehicleTaxInput(
	input: Partial<VehicleTaxInput>
): string[] {
	const errors: string[] = [];

	if (!input.enginePower || input.enginePower <= 0) {
		errors.push('Мощность двигателя должна быть больше 0');
	}

	if (!input.region) {
		errors.push('Выберите регион');
	}

	if (
		!input.ownershipMonths ||
		input.ownershipMonths < 1 ||
		input.ownershipMonths > 12
	) {
		errors.push('Срок владения должен быть от 1 до 12 месяцев');
	}

	return errors;
}

export function getRegionalOptions(): Array<{
	value: string;
	label: string;
	rate: number;
}> {
	return Object.entries(REGIONAL_NAMES).map(([key, name]) => ({
		value: key,
		label: name,
		rate: REGIONAL_RATES[key] || 20,
	}));
}
