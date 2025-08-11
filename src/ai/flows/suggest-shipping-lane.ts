'use server';
/**
 * @fileOverview An AI flow to suggest optimal shipping lanes.
 *
 * - suggestShippingLane - A function that suggests a shipping lane based on products and destination.
 */

import { ai } from '@/ai/genkit';
import type { SuggestShippingLaneInput, SuggestShippingLaneOutput } from '@/ai/schemas/shipping-schemas';
import { SuggestShippingLaneInputSchema, SuggestShippingLaneOutputSchema } from '@/ai/schemas/shipping-schemas';

const prompt = ai.definePrompt({
    name: 'suggestShippingLanePrompt',
    input: { schema: SuggestShippingLaneInputSchema },
    output: { schema: SuggestShippingLaneOutputSchema },
    prompt: `You are an expert logistics coordinator for an export company in Costa Rica called J&G Exports.
Your task is to recommend the best shipping lane for a potential customer based on their product selection, destination country, and estimated volume.

The customer is interested in shipping the following products:
{{#each products}}- {{this}}
{{/each}}
Destination: {{{destinationCountry}}}
Estimated Volume: {{{volume}}} kg/year

Please provide the following information:
1.  **Suggested Shipping Lane:** The most optimal route from Costa Rica to the destination (e.g., Port Limon to Port of Rotterdam). Be specific about transport type (sea, air).
2.  **Necessary Certifications:** List the key certifications required for this specific shipment (e.g., Phytosanitary Certificate, Fair Trade, USDA Organic).
3.  **Reasons:** Briefly explain why you recommend this route. Consider factors like cost-effectiveness for the given volume, transit time, and preservation requirements for the products (e.g., refrigerated containers for plants).
`,
});

const suggestShippingLaneFlow = ai.defineFlow(
  {
    name: 'suggestShippingLaneFlow',
    inputSchema: SuggestShippingLaneInputSchema,
    outputSchema: SuggestShippingLaneOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('Failed to generate a shipping suggestion.');
    }
    return output;
  }
);


export async function suggestShippingLane(input: SuggestShippingLaneInput): Promise<SuggestShippingLaneOutput> {
  return await suggestShippingLaneFlow(input);
}
