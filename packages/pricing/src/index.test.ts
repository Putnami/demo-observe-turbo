import { describe, expect, it } from 'vitest';
import { subtotal, withTax } from './index.js';

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
