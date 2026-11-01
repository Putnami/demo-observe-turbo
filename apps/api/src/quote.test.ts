import { describe, expect, it } from 'vitest';
import { quote } from './quote.js';

describe('quote', () => {
  it('prices the lines with tax', () => {
    const result = quote({ lines: [{ sku: 'a', unitCents: 500, quantity: 2 }] });
    expect(result.ok && result.quote.totalCents).toBe(1200);
  });

  it('rejects a body without lines', () => {
    expect(quote({})).toEqual({ ok: false, error: 'lines must be an array' });
  });

  it('rejects an invalid line', () => {
    expect(quote({ lines: [{ sku: '', unitCents: 1, quantity: 1 }] })).toEqual({ ok: false, error: 'invalid line' });
  });
});
