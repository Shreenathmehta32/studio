'use server';
/**
 * @fileOverview This file defines the AI First-Aid Chatbot's initial prompt flow.
 *
 * It handles the initial interaction with a student, providing a personalized greeting
 * and suggesting relevant starting points based on common student stressors in India.
 *
 * - aiFirstAidInitialPrompt - The function to generate the initial prompt response.
 * - AIFirstAidInitialPromptInput - The input type (currently empty).
 * - AIFirstAidInitialPromptOutput - The output type, containing the chatbot's response.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define input schema (currently empty, but can be extended later)
const AIFirstAidInitialPromptInputSchema = z.object({});
export type AIFirstAidInitialPromptInput = z.infer<
  typeof AIFirstAidInitialPromptInputSchema
>;

// Define output schema
const AIFirstAidInitialPromptOutputSchema = z.object({
  response: z
    .string()
    .describe(
      'The chatbot response, including a personalized greeting and suggested starting points.'
    ),
});
export type AIFirstAidInitialPromptOutput = z.infer<
  typeof AIFirstAidInitialPromptOutputSchema
>;

// Exported function to call the flow
export async function aiFirstAidInitialPrompt(
  input: AIFirstAidInitialPromptInput
): Promise<AIFirstAidInitialPromptOutput> {
  return aiFirstAidInitialPromptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiFirstAidInitialPromptPrompt',
  input: {schema: AIFirstAidInitialPromptInputSchema},
  output: {schema: AIFirstAidInitialPromptOutputSchema},
  prompt: `Namaste! Welcome to SanjeevaniAI, your mental wellness companion.

I understand that college life in India can be challenging. Many students experience stress related to academics, career prospects, relationships, and adjusting to new environments. How can I help you today? Here are some options:

*   If you're feeling overwhelmed with academic pressure, type "Academics".
*   If you're concerned about your future career path, type "Career".
*   If you're having trouble with relationships, type "Relationships".
*   If you need immediate stress relief, type "Stress Relief".
*   For general information about SanjeevaniAI, type "Help".`,
});

// Define the Genkit flow
const aiFirstAidInitialPromptFlow = ai.defineFlow(
  {
    name: 'aiFirstAidInitialPromptFlow',
    inputSchema: AIFirstAidInitialPromptInputSchema,
    outputSchema: AIFirstAidInitialPromptOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
