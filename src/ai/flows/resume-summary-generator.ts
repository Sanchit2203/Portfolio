
'use server';
/**
 * @fileOverview A flow for generating a resume summary.
 *
 * - generateResumeSummary - A function that handles the resume summary generation process.
 */

import {ai} from '@/ai/genkit';
import {
  GenerateResumeSummaryInputSchema,
  GenerateResumeSummaryOutputSchema,
  type GenerateResumeSummaryInput,
  type GenerateResumeSummaryOutput,
} from '@/ai/schemas';

export async function generateResumeSummary(
  input: GenerateResumeSummaryInput
): Promise<GenerateResumeSummaryOutput> {
  return await resumeSummaryFlow(input);
}

const resumeSummaryFlow = ai.defineFlow(
  {
    name: 'resumeSummaryFlow',
    inputSchema: GenerateResumeSummaryInputSchema,
    outputSchema: GenerateResumeSummaryOutputSchema,
  },
  async (input) => {
    const prompt = `Generate a professional summary for a resume based on the following text. The summary should be a single paragraph, 3-4 sentences long. Resume content: ${input.resumeText}`;
    
    const {output} = await ai.generate({
      prompt: prompt,
      model: 'googleai/gemini-1.5-flash',
      output: {
        schema: GenerateResumeSummaryOutputSchema,
      },
    });

    return output!;
  }
);
