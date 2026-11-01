import { randomUUID } from 'node:crypto';
import { subtotal, withTax } from '@demo/pricing';

/** Tax rate applied to every quote: 20 %. */
const TAX_BASIS_POINTS = 2000;

export interface Quote {
  id: string;
  totalCents: number;
}

export type QuoteResult = { ok: true; quote: Quote } | { ok: false; error: string };

export function quote(body: unknown): QuoteResult {
  if (typeof body !== 'object' || body === null || !Array.isArray((body as { lines?: unknown }).lines)) {
    return { ok: false, error: 'lines must be an array' };
  }
  try {
    const cents = subtotal((body as { lines: unknown[] }).lines);
    return { ok: true, quote: { id: randomUUID(), totalCents: withTax(cents, TAX_BASIS_POINTS) } };
  } catch {
    return { ok: false, error: 'invalid line' };
  }
}
