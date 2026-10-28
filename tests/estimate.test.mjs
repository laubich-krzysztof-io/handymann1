import test from 'node:test';
import assert from 'node:assert/strict';
import { estimateVisit, money } from '../src/lib/estimate.ts';

const rates = { firstHour: 200, halfHour: 70, vatPct: 23 };

test('the first hour includes travel and has a minimum charge', () => {
  assert.deepEqual(estimateVisit(30, 0, rates), { labour: 200, net: 200, vat: 46, gross: 246 });
  assert.equal(estimateVisit(60, 0, rates).gross, 246);
});

test('a started half hour is billed, but an exact boundary is not billed twice', () => {
  assert.equal(estimateVisit(61, 0, rates).net, 270);
  assert.equal(estimateVisit(90, 0, rates).net, 270);
  assert.equal(estimateVisit(91, 0, rates).net, 340);
  assert.equal(estimateVisit(120, 0, rates).net, 340);
});

test('matches the original sample invoice, including material and VAT', () => {
  assert.deepEqual(estimateVisit(80, 189, rates), {
    labour: 270,
    net: 459,
    vat: 105.57,
    gross: 564.57,
  });
});

test('rounds VAT at invoice level to the nearest grosz', () => {
  assert.deepEqual(estimateVisit(60, 0.03, rates), {
    labour: 200,
    net: 200.03,
    vat: 46.01,
    gross: 246.04,
  });
});

test('uses the supplied rate configuration, not fixed prices', () => {
  assert.deepEqual(estimateVisit(90, 10, { firstHour: 300, halfHour: 90, vatPct: 8 }), {
    labour: 390,
    net: 400,
    vat: 32,
    gross: 432,
  });
});

test('rejects negative, non-finite and missing numeric values', () => {
  for (const minutes of [0, -1, NaN, Infinity])
    assert.throws(() => estimateVisit(minutes, 0, rates), RangeError);
  for (const materials of [-1, NaN, Infinity])
    assert.throws(() => estimateVisit(60, materials, rates), RangeError);
});

test('formats fractional prices in each supported locale', () => {
  assert.match(money(332.1, 'pl'), /332,10/);
  assert.match(money(332.1, 'de'), /332,10/);
  assert.match(money(332.1, 'en'), /332\.10/);
});
