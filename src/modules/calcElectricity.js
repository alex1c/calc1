// Core electricity calculation utilities
// All functions are pure and unit-tested friendly

/**
 * Calculate energy consumption in kWh
 * consumptionKWh = (powerWatts * hours) / 1000
 * @param {number} powerWatts - device power in watts
 * @param {number} hours - hours of operation
 * @returns {number}
 */
export function calculateConsumptionKWh(powerWatts, hours) {
	if (!powerWatts || !hours || powerWatts < 0 || hours < 0) return 0;
	return (powerWatts * hours) / 1000;
}

/**
 * Calculate cost given consumption and price per kWh
 * @param {number} consumptionKWh
 * @param {number} costPerKWh
 * @returns {number}
 */
export function calculateCost(consumptionKWh, costPerKWh) {
	if (!consumptionKWh || !costPerKWh || consumptionKWh < 0 || costPerKWh < 0)
		return 0;
	return consumptionKWh * costPerKWh;
}

/**
 * Aggregate daily, monthly (30 days) and period consumption
 * @param {{ power: number, hoursPerDay: number, days: number }} item
 */
export function computeItemAggregation(item) {
	const dayKWh = calculateConsumptionKWh(item.power, item.hoursPerDay);
	const periodKWh = dayKWh * (item.days || 0);
	const monthKWh = dayKWh * 30;
	return { dayKWh, monthKWh, periodKWh };
}

/**
 * Create CSV from rows
 * @param {Array<object>} rows - list of plain objects (same keys)
 * @param {string[]} headersOrder - order of columns
 */
export function toCSV(rows, headersOrder) {
	if (!rows || rows.length === 0) return '';
	const hdr = headersOrder || Object.keys(rows[0]);
	const escape = (v) => {
		if (v === null || v === undefined) return '';
		const s = String(v);
		const needsQuotes =
			s.includes(',') || s.includes('\n') || s.includes('"');
		return needsQuotes ? '"' + s.replace(/"/g, '""') + '"' : s;
	};
	const lines = [hdr.join(',')];
	for (const row of rows) {
		lines.push(hdr.map((k) => escape(row[k])).join(','));
	}
	return lines.join('\n');
}

/**
 * Format number with fixed decimals without trailing zeros overhead
 */
export function formatNumber(value, digits = 2) {
	if (typeof value !== 'number' || Number.isNaN(value)) return '0';
	return Number(value.toFixed(digits)).toString();
}
