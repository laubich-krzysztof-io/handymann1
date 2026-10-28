export interface Rates {
  firstHour: number;
  halfHour: number;
  vatPct: number;
}

/** Standard appointments only. Started half-hours are billed in full. */
export function estimateVisit(minutes: number, materials: number, rates: Rates) {
  if (!Number.isFinite(minutes) || minutes <= 0 || !Number.isFinite(materials) || materials < 0) {
    throw new RangeError('A positive duration and non-negative material cost are required.');
  }
  const halfHours = Math.max(0, Math.ceil((minutes - 60) / 30));
  const labourCents =
    Math.round(rates.firstHour * 100) + halfHours * Math.round(rates.halfHour * 100);
  const netCents = labourCents + Math.round(materials * 100);
  const vatCents = Math.round((netCents * rates.vatPct) / 100);
  return {
    labour: labourCents / 100,
    net: netCents / 100,
    vat: vatCents / 100,
    gross: (netCents + vatCents) / 100,
  };
}

const numberLocales: Record<string, string> = { pl: 'pl-PL', de: 'de-DE', en: 'en-GB' };
export const money = (amount: number, lang: string) =>
  new Intl.NumberFormat(numberLocales[lang] ?? 'pl-PL', {
    style: 'currency',
    currency: 'PLN',
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amount);
