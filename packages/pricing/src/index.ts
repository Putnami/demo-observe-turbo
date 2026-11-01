import { z } from 'zod';

export const lineSchema = z.object({
  sku: z.string().min(1),
  unitCents: z.number().int().nonnegative(),
  quantity: z.number().int().nonnegative(),
});

export type Line = z.infer<typeof lineSchema>;

/** Sum of the lines, before tax, in cents. Throws on an invalid line. */
export function subtotal(lines: unknown[]): number {
  return lines
    .map((line) => lineSchema.parse(line))
    .reduce((total, line) => total + line.unitCents * line.quantity, 0);
}

/** Adds a tax rate in basis points, rounded half up. */
export function withTax(cents: number, basisPoints: number): number {
  return cents + Math.floor((cents * basisPoints + 5000) / 10000);
}
