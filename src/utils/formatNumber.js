import numeral from 'numeral';

// ----------------------------------------------------------------------

export function fCurrency(number, minimum = 9999) {
  if (number <= minimum) return number;
  return numeral(number).format('(0.0 a)');
}

export function fPercent(number) {
  return numeral(number / 100).format('0.0%');
}

export function fNumber(number) {
  return numeral(number).format();
}

export function fShortenNumber(number) {
  return numeral(number).format('0.00a').replace('.00', '');
}

export function fData(number) {
  return numeral(number).format('0.0 b');
}

export function numberWithCommas(x) {
  if (!x) return 0;
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function prettyNumbers(x) {
  if (!x) return 0;
}
