/**
 * @fileOverview Zod schemas for shipping-related AI flows.
 *
 * - SuggestShippingLaneInputSchema, SuggestShippingLaneInput - The input schema and type for the suggestShippingLane flow.
 * - SuggestShippingLaneOutputSchema, SuggestShippingLaneOutput - The output schema and type for the suggestShippingLane flow.
 */
import { z } from 'zod';

export const SuggestShippingLaneInputSchema = z.object({
  products: z.array(z.enum(['Coffee', 'Ornamental Plants', 'Cacao'])).describe('The list of products to be shipped.'),
  destinationCountry: z.string().describe('The destination country for the shipment.'),
  volume: z.string().describe('The estimated annual volume in kilograms.'),
});
export type SuggestShippingLaneInput = z.infer<typeof SuggestShippingLaneInputSchema>;

export const SuggestShippingLaneOutputSchema = z.object({
  shippingLane: z.string().describe('The suggested shipping lane, e.g., "Port of Limon, Costa Rica to Port of Rotterdam, Netherlands via Sea Freight."'),
  necessaryCertifications: z.string().describe('A summary of necessary certifications for the specified products and destination.'),
  reasons: z.string().describe('A brief explanation for why this shipping lane is recommended, considering cost, speed, and product type.'),
});
export type SuggestShippingLaneOutput = z.infer<typeof SuggestShippingLaneOutputSchema>;
