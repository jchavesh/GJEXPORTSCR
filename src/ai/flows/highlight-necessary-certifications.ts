'use server';

/**
 * @fileOverview A flow that suggests the fastest, cheapest shipping lane and highlights any certifications necessary based on shipping lane.
 *
 * - highlightNecessaryCertifications - A function that handles the shipping lane and certification suggestion process.
 * - HighlightNecessaryCertificationsInput - The input type for the highlightNecessaryCertifications function.
 * - HighlightNecessaryCertificationsOutput - The return type for the highlightNecessaryCertifications function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const HighlightNecessaryCertificationsInputSchema = z.object({
  products: z.string().describe('The products being shipped (Coffee, Plants, Cacao).'),
  destinationCountry: z.string().describe('The destination country for the shipment.'),
  volume: z.string().describe('The annual volume of product being shipped.'),
});
export type HighlightNecessaryCertificationsInput = z.infer<typeof HighlightNecessaryCertificationsInputSchema>;

const HighlightNecessaryCertificationsOutputSchema = z.object({
  shippingLaneSuggestion: z.string().describe('The suggested shipping lane based on products and destination.'),
  necessaryCertifications: z.string().describe('Any certifications necessary for the suggested shipping lane.'),
});
export type HighlightNecessaryCertificationsOutput = z.infer<typeof HighlightNecessaryCertificationsOutputSchema>;

export async function highlightNecessaryCertifications(input: HighlightNecessaryCertificationsInput): Promise<HighlightNecessaryCertificationsOutput> {
  return highlightNecessaryCertificationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'highlightNecessaryCertificationsPrompt',
  input: {schema: HighlightNecessaryCertificationsInputSchema},
  output: {schema: HighlightNecessaryCertificationsOutputSchema},
  prompt: `You are an expert in international shipping and logistics, with a focus on agricultural products like coffee, ornamental plants, and cacao.

You will use the information provided to suggest the fastest and cheapest shipping lane, depending on the products being quoted and current geo-political conditions. You will also highlight any certifications that are necessary based on the suggested shipping lane, ensuring compliance and traceability requirements are met. Consider the annual volume to determine if certain shipping options are more suitable.

Products: {{{products}}}
Destination Country: {{{destinationCountry}}}
Annual Volume: {{{volume}}}

Shipping Lane Suggestion:
Necessary Certifications: `,
});

const highlightNecessaryCertificationsFlow = ai.defineFlow(
  {
    name: 'highlightNecessaryCertificationsFlow',
    inputSchema: HighlightNecessaryCertificationsInputSchema,
    outputSchema: HighlightNecessaryCertificationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
