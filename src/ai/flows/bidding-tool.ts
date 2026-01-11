'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting optimal bid increments during a live auction.
 *
 * - `suggestBidIncrement` -  A function that suggests an optimal bid increment.
 * - `SuggestBidIncrementInput` - The input type for the suggestBidIncrement function.
 * - `SuggestBidIncrementOutput` - The return type for the suggestBidIncrement function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestBidIncrementInputSchema = z.object({
  currentBid: z.number().describe('The current highest bid amount.'),
  productValue: z.number().describe('The estimated value of the product.'),
  timeRemaining: z.number().describe('The time remaining in the auction in seconds.'),
  bidderAggressiveness: z.enum(['LOW', 'MEDIUM', 'HIGH']).describe('The aggressiveness of the bidder.'),
});

export type SuggestBidIncrementInput = z.infer<typeof SuggestBidIncrementInputSchema>;

const SuggestBidIncrementOutputSchema = z.object({
  suggestedIncrement: z.number().describe('The suggested bid increment.'),
  reasoning: z.string().describe('The reasoning behind the suggested increment.'),
});

export type SuggestBidIncrementOutput = z.infer<typeof SuggestBidIncrementOutputSchema>;

export async function suggestBidIncrement(input: SuggestBidIncrementInput): Promise<SuggestBidIncrementOutput> {
  return suggestBidIncrementFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestBidIncrementPrompt',
  input: {schema: SuggestBidIncrementInputSchema},
  output: {schema: SuggestBidIncrementOutputSchema},
  prompt: `You are an expert auction advisor. A user is participating in a live auction and needs your advice on what increment to bid.

  Here are the details of the auction:
  Current bid: {{{currentBid}}}
  Estimated product value: {{{productValue}}}
  Time remaining: {{{timeRemaining}}} seconds
  Bidder aggressiveness: {{{bidderAggressiveness}}}

  Consider these factors when suggesting an increment:
  - The current bid relative to the product value.
  - The time remaining in the auction. If there is little time remaining, suggest a more aggressive increment.
  - The bidder's aggressiveness. A more aggressive bidder will want to bid higher increments.

  Provide a suggested increment and a brief explanation of your reasoning.
  `,
});

const suggestBidIncrementFlow = ai.defineFlow(
  {
    name: 'suggestBidIncrementFlow',
    inputSchema: SuggestBidIncrementInputSchema,
    outputSchema: SuggestBidIncrementOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
