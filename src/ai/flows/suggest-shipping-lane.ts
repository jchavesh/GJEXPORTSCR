'use server';

/**
 * @fileOverview A shipping lane suggestion AI agent.
 *
 * - suggestShippingLane - A function that suggests the fastest and cheapest shipping lane.
 * - SuggestShippingLaneInput - The input type for the suggestShippingLane function.
 * - SuggestShippingLaneOutput - The return type for the suggestShippingLane function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestShippingLaneInputSchema = z.object({
  products: z
    .array(z.enum(['Coffee', 'Ornamental Plants', 'Cacao']))
    .describe('The products being shipped.'),
  destinationCountry: z.string().describe('The destination country.'),
  volume: z.string().describe('The annual volume of the products being shipped.'),
});
export type SuggestShippingLaneInput = z.infer<typeof SuggestShippingLaneInputSchema>;

const SuggestShippingLaneOutputSchema = z.object({
  shippingLane: z.string().describe('The suggested shipping lane.'),
  necessaryCertifications: z.string().describe('The certifications necessary for the suggested shipping lane.'),
  reasons: z.string().describe('Reasons why the suggested shipping lane is the fastest and cheapest.'),
});
export type SuggestShippingLaneOutput = z.infer<typeof SuggestShippingLaneOutputSchema>;

export async function suggestShippingLane(input: SuggestShippingLaneInput): Promise<SuggestShippingLaneOutput> {
  return suggestShippingLaneFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestShippingLanePrompt',
  input: {schema: SuggestShippingLaneInputSchema},
  output: {schema: SuggestShippingLaneOutputSchema},
  prompt: `You are an expert in international logistics, specializing in the export of agricultural products from Costa Rica.

You will be provided with the products being shipped, the destination country, and the annual volume. Your task is to suggest the fastest and cheapest shipping lane, taking into account current geopolitical conditions.

Products: {{products}}
Destination Country: {{destinationCountry}}
Annual Volume: {{volume}}

Consider factors such as shipping time, cost, reliability, and any potential disruptions.

Also, highlight any certifications that are necessary based on the shipping lane.

Provide a brief explanation of why you chose this shipping lane.

{{output}}
`,
});

const suggestShippingLaneFlow = ai.defineFlow(
  {
    name: 'suggestShippingLaneFlow',
    inputSchema: SuggestShippingLaneInputSchema,
    outputSchema: SuggestShippingLaneOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
