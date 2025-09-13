'use server';
/**
 * @fileOverview Provides an interpretation of screening tool results and suggests next steps.
 *
 * - interpretScreeningToolResults - A function that takes screening tool results and provides an interpretation.
 * - ScreeningToolResultsInterpretationInput - The input type for the interpretScreeningToolResults function.
 * - ScreeningToolResultsInterpretationOutput - The return type for the interpretScreeningToolResults function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ScreeningToolResultsInterpretationInputSchema = z.object({
  toolName: z.string().describe('The name of the screening tool used.'),
  rawResults: z.string().describe('The raw results from the screening tool.'),
  studentContext: z.string().optional().describe('Any additional context about the student that might be relevant.'),
});
export type ScreeningToolResultsInterpretationInput = z.infer<typeof ScreeningToolResultsInterpretationInputSchema>;

const ScreeningToolResultsInterpretationOutputSchema = z.object({
  interpretation: z.string().describe('A summary of the screening tool results.'),
  nextSteps: z.string().describe('Suggested next steps based on the interpretation.'),
});
export type ScreeningToolResultsInterpretationOutput = z.infer<typeof ScreeningToolResultsInterpretationOutputSchema>;

export async function interpretScreeningToolResults(
  input: ScreeningToolResultsInterpretationInput
): Promise<ScreeningToolResultsInterpretationOutput> {
  return screeningToolResultsInterpretationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'screeningToolResultsInterpretationPrompt',
  input: {
    schema: ScreeningToolResultsInterpretationInputSchema,
  },
  output: {
    schema: ScreeningToolResultsInterpretationOutputSchema,
  },
  prompt: `You are an AI assistant designed to interpret the results of mental health screening tools for college students.

You will be provided with the name of the tool, the raw results, and optionally some context about the student.

Based on this information, you will provide a brief, easy-to-understand summary of the results and suggest potential next steps.

Tool Name: {{{toolName}}}
Raw Results: {{{rawResults}}}
Student Context: {{{studentContext}}}

Interpretation: {{interpretation}}
Next Steps: {{nextSteps}}`,
});

const screeningToolResultsInterpretationFlow = ai.defineFlow(
  {
    name: 'screeningToolResultsInterpretationFlow',
    inputSchema: ScreeningToolResultsInterpretationInputSchema,
    outputSchema: ScreeningToolResultsInterpretationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
