import { describe, expect, it } from 'vitest';
import { discount, subtotal, withTax } from './index.js';

describe('subtotal', () => {
  it('sums the lines', () => {
    expect(
      subtotal([
        { sku: 'a', unitCents: 250, quantity: 2 },
        { sku: 'b', unitCents: 100, quantity: 1 },
      ]),
    ).toBe(600);
  });

  it('rejects a negative price', () => {
    expect(() => subtotal([{ sku: 'a', unitCents: -1, quantity: 1 }])).toThrow();
  });
});

describe('withTax', () => {
  it('adds 20 %', () => {
    expect(withTax(1000, 2000)).toBe(1200);
  });
});

describe('discount', () => {
  it('removes 10 %', () => {
    expect(discount(1000, 1000)).toBe(900);
  });

  it('keeps the amount without a rate', () => {
    expect(discount(1000, 0)).toBe(1000);
  });

  it('never goes below zero', () => {
    expect(discount(1000, 12000)).toBe(0);
  });
});
